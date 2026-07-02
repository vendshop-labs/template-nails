import type { ServiceItem, MasterItem, StaticTestimonial, GalleryImageItem, HoursRow, Service, TeamMember, Testimonial, Stat, WhyUsItem } from './types';

export const STORE_NAME_FALLBACK = 'Lumière Nails';
/** @deprecated use STORE_NAME_FALLBACK — runtime name comes from DB */
export const STORE_NAME = STORE_NAME_FALLBACK;
export const STORE_TAGLINE  = 'Premium Nagelstudio in Berlin.';
export const STORE_YEAR     = '2024';

export const SUPPORTED_LOCALES = ['sk', 'en', 'uk', 'cs', 'de'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  sk: 'Slovenčina',
  en: 'English',
  uk: 'Українська',
  cs: 'Čeština',
  de: 'Deutsch',
};

/** @deprecated DB whatsappPhone is the source of truth — do not use this constant */
export const WHATSAPP_NUMBER = '';

// Static services (used when DB not seeded yet or in static mode)
export const STATIC_SERVICES: ServiceItem[] = [
  { id: 's1', slug: 'klassische-manikure', nameKey: 'services.klasicka',     name: 'Klassische Maniküre', description: 'Pflege und Formgebung der natürlichen Nägel mit Nagellack nach Wahl.',  price: 18, duration: 45, image: '/services/manikura.webp', category: 'Manicure' },
  { id: 's2', slug: 'gel-manikure',        nameKey: 'services.gelova',       name: 'Gel-Maniküre',        description: 'Langanhaltende Gelnägel – bis zu 3–4 Wochen perfekter Halt.',           price: 35, duration: 60, image: '/services/gel.webp',      category: 'Manicure' },
  { id: 's3', slug: 'gel-design',          nameKey: 'services.gelovaDizajn', name: 'Gel + Design',         description: 'Gel-Maniküre mit individuellem Nail-Art-Design Ihrer Wahl.',            price: 45, duration: 75, image: '/services/gelart.webp',   category: 'Manicure' },
  { id: 's4', slug: 'pedikure',            nameKey: 'services.pediura',      name: 'Pediküre',             description: 'Professionelle Fußpflege – weiche Haut, gepflegte Nägel.',             price: 25, duration: 50, image: '/services/pediura.webp',  category: 'Pedicure' },
];

// Static masters (used in static mode)
export const STATIC_MASTERS: MasterItem[] = [
  { id: 'm1', name: 'Kristina', role: 'Nageldesignerin', bio: 'Erfahrene Nageldesignerin mit 5 Jahren Praxis. Spezialistin für Gel-Nägel und Nail Art.',       photo: '/team/team-kristina.webp' },
  { id: 'm2', name: 'Monika',   role: 'Nageldesignerin', bio: 'Expertin für Maniküre und Pediküre. Zertifizierte Ausbildung in japanischer Maniküre-Technik.', photo: '/team/team-monika.webp'   },
];

export const STATIC_TESTIMONIALS: StaticTestimonial[] = [
  { id: 't1', name: 'Lena F.',   text: 'Absolut traumhafte Gel-Nägel! Das Ergebnis hält jetzt schon 4 Wochen perfekt. Ich komme definitiv wieder.',             rating: 5 },
  { id: 't2', name: 'Sophie W.', text: 'Die Pediküre war ein Traum — meine Füße fühlen sich wie neu an. Das Studio ist wunderschön und das Team super freundlich.', rating: 5 },
  { id: 't3', name: 'Julia B.',  text: 'Modellage perfekt ausgeführt, sehr sauber gearbeitet. Die Atmosphäre ist entspannend und das Team professionell.',        rating: 5 },
  { id: 't4', name: 'Marie H.',  text: 'Nail Art von Kristina ist unglaublich — genau nach meinen Wünschen, schnell und präzise. Sehr empfehlenswert!',           rating: 5 },
];

export const GALLERY_IMAGES: GalleryImageItem[] = [
  { src: '/gallery/gallery-1-manikura.webp', alt: 'Gel-Maniküre — perfekte Nägel'      },
  { src: '/gallery/gallery-2-art.webp',      alt: 'Nail Art Design'                     },
  { src: '/gallery/gallery-3-pediura.webp',  alt: 'Klassische Pediküre'                 },
  { src: '/gallery/gallery-4-result.webp',   alt: 'Ergebnis — makellose Nägel'          },
  { src: '/gallery/gallery-5-studio.webp',   alt: 'Lumière Nails Berlin — Innenraum'    },
];

export const BUSINESS_HOURS: HoursRow[] = [
  { day: 'Montag – Freitag', time: '09:00 – 18:00' },
  { day: 'Samstag',          time: '09:00 – 15:00' },
  { day: 'Sonntag',          time: 'Geschlossen'   },
];

export const CONTACT = {
  city:        'Berlin',
  address:     'Unter den Linden 1\n10117 Berlin',
  phone:       '+49 30 901 820 60',
  phoneHref:   'tel:+4930901820600',
  email:       'info@lumiere-nails.de',
  emailHref:   'mailto:info@lumiere-nails.de',
  mapSrc:      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.7!2d13.3888!3d52.5163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMwJzU4LjciTiAxM8KwMjMnMjAuMCJF!5e0!3m2!1sde!2sde!4v1234567890',
};

export const ABOUT = {
  imageAlt: 'Innenraum des Lumière Nails Studios in Berlin',
  badge:    'Über uns',
  title:    'Schönheit beginnt\nmit Pflege',
  paragraphs: [
    'Lumière Nails entstand aus der Liebe zur Schönheit und zum Detail. Unsere Nageldesignerinnen bringen das Beste der modernen Nagelpflege nach Berlin.',
    'Jeder Termin ist für uns Kunst — wir widmen uns jeder Kundin individuell, denn wir glauben, dass jede Frau es verdient, sich besonders zu fühlen.',
    'Besuchen Sie uns und gehen Sie mit perfekten Nägeln und einem Lächeln nach Hause.',
  ],
  highlightText: 'jede Frau es verdient, sich besonders zu fühlen',
};

// Time slot generation helpers
export const BUSINESS_START = '09:00';
export const BUSINESS_END   = '18:00';
export const SLOT_INTERVAL  = 30; // minutes

// Alias for ContactSection
export const HOURS: HoursRow[] = BUSINESS_HOURS;

// Display data used in sections
export const SERVICES: Service[] = [
  { name: 'Klassische Maniküre', description: 'Pflege und Formgebung der natürlichen Nägel mit Nagellack nach Wahl',        price: '€18' },
  { name: 'Gel-Maniküre',        description: 'Langanhaltende Gelnägel – bis zu 3–4 Wochen perfekter Halt',                  price: '€35' },
  { name: 'Gel + Design',        description: 'Gel-Maniküre mit individuellem Nail-Art-Design Ihrer Wahl',                   price: '€45' },
  { name: 'Pediküre',            description: 'Professionelle Fußpflege – weiche Haut, gepflegte Nägel',                    price: '€25' },
  { name: 'Modellage',           description: 'Aufbau und Verlängerung der Nägel mit Gel für perfekte Form',                 price: '€55' },
  { name: 'Nail Art',            description: 'Kreative Designs, Glitter oder Stempel – zu jedem Service buchbar',          price: '€10' },
];

export const TEAM: TeamMember[] = [
  { name: 'Kristina Malá',     role: 'Gründerin & Nageldesignerin', experience: '5 Jahre Erfahrung', photo: '/team/team-kristina.webp' },
  { name: 'Monika Horváthová', role: 'Nageldesignerin',             experience: '3 Jahre Erfahrung', photo: '/team/team-monika.webp'   },
];

export const STATS: Stat[] = [
  { number: '7+',   label: 'Jahre Erfahrung'      },
  { number: '12K+', label: 'Zufriedene Kundinnen' },
  { number: '2',    label: 'Nageldesignerinnen'   },
  { number: '4.9',  label: 'Google Bewertung'     },
];

export const TESTIMONIALS: Testimonial[] = [
  { stars: 5, text: '"Absolut traumhafte Gel-Nägel! Das Ergebnis hält jetzt schon 4 Wochen perfekt. Ich komme definitiv wieder."',           author: 'Lena F.',   date: 'Google Rezension · Mai 2026'  },
  { stars: 5, text: '"Die Pediküre war ein Traum — meine Füße fühlen sich wie neu an. Das Team ist super freundlich. Sehr empfehlenswert!"', author: 'Sophie W.', date: 'Google Rezension · Mai 2026'  },
  { stars: 5, text: '"Nail Art von Kristina ist unglaublich — genau nach meinen Wünschen, schnell und präzise. Immer wieder gerne!"',        author: 'Marie H.',  date: 'Google Rezension · Juni 2026' },
];

export const TECHNICIANS: string[] = STATIC_MASTERS.map(m => m.name);
// backward-compat alias (not currently imported anywhere)
export const BARBERS = TECHNICIANS;

export const SERVICE_OPTIONS: string[] = SERVICES.map(s => `${s.name} — ${s.price}`);

export const WHY_US_ITEMS: WhyUsItem[] = [
  { icon: 'scissors', key: 'precise',  title: 'Präzise Arbeit',           description: 'Jeder Nagel wird mit voller Aufmerksamkeit geformt — das Ergebnis muss perfekt sein.'  },
  { icon: 'location', key: 'location', title: 'Im Herzen Berlins',        description: 'Sie finden uns Unter den Linden, direkt im Zentrum der Stadt.'                          },
  { icon: 'trend',    key: 'trends',   title: 'Wir folgen den Trends',    description: 'Neueste Nail-Art-Techniken und Klassiker von professionellen Designerinnen.'             },
  { icon: 'star',     key: 'pros',     title: 'Wir sind Profis',          description: 'Jede Designerin hat mindestens 3 Jahre Erfahrung in der Nagelpflege.'                   },
  { icon: 'click',    key: 'booking',  title: 'Buchung in 3 Klicks',      description: 'WhatsApp oder Formular — Ihren Termin in wenigen Sekunden sichern.'                     },
  { icon: 'medal',    key: 'google',   title: '4,9 auf Google',           description: 'Hunderte zufriedene Kundinnen. Lesen Sie unsere Bewertungen.'                           },
];
