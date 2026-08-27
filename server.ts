/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = 3000;
const app = express();

// Express configuration
app.use(express.json());

// Log incoming requests for debugging in the workspace
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Mock Database / Order Entities and Repository Pattern for Webhook Payments & Orders
/**
 * Interface representing a customer's contact payload.
 */
interface CustomerInfo {
  name: string;
  email: string;
}

/**
 * Interface representing a item line stored inside an Order.
 */
interface OrderItem {
  id: string;
  title: string;
  description: string;
  picture_url: string;
  category_id: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

/**
 * Interface representing an Order Record stored in our data repository.
 */
interface OrderRecord {
  id: string;
  preferenceId: string;
  items: OrderItem[];
  status: string;
  paymentId?: string;
  customer?: CustomerInfo;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface defining the contract for Order data access.
 * Follows the Dependency Inversion Principle (DIP) of SOLID.
 */
interface IOrderRepository {
  save(order: OrderRecord): void;
  findById(id: string): OrderRecord | undefined;
  getAllSortedByDate(): OrderRecord[];
}

/**
 * Concrete In-Memory implementation of IOrderRepository.
 * Follows the Single Responsibility Principle (SRP) for data access.
 */
class InMemoryOrderRepository implements IOrderRepository {
  private database: Record<string, OrderRecord> = {};

  /**
   * Persists or updates an order in the database.
   */
  public save(order: OrderRecord): void {
    this.database[order.id] = { ...order, updatedAt: new Date().toISOString() };
  }

  /**
   * Retrieves an order by its unique ID.
   */
  public findById(id: string): OrderRecord | undefined {
    return this.database[id];
  }

  /**
   * Retrieves all orders, sorted descending by creation date.
   */
  public getAllSortedByDate(): OrderRecord[] {
    return Object.values(this.database).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

// Instantiate and inject the repository
const orderRepository: IOrderRepository = new InMemoryOrderRepository();

// ==========================================
// API ENDPOINTS
// ==========================================

/**
 * Health check endpoint.
 * Returns the status, server time, and environment configurations.
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    mercadoPagoConfigured: !!process.env.MERCADO_PAGO_ACCESS_TOKEN && process.env.MERCADO_PAGO_ACCESS_TOKEN !== 'TEST-xxxxxx'
  });
});

/**
 * Get active orders list.
 * Facilitates dashboard reporting and order fulfillment state views.
 */
app.get('/api/orders', (req: Request, res: Response) => {
  try {
    const orders = orderRepository.getAllSortedByDate();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener la lista de órdenes.' });
  }
});

/**
 * CREATE MERCADO PAGO PREFERENCE
 * POST /api/create-preference
 * Handles purchase intent creation and returns a redirect link to the gateway.
 */
app.post('/api/create-preference', async (req: Request, res: Response) => {
  try {
    const { items, customer, selectedColor, selectedSize, discountPercent } = req.body;

    // Payload sanitization and request validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No se incluyeron productos en la orden de compra.' });
    }

    // Protect against negative quantity, zero pricing, or malicious inputs
    for (const item of items) {
      if (!item.product || typeof item.product.price !== 'number' || item.product.price <= 0) {
        return res.status(400).json({ error: 'La orden contiene productos con precios inválidos.' });
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        return res.status(400).json({ error: 'La orden contiene cantidades inválidas.' });
      }
    }

    const discountMultiplier = typeof discountPercent === 'number' && discountPercent >= 0 && discountPercent <= 100
      ? (1 - discountPercent / 100)
      : 1;

    // Determine host dynamically for secure back-redirection
    const host = process.env.APP_URL || req.headers.referer || `${req.protocol}://${req.get('host')}`;
    const baseUrl = host.endsWith('/') ? host.slice(0, -1) : host;

    console.log(`Configuring redirect URLs with base: ${baseUrl}, discount multiplier: ${discountMultiplier}`);

    // Map checkout cart entries to standard Mercado Pago Line-Item specifications
    const mpItems: OrderItem[] = items.map((item: any) => {
      const sizeStr = selectedSize || item.selectedSize || 'Único';
      const colorStr = selectedColor?.name || item.selectedColor?.name || 'Único';
      return {
        id: item.product.id,
        title: `${item.product.name} (${sizeStr} / ${colorStr})`,
        description: item.product.description.substring(0, 250),
        picture_url: item.product.images[0] || '',
        category_id: 'fashion',
        quantity: item.quantity,
        unit_price: Math.round(Number(item.product.price) * discountMultiplier),
        currency_id: 'ARS'
      };
    });

    const preferenceData = {
      items: mpItems,
      payer: {
        name: customer?.name || 'Cliente Editorial',
        email: customer?.email || 'ventas@ivanaracca.com',
      },
      back_urls: {
        success: `${baseUrl}/gracias?status=approved`,
        failure: `${baseUrl}/error?status=rejected`,
        pending: `${baseUrl}/pendiente?status=pending`
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/webhook`,
      external_reference: `order_${Date.now()}`,
      metadata: {
        color: selectedColor?.name || 'Único',
        size: selectedSize || 'Único',
        customer_name: customer?.name || 'Cliente Editorial'
      }
    };

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    // Decide between sandbox simulation mode or live integration
    if (accessToken && accessToken !== 'TEST-xxxxxx' && accessToken.trim() !== '') {
      console.log('Using live Mercado Pago API to create preference...');
      
      const mpResponse = await fetch('https://api.mercadopago.com/v1/checkout/preferences', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferenceData)
      });

      if (!mpResponse.ok) {
        const errorText = await mpResponse.text();
        console.error('Mercado Pago API error:', errorText);
        throw new Error(`Mercado Pago respondió con error de pasarela: ${mpResponse.status}`);
      }

      const mpData = await mpResponse.json();

      // Create and persist order through the Repository
      const orderId = preferenceData.external_reference;
      const orderRecord: OrderRecord = {
        id: orderId,
        preferenceId: mpData.id,
        items: mpItems,
        status: 'pending',
        customer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      orderRepository.save(orderRecord);

      return res.json({
        id: mpData.id,
        initPoint: mpData.init_point,
        isMock: false
      });
    } else {
      // Local luxury emulation mode if credentials are unset
      console.log('No Mercado Pago access token provided. Emulating luxury checkout flow...');
      
      const mockPrefId = `mock_pref_${Math.random().toString(36).substring(2, 11)}`;
      const orderId = preferenceData.external_reference;

      const orderRecord: OrderRecord = {
        id: orderId,
        preferenceId: mockPrefId,
        items: mpItems,
        status: 'pending',
        customer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      orderRepository.save(orderRecord);

      // Create a local redirect link containing approval metrics
      const simulatedInitPoint = `${baseUrl}/gracias?status=approved&payment_id=sim_pay_${Math.random().toString(36).substring(2, 9)}&preference_id=${mockPrefId}&external_reference=${orderId}&simulated=true`;

      return res.json({
        id: mockPrefId,
        initPoint: simulatedInitPoint,
        isMock: true
      });
    }
  } catch (error: any) {
    console.error('Error creating checkout preference:', error);
    return res.status(500).json({ error: error.message || 'Error de servidor al procesar la orden de compra.' });
  }
});

/**
 * MERCADO PAGO WEBHOOK
 * POST /api/webhook
 * Receives instant payment notifications (IPN) and matches against preferences.
 */
app.post('/api/webhook', async (req: Request, res: Response) => {
  try {
    const { query, body } = req;
    console.log('Webhook triggered with query:', query, 'body:', body);

    const topic = query.topic || body.type;
    const resourceId = query.id || (body.data && body.data.id);

    if (topic === 'payment' && resourceId) {
      console.log(`Processing payment update notification for payment: ${resourceId}`);
      
      const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

      if (accessToken && accessToken !== 'TEST-xxxxxx') {
        // Query Mercado Pago for full payment details
        const payResponse = await fetch(`https://api.mercadopago.com/v1/payments/${resourceId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (payResponse.ok) {
          const paymentData = await payResponse.json();
          const orderId = paymentData.external_reference;
          const status = paymentData.status; // approved, pending, rejected

          console.log(`Payment ID ${resourceId} status: ${status} for Order ID: ${orderId}`);

          if (orderId) {
            const existingOrder = orderRepository.findById(orderId);
            if (existingOrder) {
              existingOrder.status = status;
              existingOrder.paymentId = resourceId;
              orderRepository.save(existingOrder);
              console.log(`Order ${orderId} updated successfully.`);
            }
          }
        }
      }
    }

    // Always return 200 OK to Mercado Pago to acknowledge webhook receipt
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error in webhook process:', error);
    // Return 200 OK anyway to avoid Mercado Pago continuous retries for minor parse issues
    return res.status(200).send('Error parsed');
  }
});

// ==========================================
// VITE CLIENT DEV SERVER / PRODUCTION CONFIG
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Configuring Vite dev middleware for Hot Module Reloading simulation...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`Serving compiled static build files from: ${distPath}`);
    app.use(express.static(distPath));
    
    // Fallback for SPA Routing - serve index.html for all sub-routes (e.g. /gracias, /pendiente)
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`-----------------------------------------------------`);
    console.log(`IVANA RACCA — Luxury Full-Stack Server Started`);
    console.log(`Local Access: http://localhost:${PORT}`);
    console.log(`Production Host: ${process.env.APP_URL || 'Not specified (dynamic)'}`);
    console.log(`-----------------------------------------------------`);
  });
}

startServer();
