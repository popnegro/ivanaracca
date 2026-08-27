/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, AlertTriangle, AlertCircle, Printer, ArrowRight, ShoppingBag, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface OrderReceiptProps {
  paymentId: string | null;
  preferenceId: string | null;
  externalReference: string | null;
  onGoHome: () => void;
}

export function GraciasView({ paymentId, preferenceId, externalReference, onGoHome }: OrderReceiptProps) {
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    // Generate a premium delivery timeline (10 to 15 days from today)
    const today = new Date();
    const minDelivery = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);
    const maxDelivery = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setEstimatedDelivery(`${minDelivery.toLocaleDateString('es-AR', options)} y el ${maxDelivery.toLocaleDateString('es-AR', options)}`);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-24 md:py-32 flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-brand-white border border-brand-brown/20 p-8 md:p-12 shadow-md space-y-8 relative">
        {/* Editorial Frame details */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-brown/5 pointer-events-none" />

        <div className="text-center space-y-3 relative">
          <div className="w-12 h-12 bg-brand-brown/10 text-brand-brown rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="font-mono text-[9px] tracking-widest text-brand-brown uppercase block">
            Transacción Completada
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-brand-black">
            Universo Ivana Racca
          </h1>
          <p className="font-serif text-sm italic text-brand-black/60">
            Gracias por adquirir su prenda de alta costura consciente.
          </p>
        </div>

        {/* Receipt specs card */}
        <div className="bg-brand-ivory p-6 border border-brand-brown/10 space-y-4 font-mono text-xs">
          <h2 className="font-serif text-xs uppercase tracking-widest text-brand-brown font-bold border-b border-brand-brown/20 pb-2 flex justify-between">
            <span>Comprobante de Atelier</span>
            <span>#IR-{externalReference ? externalReference.split('_')[1] : '90210'}</span>
          </h2>

          <div className="space-y-2 text-brand-black/70">
            <div className="flex justify-between">
              <span>Nro. de Operación:</span>
              <span className="text-brand-black font-semibold">{paymentId || 'MOCK-MP-PAYMENT'}</span>
            </div>
            {preferenceId && (
              <div className="flex justify-between">
                <span>ID de Referencia:</span>
                <span className="text-brand-black/80">{preferenceId}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Método de Pago:</span>
              <span className="text-brand-black font-semibold">Mercado Pago (Checkout Pro)</span>
            </div>
            <div className="flex justify-between">
              <span>Envío:</span>
              <span className="text-brand-brown uppercase tracking-wider font-semibold text-[10px]">Cortesía del Atelier</span>
            </div>
          </div>

          <div className="pt-3 border-t border-brand-brown/20 space-y-1.5 font-sans">
            <h3 className="font-serif text-xs font-semibold text-brand-black flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-brand-brown" />
              <span>Confección y Despacho</span>
            </h3>
            <p className="text-[11px] text-brand-black/70 leading-relaxed">
              Comenzamos el corte de su moldería a medida. Estimamos la entrega en su domicilio entre el <strong>{estimatedDelivery}</strong>. Recibirá el número de tracking de Correo Argentino / DHL en su casilla de correo.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-between relative">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-5 py-3 border border-brand-brown/30 hover:border-brand-brown hover:text-brand-brown font-mono text-[10px] uppercase tracking-widest text-brand-black transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Recibo</span>
          </button>
          
          <button
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-black hover:bg-brand-brown text-brand-white font-mono text-[10px] uppercase tracking-widest transition-all"
          >
            <span>Volver al Atelier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-center text-[10px] text-brand-black/40 font-mono flex items-center justify-center gap-1 relative">
          <Sparkles className="w-3.5 h-3.5 text-brand-brown" />
          <span>Ivana Racca — Hecho a mano, despacio.</span>
        </div>
      </div>
    </div>
  );
}

export function PendienteView({ onGoHome }: { onGoHome: () => void }) {
  return (
    <div className="min-h-screen bg-brand-ivory py-24 md:py-32 flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-brand-white border border-brand-brown/20 p-8 md:p-12 shadow-md space-y-8 relative">
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-brown/5 pointer-events-none" />

        <div className="text-center space-y-3 relative">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <AlertTriangle className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="font-mono text-[9px] tracking-widest text-amber-600 uppercase block">
            Pago en Proceso de Verificación
          </span>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-brand-black">
            Transacción Pendiente
          </h1>
          <p className="font-serif text-sm italic text-brand-black/60">
            Su entidad bancaria se encuentra procesando la operación.
          </p>
        </div>

        <div className="bg-brand-ivory p-6 border border-brand-brown/10 space-y-3 text-xs leading-relaxed">
          <p className="font-sans text-brand-black/70">
            La red de cobros de Mercado Pago está esperando la aprobación definitiva de los fondos. En la mayoría de los casos, este proceso se resuelve automáticamente en unos minutos.
          </p>
          <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-brand-black/60">
            <li>No es necesario realizar un nuevo intento de compra.</li>
            <li>Le enviaremos una notificación de confirmación al validar los fondos.</li>
            <li>Su reserva de moldería continúa activa durante las próximas 24 horas.</li>
          </ul>
        </div>

        <div className="flex justify-center relative">
          <button
            onClick={onGoHome}
            className="w-full py-3 px-6 bg-brand-black hover:bg-brand-brown text-brand-white font-mono text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Volver a la Tienda</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ErrorView({ onGoHome }: { onGoHome: () => void }) {
  return (
    <div className="min-h-screen bg-brand-ivory py-24 md:py-32 flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-brand-white border border-brand-brown/20 p-8 md:p-12 shadow-md space-y-8 relative">
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-brown/5 pointer-events-none" />

        <div className="text-center space-y-3 relative">
          <div className="w-12 h-12 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="font-mono text-[9px] tracking-widest text-red-600 uppercase block">
            Pago Rechazado o Cancelado
          </span>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-brand-black">
            Error en Transacción
          </h1>
          <p className="font-serif text-sm italic text-brand-black/60">
            No pudimos procesar la orden de pago a través de Mercado Pago.
          </p>
        </div>

        <div className="bg-brand-ivory p-6 border border-brand-brown/10 space-y-3 text-xs leading-relaxed text-brand-black/70 font-sans">
          <p>
            Esto puede deberse a límites de la tarjeta, fondos insuficientes o rechazos automáticos de seguridad. Le sugerimos:
          </p>
          <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-brand-black/60">
            <li>Verificar que los datos de su tarjeta sean correctos.</li>
            <li>Consultar con su banco la habilitación para compras de alta gama.</li>
            <li>Reintentar con otro medio de pago o escribirnos por WhatsApp para transferencia.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 relative">
          <a
            href={getWhatsAppUrl("Hola Ivana, no pude completar el pago desde la web y necesito asistencia.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 text-center border border-brand-brown/30 font-mono text-[10px] uppercase tracking-widest text-brand-black hover:border-brand-brown hover:text-brand-brown transition-colors flex items-center justify-center"
          >
            <span>Asistencia de Taller</span>
          </a>
          <button
            onClick={onGoHome}
            className="flex-1 py-3 bg-brand-black hover:bg-brand-brown text-brand-white font-mono text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Volver a Intentar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
