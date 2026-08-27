/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial, FAQItem } from './types';

export const BRAND_NAME = "Ivana Racca";
export const BRAND_TAGLINE = "El lujo de la lentitud";
export const BRAND_STORY = {
  philosophy: "Diseñamos para habitar el espacio con gracia y peso. Creemos en un minimalismo con alma: estructuras fluidas que conversan con la anatomía y el viento. Cada pieza se confecciona en nuestro taller a un ritmo humano, utilizando lino de cultivo ético, sedas lavadas y lanas recuperadas de hilanderías familiares.",
  atelier: "En nuestro taller de Buenos Aires, el tiempo se estira. Cada costura interior está terminada al bies, cada botón de nácar es cosido a mano y cada patrón se esculpe directamente sobre el maniquí. No respondemos a temporadas rápidas; creamos reliquias contemporáneas pensadas para trascender generaciones.",
  materials: "Trabajamos exclusivamente con fibras 100% naturales, certificadas y de bajo impacto hídrico. El lino belga, la seda cruda de descarte industrial y la alpaca tejida a mano constituyen los pilares táctiles de nuestra identidad."
};

export const PRODUCTS: Product[] = [
  {
    id: "prod-6",
    name: "Mono Asimétrico Tierra",
    slug: "mono-asimetrico-tierra",
    description: "Un mono suntuoso con un drapeado asimétrico esculpido a mano y perneras fluidas de corte ancho. Confeccionado en jersey de viscosa premium de gran peso que cae con elegancia arquitectónica.",
    details: [
      "Viscosa de cultivo ético de caída pesada premium",
      "Escote asimétrico drapeado con sutil detalle de recorte lateral",
      "Perneras ultra anchas que imitan el movimiento de un vestido largo",
      "Cintura elastizada oculta para un calce adaptable y confortable",
      "Hecho a mano individualmente en nuestro atelier de Buenos Aires"
    ],
    price: 410000,
    priceUSD: 460,
    images: [
      "/src/assets/images/brown_asymmetric_jumpsuit_1784175312134.jpg"
    ],
    colors: [
      { name: "Tierra Visón", hex: "#4a3c31" }
    ],
    sizes: ["S", "M", "L"],
    category: "Monos",
    isNew: true,
    stock: 4
  },
  {
    id: "prod-7",
    name: "Vestido Gala Prisma",
    slug: "vestido-gala-prisma",
    description: "Un espectacular vestido de noche de un solo hombro, cortado al bies en suntuosa seda italiana. Luce un degradé de colores del arcoíris pintado digitalmente de manera fluida, que cambia con cada pliegue y paso.",
    details: [
      "100% Seda de satén italiana con brillo premium",
      "Diseño asimétrico de un solo hombro con torso drapeado a mano",
      "Degradé cromático de arcoíris fluido en todo el textil",
      "Falda acampanada de corte espectacular con arrastre sutil",
      "Terminaciones de costura invisibles realizadas por maestros sastres"
    ],
    price: 890000,
    priceUSD: 990,
    images: [
      "/src/assets/images/rainbow_silk_gown_1784175325434.jpg"
    ],
    colors: [
      { name: "Prisma Gradiente", hex: "#e04040" }
    ],
    sizes: ["S", "M", "L"],
    category: "Vestidos",
    isNew: true,
    stock: 2
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "La obra de Ivana Racca representa una tregua en la industria. Sus prendas no gritan, conversan. La perfección de la sastrería en lino es sobrecogedora.",
    author: "Sofía Martínez",
    role: "Editora de Moda, Vogue Latam"
  },
  {
    id: "test-2",
    quote: "El Saco Sastre se siente como una armadura blanda. La ligereza y a la vez la caída de la tela demuestra una maestría técnica que ya no es común ver en el prêt-à-porter.",
    author: "Clara de la Serna",
    role: "Coleccionista de Alta Costura y Arquitecta"
  },
  {
    id: "test-3",
    quote: "Es el verdadero significado de lujo silencioso. La atención al detalle en las terminaciones francesas internas me recuerda a las piezas de archivo parisinas.",
    author: "Harper's Bazaar Editorial",
    role: "Reseña de Colección Anual"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "¿Cómo realizan la confección de las piezas?",
    answer: "Cada prenda se corta y confecciona individualmente bajo pedido o en tandas ultra limitadas en nuestro atelier de Buenos Aires. El proceso combina técnicas de alta costura, como terminaciones de costura francesas e inglesas al bies, y dobladillos invisibles cosidos a mano.",
    category: "Atelier"
  },
  {
    id: "faq-2",
    question: "¿Cuáles son los tiempos de entrega para prendas a pedido?",
    answer: "Si una prenda se encuentra sin stock inmediato pero disponible bajo pedido ('Made to Order'), toma entre 10 y 15 días hábiles de confección en nuestro atelier. Este ritmo consciente nos permite evitar el descarte de material y garantizar la máxima calidad.",
    category: "Envíos"
  },
  {
    id: "faq-3",
    question: "¿Qué métodos de pago aceptan y cómo funciona Mercado Pago?",
    answer: "Aceptamos todas las tarjetas de crédito y débito mediante la plataforma segura de Mercado Pago (Checkout Pro). El proceso es 100% encriptado. Al presionar 'Comprar', serás redirigido para realizar el pago de manera segura, regresando luego a nuestra web para confirmar tu orden.",
    category: "Pagos"
  },
  {
    id: "faq-4",
    question: "¿Cómo selecciono mi talle ideal?",
    answer: "Trabajamos con siluetas que favorecen la soltura y la comodidad. En la descripción de cada producto verás las dimensiones exactas. Si deseas un calce más ajustado o tenés dudas de siluetas personalizadas, podés escribirnos por WhatsApp con tus medidas para asesorarte directamente.",
    category: "Sizing"
  },
  {
    id: "faq-5",
    question: "¿Cuál es su política de cambios y devoluciones?",
    answer: "Aceptamos cambios dentro de los 30 días posteriores a la recepción de la prenda, siempre que se encuentre en perfecto estado y en su empaque de lino original. Al tratarse de ediciones limitadas y numeradas, el cambio está sujeto a disponibilidad de material de confección.",
    category: "Atelier"
  }
];

export const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    title: "El trazo inicial",
    subtitle: "Estudio de pliegues"
  },
  {
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    title: "Seda cruda lavada",
    subtitle: "Texturas táctiles"
  },
  {
    url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    title: "Atelier Buenos Aires",
    subtitle: "Oficio y paciencia"
  },
  {
    url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    title: "Silueta drapeada",
    subtitle: "Corte al bies"
  },
  {
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    title: "Equilibrio asimétrico",
    subtitle: "Líneas de movimiento"
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    title: "Materia noble",
    subtitle: "Lino con memoria"
  }
];

export const LOOKBOOK_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=80",
    tag: "Volumen I",
    title: "Sastrería en Reposo",
    desc: "Siluetas libres confeccionadas con lino rústico y lanas frías."
  },
  {
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
    tag: "Volumen II",
    title: "Corte Líquido",
    desc: "Movimiento orgánico sobre seda satinada de caída infinita."
  },
  {
    url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80",
    tag: "Volumen III",
    title: "Oficios Ancestrales",
    desc: "Detalles al bies, botonería artesanal y terminación artesana."
  }
];
