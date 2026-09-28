/**
 * Official Data for Ivana Racca website.
 * Contains Collection, Services (Oficio), Catalog (Products), and FAQ.
 */

export interface CollectionItem {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  images: string[];
  whatsappMessage: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  whatsappMessage: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  whatsappMessage: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: "col-1",
    name: "Mono Asimétrico Tierra",
    category: "Alta Costura",
    imageUrl: "/images/brown-dress.webp",
    images: [
      "/images/brown-dress.webp",
      "/images/brown-dress-cintura.webp",
      "/images/brown-dress-tela.webp"
    ],
    whatsappMessage: "Hola Ivana, quiero consultar por el diseño Mono Asimétrico Tierra de la colección."
  },
  {
    id: "col-2",
    name: "Vestido Rainbow",
    category: "Alta Costura",
    imageUrl: "/images/rainbow-dress.webp",
    images: [
      "/images/rainbow-dress.webp",
      "/images/rainbow-dress-caida.webp",
      "/images/rainbow-dress-tela.webp"
    ],
    whatsappMessage: "Hola Ivana, quiero consultar por el diseño Vestido Rainbow de la colección."
  },
  {
    id: "col-3",
    name: "Vestido Plateado",
    category: "Alta Costura",
    imageUrl: "/images/plate-dress-laturca.webp",
    images: [
      "/images/plate-dress-laturca.webp",
      "/images/ana-laura-turca-nicoletti-plate-dress-up.webp",
      "/images/ana-laura-turca-nicoletti-plate-dress-down.webp"
    ],
    whatsappMessage: "Hola Ivana, quiero consultar por el diseño Vestido Plateado de la colección."
  },
  {
    id: "col-4",
    name: "Vestido Negro",
    category: "Alta Costura",
    imageUrl: "/images/ana-laura-turca-nicoletti-black-dress.webp",
    images: [
      "/images/ana-laura-turca-nicoletti-black-dress.webp",
      "/images/ana-laura-turca-nicoletti-black-dress-espalda.webp",
      "/images/ana-laura-turca-nicoletti-black-dress-escote.webp"
    ],
    whatsappMessage: "Hola Ivana, quiero consultar por el diseño Vestido Negro de la colección."
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    number: "01",
    title: "ALTA COSTURA",
    description: "Diseño y confección de prendas únicas para ocasiones especiales.",
    whatsappMessage: "Hola Ivana, quiero consultar por un trabajo de alta costura."
  },
  {
    id: "srv-2",
    number: "02",
    title: "CONFECCIÓN A MEDIDA",
    description: "Una prenda pensada para tu cuerpo, tus medidas y tu idea.",
    whatsappMessage: "Hola Ivana, quiero consultar por una prenda a medida."
  },
  {
    id: "srv-3",
    number: "03",
    title: "AJUSTES & TRANSFORMACIONES",
    description: "Modificar, adaptar o transformar una prenda existente para darle una nueva forma.",
    whatsappMessage: "Hola Ivana, quiero consultar por un ajuste o transformación."
  },
  {
    id: "srv-4",
    number: "04",
    title: "VESTUARIO",
    description: "Diseño y realización de vestuario para escena, eventos y producciones.",
    whatsappMessage: "Hola Ivana, quiero consultar por vestuario."
  }
];

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "cat-1",
    name: "Trucadoras",
    description: "Prendas interiores pensadas para acompañar, sostener y transformar la forma de vestir.",
    imageUrl: "/images/trucadoras.webp",
    whatsappMessage: "Hola Ivana, quiero consultar por trucadoras."
  },
  {
    id: "cat-2",
    name: "Suspensores",
    description: "Diseño, funcionalidad y ajuste en una pieza pensada para el uso cotidiano.",
    imageUrl: "/images/suspensores.webp",
    whatsappMessage: "Hola Ivana, quiero consultar por suspensores."
  },
  {
    id: "cat-3",
    name: "Ropa interior",
    description: "Talles exclusivos o especiales, confeccionados para necesidades que no siempre encuentran respuesta en las medidas convencionales.",
    imageUrl: "/images/ropa-interior-inclusiva.webp",
    whatsappMessage: "Hola Ivana, quiero consultar por ropa interior en talles exclusivos o especiales."
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "¿Dónde está el atelier de Ivana Racca?",
    answer:
      "El atelier está en Canal de Beagle 2520, M5514 Maipú, Mendoza, Argentina. Las consultas y turnos se coordinan por WhatsApp."
  },
  {
    id: "faq-2",
    question: "¿Cuáles son los horarios de atención?",
    answer:
      "Lunes a viernes de 9 a 17 hs. La atención es con cita previa coordinada por WhatsApp."
  },
  {
    id: "faq-3",
    question: "¿Qué servicios ofrece?",
    answer:
      "Alta costura, confección a medida, ajustes y transformaciones de prendas, vestuario escénico, y catálogo de prendas interiores (trucadoras, suspensores y talles especiales)."
  },
  {
    id: "faq-4",
    question: "¿Cómo pido un presupuesto o turno?",
    answer:
      "Por WhatsApp al +54 9 261 753-0617. Contá tu idea, el tipo de prenda o servicio que necesitás y te responde Ivana para coordinar."
  },
  {
    id: "faq-5",
    question: "¿Trabaja con talles especiales o exclusivos?",
    answer:
      "Sí. Parte del oficio es diseñar y confeccionar para cuerpos y necesidades que no siempre encuentran respuesta en medidas convencionales, incluyendo ropa interior en talles exclusivos o especiales."
  },
  {
    id: "faq-6",
    question: "¿Cuánto tarda una prenda a medida?",
    answer:
      "Depende del tipo de trabajo (ajuste, transformación o prenda desde cero), la complejidad y la agenda del atelier. Al consultar por WhatsApp se acuerda un plazo realista según el pedido."
  },
  {
    id: "faq-7",
    question: "¿Hace vestuario para escena o eventos?",
    answer:
      "Sí. Diseña y realiza vestuario para espectáculos, teatro, danza y puestas en escena, además de prendas para ocasiones especiales."
  }
];
