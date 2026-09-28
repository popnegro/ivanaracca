/**
 * Eventos (diseños para Ana Laura Nicoletti) y notas de prensa.
 * Orden: más reciente primero (date ISO-ish YYYY-MM).
 */

export type EventType = 'escena' | 'editorial' | 'produccion' | 'evento';

export interface EventItem {
  id: string;
  date: string;
  dateLabel: string;
  type: EventType;
  title: string;
  pieceName: string;
  featuredPerson: string;
  summary: string;
  images: string[];
  credits?: string;
}

export interface PressItem {
  id: string;
  dateLabel: string;
  outlet: string;
  title: string;
  excerpt: string;
  url: string;
}

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  escena: 'Escena',
  editorial: 'Editorial',
  produccion: 'Producción',
  evento: 'Evento',
};

export const EVENT_ITEMS: EventItem[] = [
  {
    id: 'evt-black-2026',
    date: '2026-09',
    dateLabel: '2026',
    type: 'escena',
    title: 'Vestido negro de escena',
    pieceName: 'Vestido Negro',
    featuredPerson: 'Ana Laura Nicoletti',
    summary:
      'Pieza de autor en negro, de presencia escénica y silueta ceñida, realizada por Ivana Racca para una producción nocturna.',
    images: ['/images/event-ana-laura-negro.webp'],
    credits: 'Diseño y confección: Ivana Racca · En cuerpo: Ana Laura Nicoletti',
  },
  {
    id: 'evt-turquesa-2026',
    date: '2026-09',
    dateLabel: '2026',
    type: 'escena',
    title: 'Vestido turquesa de escenario',
    pieceName: 'Vestido Turquesa',
    featuredPerson: 'Ana Laura Nicoletti',
    summary:
      'Vestido de escena en tono turquesa, con encaje y falda de movimiento, realizado por Ivana Racca para una presentación en vivo.',
    images: ['/images/event-ana-laura-turquesa.webp'],
    credits: 'Diseño y confección: Ivana Racca · En cuerpo: Ana Laura Nicoletti',
  },
  {
    id: 'evt-plate',
    date: '2024-01',
    dateLabel: '2024',
    type: 'produccion',
    title: 'Vestido de placas',
    pieceName: 'Vestido Plateado',
    featuredPerson: 'Ana Laura Nicoletti',
    summary:
      'Diseño de alta costura confeccionado por Ivana Racca para Ana Laura Nicoletti: silueta estructurada, juego de placas y caída contemporánea.',
    images: [
      '/images/ana-laura-turca-nicoletti-plate-dress-up.webp',
      '/images/plate-dress-laturca.webp',
      '/images/ana-laura-turca-nicoletti-plate-dress-down.webp',
    ],
    credits: 'Diseño y confección: Ivana Racca · En cuerpo: Ana Laura Nicoletti',
  },
  {
    id: 'evt-black',
    date: '2023-01',
    dateLabel: '2023',
    type: 'escena',
    title: 'Vestido negro de autor',
    pieceName: 'Vestido Negro',
    featuredPerson: 'Ana Laura Nicoletti',
    summary:
      'Pieza en negro pensada para escena y presencia: líneas limpias, espalda trabajada y escote definido, realizada en el atelier de Maipú.',
    images: [
      '/images/ana-laura-turca-nicoletti-black-dress.webp',
      '/images/ana-laura-turca-nicoletti-black-dress-espalda.webp',
      '/images/ana-laura-turca-nicoletti-black-dress-escote.webp',
    ],
    credits: 'Diseño y confección: Ivana Racca · En cuerpo: Ana Laura Nicoletti',
  },
];

export const PRESS_ITEMS: PressItem[] = [
  {
    id: 'press-los-andes-2021',
    dateLabel: 'Abril 2021',
    outlet: 'Los Andes',
    title:
      'La historia de Ivana, una diseñadora trans mendocina que arma ropa interior especial',
    excerpt:
      'Perfil sobre el oficio de Ivana Racca: confección, talles especiales y trayectoria vinculada a Mendoza y la escena.',
    url: 'https://www.losandes.com.ar/sociedad/la-historia-de-ivana-una-disenadora-trans-mendocina-que-arma-ropa-interior-especial-y-es-furor-de-ventas-en-redes',
  },
];
