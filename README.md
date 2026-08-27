# 🧵 IVANA RACCA — ONE PAGE PREMIUM & CHECKOUT PRO

**Ivana Racca** is an ultra-premium, full-stack, editorial-grade e-commerce single-page portfolio designed specifically for high-fashion designers. Inspired by minimalist modern layout rhythms (such as Mariana on Squarespace), the design leverages high contrast, sophisticated serif headlines, generous white space, and subtle, smooth parallax interactions.

The system is fully responsive, production-ready, and features a secure, full-stack integration with **Mercado Pago Checkout Pro** and webhook verification servers.

---

## ✨ Features

- **Editorial-grade Layouts**: Asymmetric catalogs, bento-inspired organic grids, large text hierarchies, and curated neutral-palette photography.
- **Micro-interactions & Animations**: Powered by `motion/react` (Framer Motion v12). Includes custom-molded cursor tracking, hover zooms, and smooth-height FAQ accordions.
- **Secure Full-Stack Architecture**: Express + Vite. Private keys (like `MERCADO_PAGO_ACCESS_TOKEN`) are handled safely on the backend proxy server and never exposed to client browsers.
- **Functional Shopping Bag**: Fluid slide-out side cart panel with size/color controllers and a local persistence layer (`localStorage`).
- **Resilient Fallback Mode**: If Mercado Pago environment credentials are not present, the system automatically runs in a secure **"Atelier Emulation"** mode, letting users fully test the checkout flow, receipt printing, and order tracking.
- **SEO & Structured Metadata**: Integrates Organization, Breadcrumb, and dynamic Schema FAQ JSON-LD injections to achieve perfect Lighthouse indexing scores.

---

## 📂 Project Architecture

```
├── server.ts               # Express full-stack server (Dev Vite-middleware, API proxy, Webhook listener)
├── package.json            # Scripts, dev dependencies & esbuild bundler rules
├── index.html              # Primary SPA mounting target
├── metadata.json           # Application title, permissions, and major capabilities
├── src/
│   ├── App.tsx             # Core React client entry, state management and SPA routing
│   ├── main.tsx            # DOM node mounting
│   ├── index.css           # Google Fonts integrations, custom scrollbars, and Tailwind declarations
│   ├── data.ts             # Curated copywriting, products catalog, and campaign resources
│   ├── types.ts            # Robust TypeScript typings and interfaces
│   └── components/
│       ├── CustomCursor.tsx       # Soft golden cursor tracking
│       ├── Navbar.tsx             # Translucent glassmorphic top bar
│       ├── CartDrawer.tsx         # Slide-out purchasing drawer with dynamic checkout inputs
│       ├── ProductCard.tsx        # Asymmetrical magazine-style display cards
│       ├── ProductModal.tsx       # Detail modal with size-guide overlays
│       ├── BespokeBanner.tsx      # Eco-luxury and sustainability manifesto blocks
│       ├── LookbookSlider.tsx     # Horizontal kampagne slides
│       ├── VideoPresentation.tsx  # Cinematic runway player HUD
│       ├── FAQAccordion.tsx       # SEO collapsible FAQs with schema injections
│       ├── ContactForm.tsx        # In-app bespoke contact forms
│       ├── FloatingWhatsApp.tsx   # Pulsating direct sizing hotline
│       └── OrderReceipts.tsx      # Outcome subviews (/gracias, /error, /pendiente)
```

---

## ⚙️ Environment Variables

Copy the `.env.example` contents to a `.env` file at the project root:

```env
# APP_URL: Dynamic application deployment link (auto-filled in Cloud Run / Vercel)
APP_URL="http://localhost:3000"

# MERCADO PAGO credentials (Retrieve these from your Mercado Pago Developers dashboard)
NEXT_PUBLIC_MP_PUBLIC_KEY="APP_USR-xxxxxx"
MERCADO_PAGO_ACCESS_TOKEN="TEST-xxxxxx"
MERCADO_PAGO_WEBHOOK_SECRET="wh_secret_xxxxxx"
```

---

## 🚀 Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
Runs the full-stack Express server utilizing local Vite dev-middleware:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Build for Production
Compiles client assets inside `dist/` and bundles the Express server using `esbuild` into a self-contained, high-performance CommonJS file (`dist/server.cjs`):
```bash
npm run build
```

### 4. Start Production Server
```bash
npm run start
```

---

## 💳 Testing Payments (Mercado Pago Checkout Pro)

1. **Activate credentials**: Go to [Mercado Pago Developers](https://developers.mercadopago.com/) and register your application.
2. **Access token**: Locate your Sandbox/Production `Access Token` and paste it inside the `MERCADO_PAGO_ACCESS_TOKEN` variable in your `.env` file.
3. **Use Sandbox Cards**: During Checkout Pro, use Mercado Pago's official [Testing Cards](https://files.mercadopago.com/developer-site/pages/en-US/credit_cards.html) (e.g. Approved, Pending, Rejected numbers) to test the various outcome screens of our **GraciasView**, **PendienteView**, and **ErrorView** components.
