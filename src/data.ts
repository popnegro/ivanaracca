/**
 * Official Data for Ivana Racca website.
 * Contains Collection, Services (Oficio), and Catalog (Products).
 */

export interface CollectionItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
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

export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: "col-1",
    name: "Mono Asimétrico Tierra",
    category: "Alta Costura",
    imageUrl: "/images/brown_asymmetric_jumpsuit_1784175312134.jpg",
    whatsappMessage: "Hola Ivana, quiero consultar por el diseño Mono Asimétrico Tierra de la colección."
  },
  {
    id: "col-2",
    name: "Vestido Gala Prisma",
    category: "Alta Costura",
    imageUrl: "/images/rainbow_silk_gown_1784175325434.jpg",
    whatsappMessage: "Hola Ivana, quiero consultar por el diseño Vestido Gala Prisma de la colección."
  },
  {
    id: "col-3",
    name: "Saco Sastre Lino",
    category: "Alta Costura",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    whatsappMessage: "Hola Ivana, quiero consultar por el diseño Saco Sastre Lino de la colección."
  },
  {
    id: "col-4",
    name: "Vestido Corte Líquido",
    category: "Alta Costura",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    whatsappMessage: "Hola Ivana, quiero consultar por el diseño Vestido Corte Líquido de la colección."
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
    name: "TRUCADORAS",
    description: "Prendas interiores pensadas para acompañar, sostener y transformar la forma de vestir.",
    imageUrl: "/images/trucadoras.webp",
    whatsappMessage: "Hola Ivana, quiero consultar por trucadoras."
  },
  {
    id: "cat-2",
    name: "SUSPENSORES",
    description: "Diseño, funcionalidad y ajuste en una pieza pensada para el uso cotidiano.",
    imageUrl: "/images/suspensores.webp",
    whatsappMessage: "Hola Ivana, quiero consultar por suspensores."
  },
  {
    id: "cat-3",
    name: "ROPA INTERIOR",
    description: "Talles exclusivos o especiales, confeccionados para necesidades que no siempre encuentran respuesta en las medidas convencionales.",
    imageUrl: "/images/ropa-interior-inclusiva.webp",
    whatsappMessage: "Hola Ivana, quiero consultar por ropa interior en talles exclusivos o especiales."
  }
];
