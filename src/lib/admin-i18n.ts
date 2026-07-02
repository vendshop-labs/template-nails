export type AdminLocale = 'sk' | 'en' | 'uk' | 'cs' | 'de';

export interface AdminTranslations {
  nav: {
    dashboard: string;
    hero: string;
    services: string;
    reservations: string;
    masters: string;
    gallery: string;
    reviews: string;
    products: string;
    orders: string;
    promotions: string;
    menu: string;
    tables: string;
    deliveryZones: string;
    courses: string;
    history: string;
    theme: string;
    ai: string;
    settings: string;
    legal: string;
    logout: string;
  };
  common: {
    save: string;
    saving: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    hide: string;
    show: string;
    upload: string;
    uploading: string;
    loading: string;
    noData: string;
    confirm: string;
  };
  theme: {
    title: string;
    presetsTitle: string;
    presetsSubtitle: string;
    colors: string;
    layout: string;
    heroType: string;
    cardStyle: string;
    navigation: string;
    borderRadius: string;
    saveTheme: string;
    saving: string;
    resetColors: string;
    preview: string;
    colorLabels: Record<string, string>;
    colorDescriptions: Record<string, string>;
  };
  services: {
    title: string;
    addService: string;
    editService: string;
    newService: string;
    nameLabel: string;
    priceLabel: string;
    durationLabel: string;
    categoryLabel: string;
    descriptionLabel: string;
    noServices: string;
    confirmDelete: string;
    names: Record<string, string>;
  };
  reservations: {
    title: string;
    all: string;
    pending: string;
    confirmed: string;
    cancelled: string;
    completed: string;
    noShow: string;
    confirm: string;
    complete: string;
    cancel: string;
    whatsapp: string;
    clearDate: string;
    noReservations: string;
    loading: string;
    statPending: string;
    statConfirmed: string;
    statCompleted: string;
    statCancelled: string;
  };
  settings: {
    title: string;
    tabs: {
      store: string;
      gallery: string;
      masters: string;
      notifications: string;
      security: string;
      schedule: string;
    };
    savingBtn: string;
    saveBtn: string;
    savedToast: string;
    /* Logo */
    logoLabel: string;
    logoSizeHint: string;
    changeLogo: string;
    uploadLogo: string;
    uploading: string;
    removeLogo: string;
    removeLogoConfirm: string;
    /* Store tab fields */
    storeNameLabel: string;
    descriptionLabel: string;
    aboutPhotoLabel: string;
    aboutPhotoChange: string;
    aboutPhotoUpload: string;
    aboutPhotoSizeHint: string;
    aboutPhotoFormatHint: string;
    phoneLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    addressLabel: string;
    cityLabel: string;
    latLabel: string;
    lngLabel: string;
    googleRatingLabel: string;
    /* Working hours */
    workingHoursLabel: string;
    closedLabel: string;
    days: {
      mon: string; tue: string; wed: string; thu: string;
      fri: string; sat: string; sun: string;
    };
    /* Notifications tab */
    notifEmailLabel: string;
    notifReviewsLabel: string;
    whatsappNumberLabel: string;
    whatsappNumberHint: string;
    /* Security tab */
    changePasswordTitle: string;
    currentPasswordLabel: string;
    newPasswordLabel: string;
    confirmPasswordLabel: string;
    changePasswordBtn: string;
    activeSessionsLabel: string;
    terminateSessionsBtn: string;
    twoFactorLabel: string;
    comingSoon: string;
    passwordToggleAriaLabel: string;
  };
  reviews: {
    title: string;
    approved: string;
    pending: string;
    rejected: string;
    approve: string;
    reject: string;
    reply: string;
  };
  courses: {
    title: string;
    addCourse: string;
    editCourse: string;
    newCourse: string;
    nameLabel: string;
    priceLabel: string;
    videoUrlLabel: string;
    previewLabel: string;
    descriptionLabel: string;
    lessonTextLabel: string;
    noCourses: string;
    confirmDelete: string;
  };
  ai: {
    title: string;
    placeholder: string;
    send: string;
  };
  dashboard: {
    title: string;
    todayAppointments: string;
    totalClients: string;
    pendingReviews: string;
  };
  gallery: {
    title: string;
    addPhoto: string;
    uploading: string;
    hint: string;
    loading: string;
    empty: string;
    deleteConfirm: string;
    replace: string;
    altPlaceholder: string;
  };
  masters: {
    title: string;
    add: string;
    noMasters: string;
    deleteConfirm: string;
    edit: string;
    role: string;
    bio: string;
  };
  hero: {
    title: string;
    uploadPhoto: string;
    hint: string;
    uploading: string;
  };
  legal: {
    title: string;
    impressum: string;
    datenschutz: string;
    ownerLabel: string;
    addressLabel: string;
    vatLabel: string;
    emailLabel: string;
    phoneLabel: string;
    save: string;
  };
  tables: {
    title: string;
    add: string;
    noTables: string;
    nameLabel: string;
    capacityLabel: string;
    deleteConfirm: string;
  };
  appointments: {
    title: string;
    noAppointments: string;
    loading: string;
    clientLabel: string;
    serviceLabel: string;
    masterLabel: string;
    dateLabel: string;
    timeLabel: string;
    statusLabel: string;
    notesLabel: string;
  };
}

// ─── Slovak (primary) ──────────────────────────────────────────────────────
const SK: AdminTranslations = {
  nav: {
    dashboard:    'Prehľad',
    hero:         'Hero sekcia',
    services:     'Služby',
    reservations: 'Rezervácie',
    masters:      'Majstri',
    gallery:      'Galéria',
    reviews:      'Recenzie',
    products:     'Produkty',
    orders:       'Objednávky',
    promotions:   'Akcie',
    menu:         'Jedálny lístok',
    tables:       'Stoly',
    deliveryZones:'Doručovacie zóny',
    courses:      'Kurzy',
    history:      'História',
    theme:        'Téma',
    ai:           'AI správa',
    settings:     'Nastavenia',
    legal:        'Legal (DE)',
    logout:       'Odhlásiť',
  },
  common: {
    save:      'Uložiť zmeny',
    saving:    'Ukladám...',
    cancel:    'Zrušiť',
    delete:    'Zmazať',
    edit:      'Upraviť',
    add:       'Pridať',
    hide:      'Skryť',
    show:      'Zobraziť',
    upload:    'Nahrať',
    uploading: 'Nahrávam...',
    loading:   'Načítavam...',
    noData:    'Žiadne dáta',
    confirm:   'Potvrdiť',
  },
  theme: {
    title:           'Téma',
    presetsTitle:    'Hotové témy',
    presetsSubtitle: 'Vyberte tému ako základ, potom upravte farby nižšie',
    colors:          'Farby',
    layout:          'Rozvrhnutie',
    heroType:        'Typ hero',
    cardStyle:       'Štýl kariet',
    navigation:      'Navigácia',
    borderRadius:    'Zaoblenie rohov',
    saveTheme:       'Uložiť tému',
    saving:          'Ukladám...',
    resetColors:     'Resetovať farby',
    preview:         'Náhľad',
    colorLabels: {
      bg:           'Pozadie',
      primary:      'Primárna',
      primaryDark:  'Primárna tmavá',
      primaryLight: 'Primárna svetlá',
      text:         'Text',
      textSecondary:'Text sekundárny',
      textMuted:    'Text tlmený',
      border:       'Orámovanie',
      bgSubtle:     'Pozadie jemné',
      success:      'Úspech',
      error:        'Chyba',
      contrast:     'Kontrastný text',
      overlay:      'Podklad prekrytia',
      overlayAlpha: 'Prekrytie (rgba)',
      headerBg:     'Hlavička po posune',
    },
    colorDescriptions: {
      bg:           'Farba pozadia stránky',
      primary:      'Tlačidlá, odkazy, akcenty',
      primaryDark:  'Hover / aktívny stav',
      primaryLight: 'Svetlé tint pozadie',
      text:         'Hlavná farba textu',
      textSecondary:'Stlmené štítky',
      textMuted:    'Ešte viac stlmené',
      border:       'Oddeľovače, orámovanie kariet',
      bgSubtle:     'Hover kariet, sekcie',
      success:      'Pozitívne stavy',
      error:        'Negatívne stavy',
      contrast:     'Farba textu na farebných tlačidlách',
      overlay:      'Základná farba prekrytí (hex)',
      overlayAlpha: 'Polopriehľadné prekrytie (rgba)',
      headerBg:     'Pozadie hlavičky po posunutí (rgba)',
    },
  },
  services: {
    title:           'Služby',
    addService:      '+ Pridať službu',
    editService:     'Upraviť službu',
    newService:      'Nová služba',
    nameLabel:       'Názov',
    priceLabel:      'Cena (€)',
    durationLabel:   'Trvanie (min)',
    categoryLabel:   'Kategória',
    descriptionLabel:'Popis',
    noServices:      'Žiadne služby. Pridajte prvú.',
    confirmDelete:   'Vymazať túto službu?',
    names: {
      'services.beard':    'Strihanie brady',
      'services.haircut':  'Strihanie vlasov',
      'services.hairBeard':'Vlasy + Brada',
      'services.styling':  'Styling',
      'services.shave':    'Holenie',
      'services.kids':     'Detský strih',
    },
  },
  reservations: {
    title:          'Rezervácie',
    all:            'Všetky',
    pending:        'Čakajúce',
    confirmed:      'Potvrdené',
    cancelled:      'Zrušené',
    completed:      'Dokončené',
    noShow:         'Neprišiel',
    confirm:        'Potvrdiť',
    complete:       'Dokončiť',
    cancel:         'Zrušiť',
    whatsapp:       'WhatsApp',
    clearDate:      '✕ Všetky dátumy',
    noReservations: 'Žiadne rezervácie',
    loading:        'Načítavam rezervácie...',
    statPending:    'Čakajúce',
    statConfirmed:  'Potvrdené',
    statCompleted:  'Dokončené',
    statCancelled:  'Zrušené',
  },
  settings: {
    title:              'Nastavenia',
    tabs: {
      store:         'Obchod',
      gallery:       'Galéria',
      masters:       'Majstri',
      notifications: 'Notifikácie',
      security:      'Bezpečnosť',
      schedule:      'Rozvrh',
    },
    savingBtn:          'Ukladám...',
    saveBtn:            'Uložiť zmeny',
    savedToast:         'Nastavenia uložené',
    logoLabel:          'Logo salóna',
    logoSizeHint:       'WebP / PNG / JPG · výstup 400×120 · max 5 MB',
    changeLogo:         'Zmeniť logo',
    uploadLogo:         'Nahrať logo',
    uploading:          'Nahrávam...',
    removeLogo:         'Odstrániť logo',
    removeLogoConfirm:  'Naozaj chcete odstrániť logo? Zobrazí sa textový logotyp.',
    storeNameLabel:     'Názov salóna',
    descriptionLabel:   'Popis',
    aboutPhotoLabel:    'Foto sekcie "O nás"',
    aboutPhotoChange:   '📷 Zmeniť foto',
    aboutPhotoUpload:   '📷 Nahrať foto pre sekciu O nás',
    aboutPhotoSizeHint: 'Odporúčaný rozmer: 800×600px',
    aboutPhotoFormatHint: 'Odporúčaný formát: horizontálny, min. 600×800 px',
    phoneLabel:         'Telefón',
    emailLabel:         'Email',
    whatsappLabel:      'WhatsApp',
    addressLabel:       'Adresa salóna',
    cityLabel:          'Mesto',
    latLabel:           'Zemepisná šírka (lat)',
    lngLabel:           'Zemepisná dĺžka (lng)',
    googleRatingLabel:  'Google hodnotenie',
    workingHoursLabel:  'Pracovné hodiny',
    closedLabel:        'Zatvorené',
    days: {
      mon: 'Pondelok', tue: 'Utorok', wed: 'Streda', thu: 'Štvrtok',
      fri: 'Piatok',  sat: 'Sobota', sun: 'Nedeľa',
    },
    notifEmailLabel:     'Email pre notifikácie',
    notifReviewsLabel:   'Notifikácie o nových recenziách',
    whatsappNumberLabel: 'WhatsApp číslo',
    whatsappNumberHint:  'Číslo sa zobrazí ako tlačidlo WhatsApp na webe pre klientov.',
    changePasswordTitle:    'Zmena hesla',
    currentPasswordLabel:   'Aktuálne heslo',
    newPasswordLabel:       'Nové heslo',
    confirmPasswordLabel:   'Potvrďte heslo',
    changePasswordBtn:      'Zmeniť heslo',
    activeSessionsLabel:    'Aktívnych relácií:',
    terminateSessionsBtn:   'Ukončiť všetky relácie',
    twoFactorLabel:         'Dvojfaktorová autentifikácia',
    comingSoon:             'Čoskoro',
    passwordToggleAriaLabel:'Zobraziť alebo skryť',
  },
  reviews: {
    title:    'Recenzie',
    approved: 'Schválené',
    pending:  'Čakajúce',
    rejected: 'Zamietnuté',
    approve:  'Schváliť',
    reject:   'Zamietnuť',
    reply:    'Odpovedať',
  },
  courses: {
    title:           'Kurzy',
    addCourse:       '+ Pridať kurz',
    editCourse:      'Upraviť kurz',
    newCourse:       'Nový kurz',
    nameLabel:       'Názov',
    priceLabel:      'Cena (€)',
    videoUrlLabel:   'Video URL (embed)',
    previewLabel:    'Náhľadový obrázok (URL)',
    descriptionLabel:'Krátky popis',
    lessonTextLabel: 'Obsah lekcie',
    noCourses:       'Žiadne kurzy. Pridajte prvý.',
    confirmDelete:   'Vymazať tento kurz?',
  },
  ai: {
    title:       'AI správa',
    placeholder: 'Napíšte správu...',
    send:        'Odoslať',
  },
  dashboard: {
    title:             'Prehľad',
    todayAppointments: 'Dnešné rezervácie',
    totalClients:      'Klienti celkom',
    pendingReviews:    'Čakajúce recenzie',
  },
  gallery: {
    title:          'Galéria',
    addPhoto:       '↑ Pridať foto',
    uploading:      'Nahrávam...',
    hint:           'Fotky sa automaticky optimalizujú (WebP, max. 1200×800). Formáty: JPEG, PNG, WebP, GIF, AVIF. Max. 10 MB.',
    loading:        'Načítavam...',
    empty:          'Galéria je prázdna — nahrajte prvé foto',
    deleteConfirm:  'Vymazať toto foto?',
    replace:        '↑ Nahradiť',
    altPlaceholder: 'Popis fotky...',
  },
  masters: {
    title:         'Majstri',
    add:           '+ Pridať majstra',
    noMasters:     'Žiadni majstri. Pridajte prvého.',
    deleteConfirm: 'Vymazať majstra "{name}"?',
    edit:          'Upraviť',
    role:          'Rola',
    bio:           'Bio',
  },
  hero: {
    title:       'Hero sekcia',
    uploadPhoto: 'Nahrať foto',
    hint:        'Odporúčaný rozmer: 1920×1080px. Max. 10 MB.',
    uploading:   'Nahrávam...',
  },
  legal: {
    title:        'Legal (DE)',
    impressum:    'Impressum',
    datenschutz:  'Datenschutz',
    ownerLabel:   'Meno majiteľa',
    addressLabel: 'Adresa',
    vatLabel:     'IČ DPH (USt-IdNr.)',
    emailLabel:   'E-mail',
    phoneLabel:   'Telefón',
    save:         'Uložiť',
  },
  tables: {
    title:         'Stoly',
    add:           '+ Pridať stôl',
    noTables:      'Žiadne stoly. Pridajte prvý.',
    nameLabel:     'Názov stola',
    capacityLabel: 'Kapacita (osôb)',
    deleteConfirm: 'Vymazať stôl?',
  },
  appointments: {
    title:          'Termíny',
    noAppointments: 'Žiadne termíny',
    loading:        'Načítavam termíny...',
    clientLabel:    'Klient',
    serviceLabel:   'Služba',
    masterLabel:    'Majster',
    dateLabel:      'Dátum',
    timeLabel:      'Čas',
    statusLabel:    'Stav',
    notesLabel:     'Poznámka',
  },
};

// ─── English ───────────────────────────────────────────────────────────────
const EN: AdminTranslations = {
  nav: {
    dashboard:    'Dashboard',
    hero:         'Hero Section',
    services:     'Services',
    reservations: 'Reservations',
    masters:      'Masters',
    gallery:      'Gallery',
    reviews:      'Reviews',
    products:     'Products',
    orders:       'Orders',
    promotions:   'Promotions',
    menu:         'Menu',
    tables:       'Tables',
    deliveryZones:'Delivery Zones',
    courses:      'Courses',
    history:      'History',
    theme:        'Theme',
    ai:           'AI Manager',
    settings:     'Settings',
    legal:        'Legal (DE)',
    logout:       'Log out',
  },
  common: {
    save:      'Save changes',
    saving:    'Saving...',
    cancel:    'Cancel',
    delete:    'Delete',
    edit:      'Edit',
    add:       'Add',
    hide:      'Hide',
    show:      'Show',
    upload:    'Upload',
    uploading: 'Uploading...',
    loading:   'Loading...',
    noData:    'No data',
    confirm:   'Confirm',
  },
  theme: {
    title:           'Theme',
    presetsTitle:    'Ready-made themes',
    presetsSubtitle: 'Choose a theme as a base, then adjust colors below',
    colors:          'Colors',
    layout:          'Layout',
    heroType:        'Hero Type',
    cardStyle:       'Card Style',
    navigation:      'Navigation',
    borderRadius:    'Border Radius',
    saveTheme:       'Save Theme',
    saving:          'Saving...',
    resetColors:     'Reset colors',
    preview:         'Preview',
    colorLabels: {
      bg:           'Background',
      primary:      'Primary',
      primaryDark:  'Primary Dark',
      primaryLight: 'Primary Light',
      text:         'Text',
      textSecondary:'Text Secondary',
      textMuted:    'Text Muted',
      border:       'Border',
      bgSubtle:     'Background Subtle',
      success:      'Success',
      error:        'Error',
      contrast:     'Contrast Text',
      overlay:      'Overlay Base',
      overlayAlpha: 'Overlay w/ Alpha',
      headerBg:     'Header Scrolled',
    },
    colorDescriptions: {
      bg:           'Page background color',
      primary:      'Buttons, links, accents',
      primaryDark:  'Hover / active state',
      primaryLight: 'Light tint backgrounds',
      text:         'Main text color',
      textSecondary:'Muted labels',
      textMuted:    'Even more subtle',
      border:       'Dividers, card borders',
      bgSubtle:     'Card hover, sections',
      success:      'Positive states',
      error:        'Negative states',
      contrast:     'Text color on colored buttons',
      overlay:      'Base overlay color (hex)',
      overlayAlpha: 'Semi-transparent overlay (rgba)',
      headerBg:     'Header background after scroll (rgba)',
    },
  },
  services: {
    title:           'Services',
    addService:      '+ Add Service',
    editService:     'Edit Service',
    newService:      'New Service',
    nameLabel:       'Name',
    priceLabel:      'Price (€)',
    durationLabel:   'Duration (min)',
    categoryLabel:   'Category',
    descriptionLabel:'Description',
    noServices:      'No services. Add the first one.',
    confirmDelete:   'Delete this service?',
    names: {
      'services.beard':    'Beard Trim',
      'services.haircut':  'Haircut',
      'services.hairBeard':'Hair + Beard',
      'services.styling':  'Styling',
      'services.shave':    'Shave',
      'services.kids':     'Kids Haircut',
    },
  },
  reservations: {
    title:          'Reservations',
    all:            'All',
    pending:        'Pending',
    confirmed:      'Confirmed',
    cancelled:      'Cancelled',
    completed:      'Completed',
    noShow:         'No Show',
    confirm:        'Confirm',
    complete:       'Complete',
    cancel:         'Cancel',
    whatsapp:       'WhatsApp',
    clearDate:      '✕ All dates',
    noReservations: 'No reservations',
    loading:        'Loading reservations...',
    statPending:    'Pending',
    statConfirmed:  'Confirmed',
    statCompleted:  'Completed',
    statCancelled:  'Cancelled',
  },
  settings: {
    title:              'Settings',
    tabs: {
      store:         'Store',
      gallery:       'Gallery',
      masters:       'Masters',
      notifications: 'Notifications',
      security:      'Security',
      schedule:      'Schedule',
    },
    savingBtn:          'Saving...',
    saveBtn:            'Save changes',
    savedToast:         'Settings saved',
    logoLabel:          'Salon logo',
    logoSizeHint:       'WebP / PNG / JPG · output 400×120 · max 5 MB',
    changeLogo:         'Change logo',
    uploadLogo:         'Upload logo',
    uploading:          'Uploading...',
    removeLogo:         'Remove logo',
    removeLogoConfirm:  'Remove the logo? The text logotype will be shown instead.',
    storeNameLabel:     'Salon name',
    descriptionLabel:   'Description',
    aboutPhotoLabel:    'About section photo',
    aboutPhotoChange:   '📷 Change photo',
    aboutPhotoUpload:   '📷 Upload photo for About section',
    aboutPhotoSizeHint: 'Recommended size: 800×600px',
    aboutPhotoFormatHint: 'Recommended format: horizontal, min. 600×800 px',
    phoneLabel:         'Phone',
    emailLabel:         'Email',
    whatsappLabel:      'WhatsApp',
    addressLabel:       'Salon address',
    cityLabel:          'City',
    latLabel:           'Latitude (lat)',
    lngLabel:           'Longitude (lng)',
    googleRatingLabel:  'Google rating',
    workingHoursLabel:  'Working hours',
    closedLabel:        'Closed',
    days: {
      mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
      fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
    },
    notifEmailLabel:     'Notification email',
    notifReviewsLabel:   'Notifications for new reviews',
    whatsappNumberLabel: 'WhatsApp number',
    whatsappNumberHint:  'This number will appear as a WhatsApp button on the website for clients.',
    changePasswordTitle:    'Change password',
    currentPasswordLabel:   'Current password',
    newPasswordLabel:       'New password',
    confirmPasswordLabel:   'Confirm password',
    changePasswordBtn:      'Change password',
    activeSessionsLabel:    'Active sessions:',
    terminateSessionsBtn:   'Terminate all sessions',
    twoFactorLabel:         'Two-factor authentication',
    comingSoon:             'Coming soon',
    passwordToggleAriaLabel:'Show or hide',
  },
  reviews: {
    title:    'Reviews',
    approved: 'Approved',
    pending:  'Pending',
    rejected: 'Rejected',
    approve:  'Approve',
    reject:   'Reject',
    reply:    'Reply',
  },
  courses: {
    title:           'Courses',
    addCourse:       '+ Add Course',
    editCourse:      'Edit Course',
    newCourse:       'New Course',
    nameLabel:       'Name',
    priceLabel:      'Price (€)',
    videoUrlLabel:   'Video URL (embed)',
    previewLabel:    'Preview Image (URL)',
    descriptionLabel:'Short Description',
    lessonTextLabel: 'Lesson Content',
    noCourses:       'No courses yet. Add the first one.',
    confirmDelete:   'Delete this course?',
  },
  ai: {
    title:       'AI Manager',
    placeholder: 'Type a message...',
    send:        'Send',
  },
  dashboard: {
    title:             'Dashboard',
    todayAppointments: "Today's appointments",
    totalClients:      'Total clients',
    pendingReviews:    'Pending reviews',
  },
  gallery: {
    title:          'Gallery',
    addPhoto:       '↑ Add photo',
    uploading:      'Uploading...',
    hint:           'Photos are automatically optimised (WebP, max. 1200×800). Formats: JPEG, PNG, WebP, GIF, AVIF. Max. 10 MB.',
    loading:        'Loading...',
    empty:          'Gallery is empty — upload the first photo',
    deleteConfirm:  'Delete this photo?',
    replace:        '↑ Replace',
    altPlaceholder: 'Photo description...',
  },
  masters: {
    title:         'Masters',
    add:           '+ Add master',
    noMasters:     'No masters yet. Add the first one.',
    deleteConfirm: 'Delete master "{name}"?',
    edit:          'Edit',
    role:          'Role',
    bio:           'Bio',
  },
  hero: {
    title:       'Hero section',
    uploadPhoto: 'Upload photo',
    hint:        'Recommended size: 1920×1080px. Max. 10 MB.',
    uploading:   'Uploading...',
  },
  legal: {
    title:        'Legal (DE)',
    impressum:    'Impressum',
    datenschutz:  'Datenschutz',
    ownerLabel:   'Owner name',
    addressLabel: 'Address',
    vatLabel:     'VAT ID (USt-IdNr.)',
    emailLabel:   'Email',
    phoneLabel:   'Phone',
    save:         'Save',
  },
  tables: {
    title:         'Tables',
    add:           '+ Add table',
    noTables:      'No tables yet. Add the first one.',
    nameLabel:     'Table name',
    capacityLabel: 'Capacity (persons)',
    deleteConfirm: 'Delete this table?',
  },
  appointments: {
    title:          'Appointments',
    noAppointments: 'No appointments',
    loading:        'Loading appointments...',
    clientLabel:    'Client',
    serviceLabel:   'Service',
    masterLabel:    'Master',
    dateLabel:      'Date',
    timeLabel:      'Time',
    statusLabel:    'Status',
    notesLabel:     'Notes',
  },
};

// ─── Czech ─────────────────────────────────────────────────────────────────
const CS: AdminTranslations = {
  nav: {
    dashboard:    'Přehled',
    hero:         'Hero sekce',
    services:     'Služby',
    reservations: 'Rezervace',
    masters:      'Mistři',
    gallery:      'Galerie',
    reviews:      'Recenze',
    products:     'Produkty',
    orders:       'Objednávky',
    promotions:   'Akce',
    menu:         'Jídelní lístek',
    tables:       'Stoly',
    deliveryZones:'Doručovací zóny',
    courses:      'Kurzy',
    history:      'Historie',
    theme:        'Téma',
    ai:           'AI správa',
    settings:     'Nastavení',
    legal:        'Legal (DE)',
    logout:       'Odhlásit',
  },
  common: {
    save:      'Uložit změny',
    saving:    'Ukládám...',
    cancel:    'Zrušit',
    delete:    'Smazat',
    edit:      'Upravit',
    add:       'Přidat',
    hide:      'Skrýt',
    show:      'Zobrazit',
    upload:    'Nahrát',
    uploading: 'Nahrávám...',
    loading:   'Načítám...',
    noData:    'Žádná data',
    confirm:   'Potvrdit',
  },
  theme:        EN.theme,
  services:     EN.services,
  reservations: EN.reservations,
  settings: {
    title:              'Nastavení',
    tabs: {
      store:         'Obchod',
      gallery:       'Galerie',
      masters:       'Mistři',
      notifications: 'Oznámení',
      security:      'Zabezpečení',
      schedule:      'Rozvrh',
    },
    savingBtn:          'Ukládám...',
    saveBtn:            'Uložit změny',
    savedToast:         'Nastavení uložena',
    logoLabel:          'Logo salonu',
    logoSizeHint:       'WebP / PNG / JPG · výstup 400×120 · max 5 MB',
    changeLogo:         'Změnit logo',
    uploadLogo:         'Nahrát logo',
    uploading:          'Nahrávám...',
    removeLogo:         'Odstranit logo',
    removeLogoConfirm:  'Opravdu odstranit logo? Zobrazí se textový logotyp.',
    storeNameLabel:     'Název salonu',
    descriptionLabel:   'Popis',
    aboutPhotoLabel:    'Foto sekce „O nás"',
    aboutPhotoChange:   '📷 Změnit foto',
    aboutPhotoUpload:   '📷 Nahrát foto pro sekci O nás',
    aboutPhotoSizeHint: 'Doporučená velikost: 800×600px',
    aboutPhotoFormatHint: 'Doporučený formát: horizontální, min. 600×800 px',
    phoneLabel:         'Telefon',
    emailLabel:         'E-mail',
    whatsappLabel:      'WhatsApp',
    addressLabel:       'Adresa salonu',
    cityLabel:          'Město',
    latLabel:           'Zeměpisná šířka (lat)',
    lngLabel:           'Zeměpisná délka (lng)',
    googleRatingLabel:  'Google hodnocení',
    workingHoursLabel:  'Pracovní hodiny',
    closedLabel:        'Zavřeno',
    days: {
      mon: 'Pondělí', tue: 'Úterý', wed: 'Středa', thu: 'Čtvrtek',
      fri: 'Pátek', sat: 'Sobota', sun: 'Neděle',
    },
    notifEmailLabel:     'E-mail pro oznámení',
    notifReviewsLabel:   'Oznámení o nových recenzích',
    whatsappNumberLabel: 'WhatsApp číslo',
    whatsappNumberHint:  'Číslo se zobrazí jako tlačítko WhatsApp na webu pro klienty.',
    changePasswordTitle:    'Změna hesla',
    currentPasswordLabel:   'Aktuální heslo',
    newPasswordLabel:       'Nové heslo',
    confirmPasswordLabel:   'Potvrďte heslo',
    changePasswordBtn:      'Změnit heslo',
    activeSessionsLabel:    'Aktivních relací:',
    terminateSessionsBtn:   'Ukončit všechny relace',
    twoFactorLabel:         'Dvoufaktorová autentizace',
    comingSoon:             'Brzy',
    passwordToggleAriaLabel:'Zobrazit nebo skrýt',
  },
  reviews:      EN.reviews,
  courses:      EN.courses,
  ai:           EN.ai,
  dashboard:    EN.dashboard,
  gallery:      EN.gallery,
  masters:      EN.masters,
  hero:         EN.hero,
  legal:        EN.legal,
  tables:       EN.tables,
  appointments: EN.appointments,
};

// ─── German ────────────────────────────────────────────────────────────────
const DE: AdminTranslations = {
  nav: {
    dashboard:    'Übersicht',
    hero:         'Hero-Bereich',
    services:     'Leistungen',
    reservations: 'Reservierungen',
    masters:      'Mitarbeiter',
    gallery:      'Galerie',
    reviews:      'Bewertungen',
    products:     'Produkte',
    orders:       'Bestellungen',
    promotions:   'Aktionen',
    menu:         'Speisekarte',
    tables:       'Tische',
    deliveryZones:'Lieferzonen',
    courses:      'Kurse',
    history:      'Verlauf',
    theme:        'Design',
    ai:           'KI-Verwaltung',
    settings:     'Einstellungen',
    legal:        'Impressum/Legal',
    logout:       'Abmelden',
  },
  common: {
    save:      'Änderungen speichern',
    saving:    'Speichere...',
    cancel:    'Abbrechen',
    delete:    'Löschen',
    edit:      'Bearbeiten',
    add:       'Hinzufügen',
    hide:      'Ausblenden',
    show:      'Anzeigen',
    upload:    'Hochladen',
    uploading: 'Lade hoch...',
    loading:   'Lade...',
    noData:    'Keine Daten',
    confirm:   'Bestätigen',
  },
  theme: EN.theme,
  services: EN.services,
  reservations: {
    title:          'Reservierungen',
    all:            'Alle',
    pending:        'Ausstehend',
    confirmed:      'Bestätigt',
    cancelled:      'Storniert',
    completed:      'Abgeschlossen',
    noShow:         'Nicht erschienen',
    confirm:        'Bestätigen',
    complete:       'Abschließen',
    cancel:         'Stornieren',
    whatsapp:       'WhatsApp',
    clearDate:      '✕ Alle Daten',
    noReservations: 'Keine Reservierungen',
    loading:        'Lade Reservierungen...',
    statPending:    'Ausstehend',
    statConfirmed:  'Bestätigt',
    statCompleted:  'Abgeschlossen',
    statCancelled:  'Storniert',
  },
  settings: {
    title:              'Einstellungen',
    tabs: {
      store:         'Geschäft',
      gallery:       'Galerie',
      masters:       'Mitarbeiter',
      notifications: 'Benachrichtigungen',
      security:      'Sicherheit',
      schedule:      'Zeitplan',
    },
    savingBtn:          'Speichere...',
    saveBtn:            'Änderungen speichern',
    savedToast:         'Einstellungen gespeichert',
    logoLabel:          'Salon-Logo',
    logoSizeHint:       'WebP / PNG / JPG · Ausgabe 400×120 · max. 5 MB',
    changeLogo:         'Logo ändern',
    uploadLogo:         'Logo hochladen',
    uploading:          'Lade hoch...',
    removeLogo:         'Logo entfernen',
    removeLogoConfirm:  'Logo wirklich entfernen? Der Text-Logotyp wird angezeigt.',
    storeNameLabel:     'Salonname',
    descriptionLabel:   'Beschreibung',
    aboutPhotoLabel:    'Foto für „Über uns"',
    aboutPhotoChange:   '📷 Foto ändern',
    aboutPhotoUpload:   '📷 Foto für „Über uns" hochladen',
    aboutPhotoSizeHint: 'Empfohlene Größe: 800×600px',
    aboutPhotoFormatHint: 'Empfohlenes Format: horizontal, min. 600×800 px',
    phoneLabel:         'Telefon',
    emailLabel:         'E-Mail',
    whatsappLabel:      'WhatsApp',
    addressLabel:       'Salonadresse',
    cityLabel:          'Stadt',
    latLabel:           'Breitengrad (lat)',
    lngLabel:           'Längengrad (lng)',
    googleRatingLabel:  'Google-Bewertung',
    workingHoursLabel:  'Öffnungszeiten',
    closedLabel:        'Geschlossen',
    days: {
      mon: 'Montag', tue: 'Dienstag', wed: 'Mittwoch', thu: 'Donnerstag',
      fri: 'Freitag', sat: 'Samstag', sun: 'Sonntag',
    },
    notifEmailLabel:     'Benachrichtigungs-E-Mail',
    notifReviewsLabel:   'Benachrichtigungen bei neuen Bewertungen',
    whatsappNumberLabel: 'WhatsApp-Nummer',
    whatsappNumberHint:  'Diese Nummer erscheint als WhatsApp-Schaltfläche auf der Website.',
    changePasswordTitle:    'Passwort ändern',
    currentPasswordLabel:   'Aktuelles Passwort',
    newPasswordLabel:       'Neues Passwort',
    confirmPasswordLabel:   'Passwort bestätigen',
    changePasswordBtn:      'Passwort ändern',
    activeSessionsLabel:    'Aktive Sitzungen:',
    terminateSessionsBtn:   'Alle Sitzungen beenden',
    twoFactorLabel:         'Zwei-Faktor-Authentifizierung',
    comingSoon:             'Demnächst',
    passwordToggleAriaLabel:'Anzeigen oder verbergen',
  },
  reviews: {
    title:    'Bewertungen',
    approved: 'Genehmigt',
    pending:  'Ausstehend',
    rejected: 'Abgelehnt',
    approve:  'Genehmigen',
    reject:   'Ablehnen',
    reply:    'Antworten',
  },
  courses: {
    title:           'Kurse',
    addCourse:       '+ Kurs hinzufügen',
    editCourse:      'Kurs bearbeiten',
    newCourse:       'Neuer Kurs',
    nameLabel:       'Name',
    priceLabel:      'Preis (€)',
    videoUrlLabel:   'Video-URL (Einbettung)',
    previewLabel:    'Vorschaubild (URL)',
    descriptionLabel:'Kurzbeschreibung',
    lessonTextLabel: 'Kursinhalt',
    noCourses:       'Noch keine Kurse. Fügen Sie den ersten hinzu.',
    confirmDelete:   'Diesen Kurs löschen?',
  },
  ai: {
    title:       'KI-Verwaltung',
    placeholder: 'Nachricht eingeben...',
    send:        'Senden',
  },
  dashboard: {
    title:             'Übersicht',
    todayAppointments: 'Heutige Termine',
    totalClients:      'Kunden gesamt',
    pendingReviews:    'Ausstehende Bewertungen',
  },
  gallery: {
    title:          'Galerie',
    addPhoto:       '↑ Foto hinzufügen',
    uploading:      'Lade hoch...',
    hint:           'Fotos werden automatisch optimiert (WebP, max. 1200×800). Formate: JPEG, PNG, WebP, GIF, AVIF. Max. 10 MB.',
    loading:        'Lade...',
    empty:          'Galerie ist leer — erstes Foto hochladen',
    deleteConfirm:  'Dieses Foto löschen?',
    replace:        '↑ Ersetzen',
    altPlaceholder: 'Fotobeschreibung...',
  },
  masters: {
    title:         'Mitarbeiter',
    add:           '+ Mitarbeiter hinzufügen',
    noMasters:     'Keine Mitarbeiter. Fügen Sie den ersten hinzu.',
    deleteConfirm: 'Mitarbeiter "{name}" löschen?',
    edit:          'Bearbeiten',
    role:          'Rolle',
    bio:           'Bio',
  },
  hero: {
    title:       'Hero-Bereich',
    uploadPhoto: 'Foto hochladen',
    hint:        'Empfohlene Größe: 1920×1080px. Max. 10 MB.',
    uploading:   'Lade hoch...',
  },
  legal: {
    title:        'Impressum / Legal',
    impressum:    'Impressum',
    datenschutz:  'Datenschutz',
    ownerLabel:   'Inhabername',
    addressLabel: 'Adresse',
    vatLabel:     'USt-IdNr.',
    emailLabel:   'E-Mail',
    phoneLabel:   'Telefon',
    save:         'Speichern',
  },
  tables: {
    title:         'Tische',
    add:           '+ Tisch hinzufügen',
    noTables:      'Keine Tische. Fügen Sie den ersten hinzu.',
    nameLabel:     'Tischname',
    capacityLabel: 'Kapazität (Personen)',
    deleteConfirm: 'Diesen Tisch löschen?',
  },
  appointments: {
    title:          'Termine',
    noAppointments: 'Keine Termine',
    loading:        'Lade Termine...',
    clientLabel:    'Kunde',
    serviceLabel:   'Leistung',
    masterLabel:    'Mitarbeiter',
    dateLabel:      'Datum',
    timeLabel:      'Uhrzeit',
    statusLabel:    'Status',
    notesLabel:     'Notiz',
  },
};

// ─── Ukrainian ─────────────────────────────────────────────────────────────
const UK: AdminTranslations = {
  nav: {
    dashboard:    'Огляд',
    hero:         'Головний банер',
    services:     'Послуги',
    reservations: 'Бронювання',
    masters:      'Майстри',
    gallery:      'Галерея',
    reviews:      'Відгуки',
    products:     'Товари',
    orders:       'Замовлення',
    promotions:   'Акції',
    menu:         'Меню',
    tables:       'Столики',
    deliveryZones:'Зони доставки',
    courses:      'Курси',
    history:      'Історія',
    theme:        'Тема',
    ai:           'AI-менеджер',
    settings:     'Налаштування',
    legal:        'Legal (DE)',
    logout:       'Вийти',
  },
  common: {
    save:      'Зберегти зміни',
    saving:    'Зберігаю...',
    cancel:    'Скасувати',
    delete:    'Видалити',
    edit:      'Редагувати',
    add:       'Додати',
    hide:      'Приховати',
    show:      'Показати',
    upload:    'Завантажити',
    uploading: 'Завантажую...',
    loading:   'Завантаження...',
    noData:    'Немає даних',
    confirm:   'Підтвердити',
  },
  theme:    EN.theme,
  services: EN.services,
  reservations: EN.reservations,
  settings: {
    title:              'Налаштування',
    tabs: {
      store:         'Магазин',
      gallery:       'Галерея',
      masters:       'Майстри',
      notifications: 'Сповіщення',
      security:      'Безпека',
      schedule:      'Розклад',
    },
    savingBtn:          'Зберігаю...',
    saveBtn:            'Зберегти зміни',
    savedToast:         'Налаштування збережено',
    logoLabel:          'Логотип салону',
    logoSizeHint:       'WebP / PNG / JPG · вихід 400×120 · макс. 5 МБ',
    changeLogo:         'Змінити логотип',
    uploadLogo:         'Завантажити логотип',
    uploading:          'Завантажую...',
    removeLogo:         'Видалити логотип',
    removeLogoConfirm:  'Справді видалити логотип? Відображатиметься текстовий логотип.',
    storeNameLabel:     'Назва салону',
    descriptionLabel:   'Опис',
    aboutPhotoLabel:    'Фото секції "Про нас"',
    aboutPhotoChange:   '📷 Змінити фото',
    aboutPhotoUpload:   '📷 Завантажити фото для секції Про нас',
    aboutPhotoSizeHint: 'Рекомендований розмір: 800×600px',
    aboutPhotoFormatHint: 'Рекомендований формат: горизонтальний, мін. 600×800 px',
    phoneLabel:         'Телефон',
    emailLabel:         'Email',
    whatsappLabel:      'WhatsApp',
    addressLabel:       'Адреса салону',
    cityLabel:          'Місто',
    latLabel:           'Широта (lat)',
    lngLabel:           'Довгота (lng)',
    googleRatingLabel:  'Рейтинг Google',
    workingHoursLabel:  'Робочі години',
    closedLabel:        'Зачинено',
    days: {
      mon: 'Понеділок', tue: 'Вівторок', wed: 'Середа', thu: 'Четвер',
      fri: 'Пʼятниця', sat: 'Субота', sun: 'Неділя',
    },
    notifEmailLabel:     'Email для сповіщень',
    notifReviewsLabel:   'Сповіщення про нові відгуки',
    whatsappNumberLabel: 'Номер WhatsApp',
    whatsappNumberHint:  'Номер відображатиметься як кнопка WhatsApp на сайті для клієнтів.',
    changePasswordTitle:    'Зміна пароля',
    currentPasswordLabel:   'Поточний пароль',
    newPasswordLabel:       'Новий пароль',
    confirmPasswordLabel:   'Підтвердіть пароль',
    changePasswordBtn:      'Змінити пароль',
    activeSessionsLabel:    'Активних сесій:',
    terminateSessionsBtn:   'Завершити всі сесії',
    twoFactorLabel:         'Двофакторна автентифікація',
    comingSoon:             'Незабаром',
    passwordToggleAriaLabel:'Показати або приховати',
  },
  reviews:  EN.reviews,
  courses:  EN.courses,
  ai:       EN.ai,
  dashboard: EN.dashboard,
  gallery: {
    title:          'Галерея',
    addPhoto:       '↑ Додати фото',
    uploading:      'Завантажую...',
    hint:           'Фото автоматично оптимізуються (WebP, макс. 1200×800). Формати: JPEG, PNG, WebP, GIF, AVIF. Макс. 10 МБ.',
    loading:        'Завантаження...',
    empty:          'Галерея порожня — завантажте перше фото',
    deleteConfirm:  'Видалити це фото?',
    replace:        '↑ Замінити',
    altPlaceholder: 'Опис фото...',
  },
  masters: {
    title:         'Майстри',
    add:           '+ Додати майстра',
    noMasters:     'Немає майстрів. Додайте першого.',
    deleteConfirm: 'Видалити майстра "{name}"?',
    edit:          'Редагувати',
    role:          'Роль',
    bio:           'Біо',
  },
  hero:         EN.hero,
  legal:        EN.legal,
  tables:       EN.tables,
  appointments: EN.appointments,
};

// ─── Exports ───────────────────────────────────────────────────────────────
export const ADMIN_TRANSLATIONS: Record<AdminLocale, AdminTranslations> = {
  sk: SK,
  en: EN,
  cs: CS,
  de: DE,
  uk: UK,
};

export function getAdminT(locale: AdminLocale): AdminTranslations {
  return ADMIN_TRANSLATIONS[locale] ?? SK;
}
