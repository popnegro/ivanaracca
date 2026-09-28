# Ivana Racca — Sitio oficial

One-page institucional y de leads para **Ivana Racca**, diseñadora y modista en Maipú, Mendoza.

**Producción:** [https://ivanaracca.vercel.app/](https://ivanaracca.vercel.app/)

---

## Qué es este proyecto

- Portfolio editorial (Hero, Atelier, Colección, Oficio, Catálogo, Contacto).
- Conversión de leads **solo por WhatsApp** (mensajes pre-rellenados + tracking GA4 `generate_lead`).
- SEO local (Maipú / Mendoza) + JSON-LD (Person, LocalBusiness, Products).
- Backend opcional Mercado Pago (Checkout Pro + webhook) en `server.ts` — **integración de producción = Fase 4**.

No es un e-commerce completo en la UI actual: el canal principal es WhatsApp.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 19, TypeScript, Vite 6, Tailwind 4, Motion |
| Backend | Express (`server.ts`) — preferencias MP + webhook |
| Deploy | Vercel (SPA rewrites) |
| Analytics | GA4 (`G-48NQ6Q1TT0`) |

---

## Desarrollo

```bash
npm install
cp .env.example .env   # opcional: MERCADO_PAGO_ACCESS_TOKEN, APP_URL
npm run dev            # http://localhost:3000
```

```bash
npm run build
npm start
```

---

## Estructura relevante

```
src/
  App.tsx                 # SPA + rutas /gracias /pendiente /error
  data.ts                 # Colección, servicios, catálogo
  components/             # Header, Hero, Collection, Catalog, Contact, …
  utils/analytics.ts      # GA4 (eventos diferidos para INP)
  utils/whatsapp.ts       # wa.me + mensajes
server.ts                 # API MP + static en producción
public/images/            # Assets WebP/JPG + og-image.webp
index.html                # Meta SEO, GEO, JSON-LD, preload LCP
```

---

## Variables de entorno

```env
APP_URL=https://ivanaracca.vercel.app
MERCADO_PAGO_ACCESS_TOKEN=   # opcional; sin token → modo emulación
```

---

## Leads

Todos los CTAs relevantes abren WhatsApp (`5492617530617`) y disparan eventos diferidos (`click_cta`, `contact_whatsapp`, `generate_lead`) para no bloquear INP.

---

## Roadmap breve

- **Hecho (optimize-24h):** limpieza, OG WebP, theme-color, analytics diferido, CP 5515, README real.
- **Pendiente:** `streetAddress` del atelier (dato del cliente).
- **Fase 4:** integración Mercado Pago en producción (API Vercel + persistencia de órdenes).

---

© Ivana Racca · Maipú, Mendoza
