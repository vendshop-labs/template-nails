import type { ServiceItem, MasterItem, StaticTestimonial, GalleryImageItem, HoursRow, Service, TeamMember, Testimonial, Stat, WhyUsItem } from './types';

export const STORE_NAME_FALLBACK = 'Lumière Nails';
/** @deprecated use STORE_NAME_FALLBACK — runtime name comes from DB */
export const STORE_NAME = STORE_NAME_FALLBACK;
export const STORE_TAGLINE  = 'Prémiové nechtové štúdio v Trenčíne.';
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

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '421900123456';
export const WHATSAPP_LINKS = {
  booking:  `https://wa.me/${WHATSAPP_NUMBER}?text=Dobr%C3%BD%20de%C5%88%2C%20chcel%20by%20som%20si%20rezervova%C5%A5%20term%C3%ADn.`,
  location: `https://wa.me/${WHATSAPP_NUMBER}?text=Dobr%C3%BD%20de%C5%88%2C%20kde%20presne%20sa%20nach%C3%A1dzate%3F`,
  general:  `https://wa.me/${WHATSAPP_NUMBER}?text=Dobr%C3%BD%20de%C5%88%2C%20m%C3%A1m%20ot%C3%A1zku.`,
};

// Static services (used when DB not seeded yet or in static mode)
export const STATIC_SERVICES: ServiceItem[] = [
  { id: 's1', slug: 'klasicka-manikura',      nameKey: 'services.klasicka',     name: 'Klasická manikúra',   description: 'Starostlivosť o nechty a kutikuly, záverečný lak.',    price: 18, duration: 30, image: '/services/manikura.webp', category: 'Manicure' },
  { id: 's2', slug: 'gelova-manikura',        nameKey: 'services.gelova',       name: 'Gélová manikúra',     description: 'Dlhotrvajúci gél — elegantné a odolné nechty.',         price: 35, duration: 60, image: '/services/gel.webp',      category: 'Manicure' },
  { id: 's3', slug: 'gelova-manikura-dizajn', nameKey: 'services.gelovaDizajn', name: 'Gélová + nail art',   description: 'Gél s nail artom podľa tvojho výberu.',                price: 45, duration: 75, image: '/services/gelart.webp',   category: 'Manicure' },
  { id: 's4', slug: 'pediura-klasicka',       nameKey: 'services.pediura',      name: 'Pedikúra klasická',   description: 'Kompletná starostlivosť o nohy a nechty.',             price: 25, duration: 45, image: '/services/pediura.webp',  category: 'Pedicure' },
];

// Static masters (used in static mode)
export const STATIC_MASTERS: MasterItem[] = [
  { id: 'm1', name: 'Kristína', role: 'Nail technička', bio: 'Skúsená technička s 5 rokmi praxe. Špecialistka na gélové nechty a nail art.',       photo: '/team/team-kristina.webp' },
  { id: 'm2', name: 'Monika',   role: 'Nail technička', bio: 'Expertka na manikúru a pedikúru. Absolventka kurzu japonskej manikúry v Bratislave.', photo: '/team/team-monika.webp'   },
];

export const STATIC_TESTIMONIALS: StaticTestimonial[] = [
  { id: 't1', name: 'Jana H.',   text: 'Najlepšia manikúra v Trenčíne. Kristína vie presne čo chcete ešte predtým, ako to poviete. Vždy odchádzam spokojná.',  rating: 5 },
  { id: 't2', name: 'Marta P.',  text: 'Chodím sem každé tri týždne na gél. Výsledok je vždy perfektný a trvá dlho. Skvelá atmosféra.',                          rating: 5 },
  { id: 't3', name: 'Lucia D.',  text: 'Nail art od Moniky je neuveriteľný. Presne podľa môjho zadania, rýchlo a profesionálne. Rozhodne odporúčam!',            rating: 5 },
  { id: 't4', name: 'Simona V.', text: 'Kvalita za férovú cenu. Štúdio vyzerá nádherné a technicky sú na výbornej úrovni.',                                      rating: 5 },
];

export const GALLERY_IMAGES: GalleryImageItem[] = [
  { src: '/gallery/gallery-1-manikura.webp', alt: 'Gélová manikúra — dokonalé nechty' },
  { src: '/gallery/gallery-2-art.webp',      alt: 'Nail art dizajn'                   },
  { src: '/gallery/gallery-3-pediura.webp',  alt: 'Pedikúra klasická'                 },
  { src: '/gallery/gallery-4-result.webp',   alt: 'Výsledok — dokonalé nechty'        },
  { src: '/gallery/gallery-5-studio.webp',   alt: 'Lumière Nails štúdio interiér'     },
];

export const BUSINESS_HOURS: HoursRow[] = [
  { day: 'Pondelok – Piatok', time: '09:00 – 18:00' },
  { day: 'Sobota',            time: '09:00 – 15:00' },
  { day: 'Nedeľa',            time: 'Zatvorené'     },
];

export const CONTACT = {
  city:        'Trenčín',
  address:     'Mierové námestie 1\n911 01 Trenčín',
  phone:       '+421 900 000 000',
  phoneHref:   'tel:+421900000000',
  email:       'info@lumiere-nails.sk',
  emailHref:   'mailto:info@lumiere-nails.sk',
  instagram:   'https://instagram.com/lumiere.nails',
  facebook:    'https://facebook.com/lumierenails',
  mapSrc:      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2628.4!2d18.044!3d48.894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUzJzM4LjAiTiAxOMKwMDInMzguMCJF!5e0!3m2!1sen!2ssk!4v1234567890',
};

export const ABOUT = {
  imageAlt: 'Interiér Lumière Nails štúdia v Trenčíne',
  badge:    'O nás',
  title:    'Krása začína\nstarostlivosťou',
  paragraphs: [
    'Lumière Nails vzniklo z lásky ku kráse a detailu. Naše techniky prinášajú do Trenčína to najlepšie z modernej nechtovej starostlivosti.',
    'Každý termín je pre nás umenie — venujeme sa každej klientke individuálne, pretože veríme, že každá žena si zaslúži cítiť sa výnimočne.',
    'Navštívte nás a odíďte s dokonalými nechtami a úsmevom.',
  ],
  highlightText: 'každá žena si zaslúži cítiť sa výnimočne',
};

// Time slot generation helpers
export const BUSINESS_START = '09:00';
export const BUSINESS_END   = '18:00';
export const SLOT_INTERVAL  = 30; // minutes

// Alias for ContactSection
export const HOURS: HoursRow[] = BUSINESS_HOURS;

// Display data used in sections
export const SERVICES: Service[] = [
  { name: 'Klasická manikúra',   description: 'Starostlivosť o nechty, kutikuly a záverečný lak',         price: '€18' },
  { name: 'Gélová manikúra',     description: 'Dlhotrvajúci gél — elegantný a odolný',                    price: '€35' },
  { name: 'Gélová + nail art',   description: 'Gél s nail artom podľa vlastného výberu',                  price: '€45' },
  { name: 'Pedikúra klasická',   description: 'Kompletná starostlivosť o nohy a nechty',                  price: '€25' },
  { name: 'Nechtová modeláž',    description: 'Akrylová modeláž — tvar a dĺžka podľa želania',            price: '€55' },
  { name: 'Nail art (2 nechty)', description: 'Dekoratívny nail art — kvety, geometria, francúzska',      price: '€10' },
];

export const TEAM: TeamMember[] = [
  { name: 'Kristína Malá',     role: 'Zakladateľka & Nail technička', experience: '5 rokov skúseností', photo: '/team/team-kristina.webp' },
  { name: 'Monika Horváthová', role: 'Nail technička',                experience: '3 roky skúseností',  photo: '/team/team-monika.webp'   },
];

export const STATS: Stat[] = [
  { number: '7+',   label: 'Rokov skúseností'    },
  { number: '12K+', label: 'Spokojných klientiek' },
  { number: '2',    label: 'Nail techničky'       },
  { number: '4.9',  label: 'Google hodnotenie'    },
];

export const TESTIMONIALS: Testimonial[] = [
  { stars: 5, text: '"Najlepšia manikúra v Trenčíne. Kristína vie presne čo chcem, aj keď to neviem vysvetliť. Vždy odchádzam spokojná."',    author: 'Jana H.',  date: 'Google recenzia · marec 2026'   },
  { stars: 5, text: '"Chodím sem každé tri týždne na gélovú manikúru. Výsledok je vždy perfektný a trvá dlho. Skvelá práca!"',                author: 'Marta K.', date: 'Google recenzia · február 2026' },
  { stars: 5, text: '"Nail art od Moniky je neuveriteľný. Presne podľa môjho zadania a ešte krajší ako som si predstavovala. Odporúčam!"',   author: 'Lucia V.', date: 'Google recenzia · január 2026'  },
];

export const TECHNICIANS: string[] = STATIC_MASTERS.map(m => m.name);
// backward-compat alias (not currently imported anywhere)
export const BARBERS = TECHNICIANS;

export const SERVICE_OPTIONS: string[] = SERVICES.map(s => `${s.name} — ${s.price}`);

export const WHY_US_ITEMS: WhyUsItem[] = [
  { icon: 'scissors', key: 'precise',  title: 'Precízna práca',        description: 'Každý nechtík tvarujeme s plnou pozornosťou — výsledok musí byť dokonalý.'  },
  { icon: 'location', key: 'location', title: 'Sme v centre Trenčína', description: 'Nájdeš nás na Mierovom námestí, priamo v srdci mesta.'                      },
  { icon: 'trend',    key: 'trends',   title: 'Sledujeme trendy',      description: 'Najnovšie techniky nail artu aj klasika v podaní profesionálnych techničiek.' },
  { icon: 'star',     key: 'pros',     title: 'Sme profesionálky',     description: 'Každá technička má minimálne 3 roky skúseností s nechtami.'                  },
  { icon: 'click',    key: 'booking',  title: 'Rezervácia na 3 kliky', description: 'WhatsApp alebo formulár — termín za pár sekúnd.'                             },
  { icon: 'medal',    key: 'google',   title: '4.9 na Google',         description: 'Stovky spokojných klientiek. Prečítaj si recenzie.'                          },
];
