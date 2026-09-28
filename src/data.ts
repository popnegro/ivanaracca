/**
 * Official Data for Ivana Racca website.
 * Collection, Services, Catalog products (with SEO pages), FAQ.
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

export interface CatalogFaq {
  question: string;
  answer: string;
}

export interface CatalogItem {
  id: string;
  slug: string;
  name: string;
  /** Short blurb for home grid */
  description: string;
  imageUrl: string;
  whatsappMessage: string;
  /** SEO */
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  longDescription: string;
  benefits: string[];
  processSteps: string[];
  geoNote: string;
  faqs: CatalogFaq[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: 'col-1',
    name: 'Mono Asimétrico Tierra',
    category: 'Alta Costura',
    imageUrl: '/images/brown-dress.webp',
    images: [
      '/images/brown-dress.webp',
      '/images/brown-dress-cintura.webp',
      '/images/brown-dress-tela.webp',
    ],
    whatsappMessage:
      'Hola Ivana, quiero consultar por el diseño Mono Asimétrico Tierra de la colección.',
  },
  {
    id: 'col-2',
    name: 'Vestido Rainbow',
    category: 'Alta Costura',
    imageUrl: '/images/rainbow-dress.webp',
    images: [
      '/images/rainbow-dress.webp',
      '/images/rainbow-dress-caida.webp',
      '/images/rainbow-dress-tela.webp',
    ],
    whatsappMessage:
      'Hola Ivana, quiero consultar por el diseño Vestido Rainbow de la colección.',
  },
  {
    id: 'col-3',
    name: 'Vestido Plateado',
    category: 'Alta Costura',
    imageUrl: '/images/plate-dress-laturca.webp',
    images: [
      '/images/plate-dress-laturca.webp',
      '/images/ana-laura-turca-nicoletti-plate-dress-up.webp',
      '/images/ana-laura-turca-nicoletti-plate-dress-down.webp',
    ],
    whatsappMessage:
      'Hola Ivana, quiero consultar por el diseño Vestido Plateado de la colección.',
  },
  {
    id: 'col-4',
    name: 'Vestido Negro',
    category: 'Alta Costura',
    imageUrl: '/images/ana-laura-turca-nicoletti-black-dress.webp',
    images: [
      '/images/ana-laura-turca-nicoletti-black-dress.webp',
      '/images/ana-laura-turca-nicoletti-black-dress-espalda.webp',
      '/images/ana-laura-turca-nicoletti-black-dress-escote.webp',
    ],
    whatsappMessage:
      'Hola Ivana, quiero consultar por el diseño Vestido Negro de la colección.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    number: '01',
    title: 'ALTA COSTURA',
    description: 'Diseño y confección de prendas únicas para ocasiones especiales.',
    whatsappMessage: 'Hola Ivana, quiero consultar por un trabajo de alta costura.',
  },
  {
    id: 'srv-2',
    number: '02',
    title: 'CONFECCIÓN A MEDIDA',
    description: 'Una prenda pensada para tu cuerpo, tus medidas y tu idea.',
    whatsappMessage: 'Hola Ivana, quiero consultar por una prenda a medida.',
  },
  {
    id: 'srv-3',
    number: '03',
    title: 'AJUSTES & TRANSFORMACIONES',
    description:
      'Modificar, adaptar o transformar una prenda existente para darle una nueva forma.',
    whatsappMessage: 'Hola Ivana, quiero consultar por un ajuste o transformación.',
  },
  {
    id: 'srv-4',
    number: '04',
    title: 'VESTUARIO',
    description:
      'Diseño y realización de vestuario para escena, eventos y producciones.',
    whatsappMessage: 'Hola Ivana, quiero consultar por vestuario.',
  },
];

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'cat-1',
    slug: 'trucadoras',
    name: 'Trucadoras',
    description:
      'Prendas interiores pensadas para acompañar, sostener y transformar la forma de vestir.',
    imageUrl: '/images/trucadoras.webp',
    whatsappMessage: 'Hola Ivana, quiero consultar por trucadoras.',
    seoTitle: 'Trucadoras a medida en Maipú, Mendoza | Ivana Racca',
    seoDescription:
      'Trucadoras confeccionadas a medida en el atelier de Ivana Racca, Maipú (Mendoza). Consultá por WhatsApp: talles, materiales y plazos con cita previa.',
    h1: 'Trucadoras a medida en Maipú, Mendoza',
    intro:
      'Piezas interiores pensadas para acompañar, sostener y transformar la silueta con oficio artesanal.',
    longDescription:
      'Las trucadoras de Ivana Racca se confeccionan en el atelier de Canal de Beagle 2520, Maipú, Mendoza. Cada pieza se trabaja según necesidad real: soporte, comodidad y forma, con materiales elegidos para el uso diario. No es un producto de góndola: es una prenda de autor orientada a cuerpos y situaciones que el mercado estándar suele dejar de lado. El precio y el talle se acuerdan en la consulta por WhatsApp; la atención es con cita previa de lunes a viernes de 9 a 17 hs.',
    benefits: [
      'Confección artesanal orientada a tu cuerpo y objetivo de silueta',
      'Consulta personalizada por WhatsApp antes de producir',
      'Atelier local en Maipú, con pruebas y ajustes coordinados',
      'Materiales pensados para sostén, confort y durabilidad',
    ],
    processSteps: [
      'Escribís por WhatsApp contando qué necesitás',
      'Ivana orienta talle, material y plazos',
      'Se coordina cita en el atelier si hace falta prueba',
      'Confección y entrega según lo acordado',
    ],
    geoNote:
      'Atelier en Canal de Beagle 2520, M5514 Maipú, Mendoza. Zona de atención: Maipú y Gran Mendoza.',
    faqs: [
      {
        question: '¿Las trucadoras tienen talle estándar?',
        answer:
          'Se trabajan a partir de tu necesidad. En la consulta se define el enfoque (medidas, soporte, uso) para que la pieza tenga sentido en tu cuerpo.',
      },
      {
        question: '¿Cómo consulto precio y plazos?',
        answer:
          'Por WhatsApp. No hay carrito online: el presupuesto se arma según el trabajo y la agenda del atelier.',
      },
    ],
  },
  {
    id: 'cat-2',
    slug: 'suspensores',
    name: 'Suspensores',
    description:
      'Diseño, funcionalidad y ajuste en una pieza pensada para el uso cotidiano.',
    imageUrl: '/images/suspensores.webp',
    whatsappMessage: 'Hola Ivana, quiero consultar por suspensores.',
    seoTitle: 'Suspensores artesanales en Maipú, Mendoza | Ivana Racca',
    seoDescription:
      'Suspensores de confección artesanal en Maipú, Mendoza. Diseño, ajuste y uso cotidiano. Consultá disponibilidad y medidas con Ivana Racca por WhatsApp.',
    h1: 'Suspensores artesanales en Maipú, Mendoza',
    intro:
      'Funcionalidad y ajuste en una pieza pensada para acompañar el día a día con oficio de modistería.',
    longDescription:
      'Los suspensores del catálogo de Ivana Racca combinan diseño y función. Se realizan en el atelier de Maipú con mirada de modista: buen ajuste, materiales coherentes con el uso y terminaciones cuidadas. Sirven a quienes buscan una solución interior confiable sin renunciar a la calidad de una prenda hecha a conciencia. La consulta es por WhatsApp; horarios de atención del atelier: lunes a viernes de 9 a 17 hs, con cita previa.',
    benefits: [
      'Enfoque en ajuste real y uso cotidiano',
      'Confección local en atelier de Maipú',
      'Orientación personalizada antes de encargar',
      'Complemento del catálogo de prendas interiores de autor',
    ],
    processSteps: [
      'Consulta por WhatsApp con tu pedido o duda',
      'Definición de medidas / enfoque de la pieza',
      'Acuerdo de plazos y eventual prueba en atelier',
      'Confección y coordinación de entrega',
    ],
    geoNote:
      'Producción y atención en Canal de Beagle 2520, Maipú, Mendoza (CP 5514).',
    faqs: [
      {
        question: '¿Puedo encargar solo suspensores?',
        answer:
          'Sí. Podés consultar únicamente este producto o combinarlo con otras piezas del catálogo o del oficio a medida.',
      },
      {
        question: '¿Hay stock inmediato?',
        answer:
          'Depende de la agenda y del tipo de pedido. En WhatsApp te confirman disponibilidad o tiempo de confección.',
      },
    ],
  },
  {
    id: 'cat-3',
    slug: 'ropa-interior',
    name: 'Ropa interior',
    description:
      'Talles exclusivos o especiales, confeccionados para necesidades que no siempre encuentran respuesta en las medidas convencionales.',
    imageUrl: '/images/ropa-interior-inclusiva.webp',
    whatsappMessage:
      'Hola Ivana, quiero consultar por ropa interior en talles exclusivos o especiales.',
    seoTitle:
      'Ropa interior en talles especiales | Maipú, Mendoza — Ivana Racca',
    seoDescription:
      'Ropa interior en talles exclusivos o especiales confeccionada en Maipú, Mendoza. Atelier de Ivana Racca: consulta por WhatsApp, cita previa L–V 9 a 17 hs.',
    h1: 'Ropa interior en talles especiales — Maipú, Mendoza',
    intro:
      'Confección para necesidades que no siempre encuentran respuesta en las medidas convencionales.',
    longDescription:
      'La ropa interior en talles exclusivos o especiales es parte central del oficio de Ivana Racca. En el atelier de Maipú se diseñan y confeccionan piezas para cuerpos y requerimientos que el retail masivo suele ignorar. El proceso es consultivo: se habla por WhatsApp, se acuerdan expectativas y, si corresponde, se coordina una cita en Canal de Beagle 2520. Horario de atención: lunes a viernes de 9 a 17 hs. Sin compra online automática: cada trabajo se trata de forma personal.',
    benefits: [
      'Enfoque en talles exclusivos o necesidades específicas',
      'Diálogo directo con la modista antes de producir',
      'Atelier en Maipú, accesible para Gran Mendoza',
      'Misma calidad de oficio que el resto del catálogo y la alta costura',
    ],
    processSteps: [
      'Mensaje por WhatsApp describiendo lo que necesitás',
      'Orientación sobre viabilidad, materiales y tiempos',
      'Cita en atelier si se requieren medidas o pruebas',
      'Confección artesanal y entrega acordada',
    ],
    geoNote:
      'Ivana Racca — Atelier en Maipú, Mendoza. Consultas por WhatsApp al +54 9 261 753-0617.',
    faqs: [
      {
        question: '¿Qué significa talles exclusivos o especiales?',
        answer:
          'Medidas o necesidades que no se resuelven bien con la grilla estándar de marcas masivas. Se evalúa cada caso en la consulta.',
      },
      {
        question: '¿Atienden solo en Maipú?',
        answer:
          'El atelier está en Maipú. La zona de referencia es Maipú y Gran Mendoza; el primer contacto siempre es por WhatsApp.',
      },
    ],
  },
];

export function getCatalogBySlug(slug: string): CatalogItem | undefined {
  return CATALOG_ITEMS.find((item) => item.slug === slug);
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Dónde está el atelier de Ivana Racca?',
    answer:
      'El atelier está en Canal de Beagle 2520, M5514 Maipú, Mendoza, Argentina. Las consultas y turnos se coordinan por WhatsApp.',
  },
  {
    id: 'faq-2',
    question: '¿Cuáles son los horarios de atención?',
    answer:
      'Lunes a viernes de 9 a 17 hs. La atención es con cita previa coordinada por WhatsApp.',
  },
  {
    id: 'faq-3',
    question: '¿Qué servicios ofrece?',
    answer:
      'Alta costura, confección a medida, ajustes y transformaciones de prendas, vestuario escénico, y catálogo de prendas interiores (trucadoras, suspensores y talles especiales).',
  },
  {
    id: 'faq-4',
    question: '¿Cómo pido un presupuesto o turno?',
    answer:
      'Por WhatsApp al +54 9 261 753-0617. Contá tu idea, el tipo de prenda o servicio que necesitás y te responde Ivana para coordinar.',
  },
  {
    id: 'faq-5',
    question: '¿Trabaja con talles especiales o exclusivos?',
    answer:
      'Sí. Parte del oficio es diseñar y confeccionar para cuerpos y necesidades que no siempre encuentran respuesta en medidas convencionales, incluyendo ropa interior en talles exclusivos o especiales.',
  },
  {
    id: 'faq-6',
    question: '¿Cuánto tarda una prenda a medida?',
    answer:
      'Depende del tipo de trabajo (ajuste, transformación o prenda desde cero), la complejidad y la agenda del atelier. Al consultar por WhatsApp se acuerda un plazo realista según el pedido.',
  },
  {
    id: 'faq-7',
    question: '¿Hace vestuario para escena o eventos?',
    answer:
      'Sí. Diseña y realiza vestuario para espectáculos, teatro, danza y puestas en escena, además de prendas para ocasiones especiales.',
  },
];
