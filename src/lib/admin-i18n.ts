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
    allMasters: string;
    allServices: string;
    dateFrom: string;
    dateTo: string;
    allStatuses: string;
    summaryByMaster: string;
    total: string;
    records: string;
    bookings: string;
    noDataFilters: string;
    unknown: string;
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
    all: string;
    yourReply: string;
    ownerReplyLabel: string;
    saveReply: string;
    deleteConfirm: string;
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
    generate: string;
    generating: string;
    result: string;
    copy: string;
    copied: string;
    error: string;
    clearHistory: string;
    chatTitle: string;
    indexing: string;
    updateKnowledge: string;
    settingsTitle: string;
  };
  dashboard: {
    title: string;
    todayAppointments: string;
    totalClients: string;
    pendingReviews: string;
    welcome: string;
    recentBookings: string;
    recentOrders: string;
    revenue: string;
    totalBookings: string;
    avgCheck: string;
    today: string;
    thisWeek: string;
    thisMonth: string;
    noData: string;
    viewAll: string;
    client: string;
    service: string;
    date: string;
    status: string;
    amount: string;
    loading: string;
    time: string;
    guest: string;
    guestCount: string;
    orderNum: string;
    customer: string;
    topDishes: string;
    topProducts: string;
    salesUnit: string;
    reviewsUnit: string;
    noOrders: string;
    todayReservations: string;
    menuItems: string;
    processing: string;
    shipped: string;
    delivered: string;
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
    layoutLabel: string;
    savingLayout: string;
    layout2col: string;
    layout3col: string;
    layout4col: string;
    layoutMasonry: string;
    photoCount: string;
    moveUp: string;
    moveDown: string;
    uploadError: string;
    hidePhoto: string;
    showPhoto: string;
    deletePhoto: string;
    hidden: string;
  };
  masters: {
    title: string;
    add: string;
    noMasters: string;
    deleteConfirm: string;
    edit: string;
    newTitle: string;
    editTitle: string;
    editingTitle: string;
    nameLabel: string;
    roleLabel: string;
    bioLabel: string;
    bioPlaceholder: string;
    photoLabel: string;
    photoUpload: string;
    photoUploadError: string;
    saveBtn: string;
    deleteBtn: string;
    backLink: string;
  };
  hero: {
    title: string;
    uploadBtn: string;
    hint: string;
    uploading: string;
    currentPhoto: string;
  };
  legal: {
    title: string;
    impressumTab: string;
    datenschutzTab: string;
    ownerLabel: string;
    addressLabel: string;
    vatLabel: string;
    emailLabel: string;
    phoneLabel: string;
    save: string;
    saveBtn: string;
    saving: string;
  };
  tables: {
    title: string;
    add: string;
    noTables: string;
    nameLabel: string;
    capacityLabel: string;
    deleteConfirm: string;
    edit: string;
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
    deleteConfirm: string;
    date: string;
    time: string;
    client: string;
    service: string;
    master: string;
    status: string;
    confirmed: string;
    pending: string;
    cancelled: string;
    confirm: string;
    cancel: string;
    cancelConfirm: string;
    phone: string;
    email: string;
    duration: string;
    notes: string;
    backLink: string;
    internalNote: string;
    saveNote: string;
  };
  promotions: {
    title: string;
    newPromo: string;
    active: string;
    inactive: string;
    validFrom: string;
    validTo: string;
    discount: string;
    code: string;
    activate: string;
    deactivate: string;
    deleteConfirm: string;
    noPromos: string;
    type: string;
    period: string;
    applied: string;
    pause: string;
    resume: string;
    announcementTitle: string;
    showOnSite: string;
    hiddenLabel: string;
    freeDelivery: string;
  };
  orders: {
    title: string;
    export: string;
    searchPlaceholder: string;
    noOrders: string;
    guest: string;
    orderNum: string;
    items: string;
    payment: string;
    delivery: string;
    actions: string;
    pickup: string;
    dishes: string;
    goods: string;
    all: string;
    newLabel: string;
    processing: string;
  };
  products: {
    title: string;
    add: string;
    edit: string;
    newProduct: string;
    slug: string;
    price: string;
    currency: string;
    previewLabel: string;
    fileLabel: string;
    currentFile: string;
    translationsLbl: string;
    nameField: string;
    descField: string;
    deleteConfirm: string;
    noProducts: string;
    hidden: string;
    uploadError: string;
    validationError: string;
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
    allMasters:     'Všetci majstri',
    allServices:    'Všetky služby',
    dateFrom:       'Od',
    dateTo:         'Do',
    allStatuses:     'Všetky statusy',
    summaryByMaster: 'Prehľad podľa majstra',
    total:           'Celkom',
    records:         'záznamov',
    bookings:        'rezervácií',
    noDataFilters:   'Žiadne záznamy pre vybraté filtre.',
    unknown:         'Neznámy',
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
    title:          'Recenzie',
    approved:       'Schválené',
    pending:        'Čakajúce',
    rejected:       'Zamietnuté',
    approve:        'Schváliť',
    reject:         'Zamietnuť',
    reply:          'Odpovedať',
    all:            'Všetky',
    yourReply:      'Vaša odpoveď:',
    ownerReplyLabel:'ODPOVEĎ MAJITEĽA (VIDITEĽNÁ NA WEBE):',
    saveReply:      'ULOŽIŤ ODPOVEĎ',
    deleteConfirm:  'Vymazať túto recenziu?',
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
    title:           'AI správa',
    placeholder:     'Opýtajte sa alebo dajte pokyn...',
    send:            'Odoslať',
    generate:        'Generovať',
    generating:      'Generujem...',
    result:          'Výsledok',
    copy:            'Kopírovať',
    copied:          'Skopírované!',
    error:           'Chyba. Skúste znova.',
    clearHistory:    'Vymazať históriu',
    chatTitle:       'Store AI asistent',
    indexing:        'Indexujem...',
    updateKnowledge: 'Aktualizovať znalosti',
    settingsTitle:   'Nastavenia AI',
  },
  dashboard: {
    title:             'Prehľad',
    todayAppointments: 'Dnešné rezervácie',
    totalClients:      'Klienti celkom',
    pendingReviews:    'Čakajúce recenzie',
    welcome:           'Vitajte späť',
    recentBookings:    'Najbližšie rezervácie',
    recentOrders:      'Posledné objednávky',
    revenue:           'Tržby',
    totalBookings:     'Objednávky',
    avgCheck:          'Priemerný nákup',
    today:             'Dnes',
    thisWeek:          'Za týždeň',
    thisMonth:         'Tento mesiac',
    noData:            'Žiadne dáta',
    viewAll:           'Zobraziť všetky',
    client:            'Klient',
    service:           'Služba',
    date:              'Dátum',
    status:            'Stav',
    amount:            'Suma',
    loading:           'Načítavam...',
    time:              'Čas',
    guest:             'Hosť',
    guestCount:        'Osôb',
    orderNum:          'č.',
    customer:          'Zákazník',
    topDishes:         'Najlepšie jedlá',
    topProducts:       'Najlepšie produkty',
    salesUnit:         'predaní',
    reviewsUnit:       'recenzií',
    noOrders:          'Žiadne objednávky',
    todayReservations: 'Rezervácie dnes',
    menuItems:         'Jedál v menu',
    processing:        'Spracováva sa',
    shipped:           'Odoslané',
    delivered:         'Doručené',
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
    layoutLabel:    'Rozloženie galérie',
    savingLayout:   '— ukladám...',
    layout2col:     '2 stĺpce',
    layout3col:     '3 stĺpce (predvolené)',
    layout4col:     '4 stĺpce',
    layoutMasonry:  'Masonry',
    photoCount:     '{count} fotografií',
    moveUp:         'Posunúť hore',
    moveDown:       'Posunúť dole',
    uploadError:    'Chyba pri nahrávaní',
    hidePhoto:      'Skryť',
    showPhoto:      'Zobraziť',
    deletePhoto:    'Zmazať',
    hidden:         'skryté',
  },
  masters: {
    title:            'Majstri',
    add:              '+ Pridať majstra',
    noMasters:        'Žiadni majstri. Pridajte prvého.',
    deleteConfirm:    'Vymazať majstra "{name}"?',
    edit:             'Upraviť',
    newTitle:         'Nový majster',
    editTitle:        'Upraviť majstra',
    editingTitle:     'Upraviť: {name}',
    nameLabel:        'Meno',
    roleLabel:        'Rola / pozícia',
    bioLabel:         'Bio',
    bioPlaceholder:   'Skúsenosti, špeciality...',
    photoLabel:       'Fotografia',
    photoUpload:      '↑ Foto',
    photoUploadError: 'Chyba pri nahrávaní fotografie',
    saveBtn:          'Uložiť',
    deleteBtn:        'Zmazať majstra',
    backLink:         '← Späť na zoznam',
  },
  hero: {
    title:        'Hero sekcia',
    uploadBtn:    '↑ Nahrať foto',
    hint:         'Odporúčaný rozmer: 1920×1080px. Formáty: JPEG, PNG, WebP. Max. 10 MB.',
    uploading:    'Nahrávam...',
    currentPhoto: 'Aktuálna fotografia',
  },
  legal: {
    title:         'Legal (DE)',
    impressumTab:  'Impressum',
    datenschutzTab:'Datenschutz',
    ownerLabel:    'Meno majiteľa / Inhaber',
    addressLabel:  'Adresa',
    vatLabel:      'IČ DPH (USt-IdNr.)',
    emailLabel:    'E-mail',
    phoneLabel:    'Telefón',
    save:          'Uložiť',
    saveBtn:       'Uložiť',
    saving:        'Ukladám...',
  },
  tables: {
    title:         'Stoly',
    add:           '+ Pridať stôl',
    noTables:      'Žiadne stoly. Pridajte prvý.',
    nameLabel:     'Názov stola',
    capacityLabel: 'Kapacita (osôb)',
    deleteConfirm: 'Vymazať stôl?',
    edit:          'Upraviť',
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
    deleteConfirm:  'Zrušiť tento termín?',
    date:           'Dátum',
    time:           'Čas',
    client:         'Klient',
    service:        'Služba',
    master:         'Majster',
    status:         'Stav',
    confirmed:      'Potvrdený',
    pending:        'Čakajúci',
    cancelled:      'Zrušený',
    confirm:        'Potvrdiť',
    cancel:         'Zrušiť',
    cancelConfirm:  'Zrušiť termín?',
    phone:          'Telefón',
    email:          'Email',
    duration:       'Trvanie',
    notes:          'Poznámka',
    backLink:       '← Späť na termíny',
    internalNote:   'Interná poznámka',
    saveNote:       'Uložiť poznámku',
  },
  promotions: {
    title:             'Akcie',
    newPromo:          '+ Nová akcia',
    active:            'Aktívna',
    inactive:          'Neaktívna',
    validFrom:         'Platí od',
    validTo:           'Platí do',
    discount:          'Zľava',
    code:              'Kód',
    activate:          'Aktivovať',
    deactivate:        'Deaktivovať',
    deleteConfirm:     'Naozaj zmazať túto akciu?',
    noPromos:          'Žiadne akcie',
    type:              'Typ',
    period:            'Obdobie',
    applied:           'Aplikované',
    pause:             'Pozastaviť',
    resume:            'Obnoviť',
    announcementTitle: 'Oznamovací pás',
    showOnSite:        'Zobrazovať na webe',
    hiddenLabel:       'Skryté',
    freeDelivery:      'Bezplatné doručenie',
  },
  orders: {
    title:             'Objednávky',
    export:            'Export Excel',
    searchPlaceholder: 'Hľadať podľa mena, telefónu, č...',
    noOrders:          'Žiadne objednávky',
    guest:             'Hosť',
    orderNum:          'Č. objednávky',
    items:             'Položky',
    payment:           'Platba',
    delivery:          'Doručenie',
    actions:           'Akcie',
    pickup:            'Vyzdvihnúť',
    dishes:            'jedál',
    goods:             'produktov',
    all:               'Všetky',
    newLabel:          'Nové',
    processing:        'Spracúva sa',
  },
  products: {
    title:           'Digitálne produkty',
    add:             '+ Pridať produkt',
    edit:            'Upraviť produkt',
    newProduct:      'Nový produkt',
    slug:            'Slug (URL identifikátor)',
    price:           'Cena',
    currency:        'Mena',
    previewLabel:    'Obrázok náhľadu',
    fileLabel:       'Súbor produktu (PDF / zip)',
    currentFile:     'Aktuálny súbor ↗',
    translationsLbl: 'Preklady',
    nameField:       'Názov',
    descField:       'Popis',
    deleteConfirm:   'Naozaj vymazať produkt?',
    noProducts:      'Zatiaľ žiadne digitálne produkty.',
    hidden:          'skrytý',
    uploadError:     'Chyba pri nahrávaní',
    validationError: 'Vyplňte slug, cenu a aspoň jeden preklad',
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
    allMasters:     'All masters',
    allServices:    'All services',
    dateFrom:       'From',
    dateTo:         'To',
    allStatuses:     'All statuses',
    summaryByMaster: 'Summary by staff',
    total:           'Total',
    records:         'records',
    bookings:        'bookings',
    noDataFilters:   'No records for selected filters.',
    unknown:         'Unknown',
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
    title:          'Reviews',
    approved:       'Approved',
    pending:        'Pending',
    rejected:       'Rejected',
    approve:        'Approve',
    reject:         'Reject',
    reply:          'Reply',
    all:            'All',
    yourReply:      'Your reply:',
    ownerReplyLabel:'OWNER REPLY (VISIBLE ON WEBSITE):',
    saveReply:      'SAVE REPLY',
    deleteConfirm:  'Delete this review?',
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
    title:           'AI Assistant',
    placeholder:     'Ask a question or give an instruction...',
    send:            'Send',
    generate:        'Generate',
    generating:      'Generating...',
    result:          'Result',
    copy:            'Copy',
    copied:          'Copied!',
    error:           'Error. Please try again.',
    clearHistory:    'Clear history',
    chatTitle:       'Store AI Assistant',
    indexing:        'Indexing...',
    updateKnowledge: 'Update knowledge',
    settingsTitle:   'AI Settings',
  },
  dashboard: {
    title:             'Overview',
    todayAppointments: "Today's appointments",
    totalClients:      'Total clients',
    pendingReviews:    'Pending reviews',
    welcome:           'Welcome back',
    recentBookings:    'Recent bookings',
    recentOrders:      'Recent orders',
    revenue:           'Revenue',
    totalBookings:     'Bookings',
    avgCheck:          'Avg. order',
    today:             'Today',
    thisWeek:          'This week',
    thisMonth:         'This month',
    noData:            'No data yet',
    viewAll:           'View all',
    client:            'Client',
    service:           'Service',
    date:              'Date',
    status:            'Status',
    amount:            'Amount',
    loading:           'Loading...',
    time:              'Time',
    guest:             'Guest',
    guestCount:        'Guests',
    orderNum:          '#',
    customer:          'Customer',
    topDishes:         'Top dishes',
    topProducts:       'Top products',
    salesUnit:         'sold',
    reviewsUnit:       'reviews',
    noOrders:          'No orders',
    todayReservations: "Today's reservations",
    menuItems:         'Menu items',
    processing:        'Processing',
    shipped:           'Shipped',
    delivered:         'Delivered',
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
    layoutLabel:    'Gallery layout',
    savingLayout:   '— saving...',
    layout2col:     '2 columns',
    layout3col:     '3 columns (default)',
    layout4col:     '4 columns',
    layoutMasonry:  'Masonry',
    photoCount:     '{count} photos',
    moveUp:         'Move up',
    moveDown:       'Move down',
    uploadError:    'Upload error',
    hidePhoto:      'Hide',
    showPhoto:      'Show',
    deletePhoto:    'Delete',
    hidden:         'hidden',
  },
  masters: {
    title:            'Masters',
    add:              '+ Add master',
    noMasters:        'No masters yet. Add the first one.',
    deleteConfirm:    'Delete master "{name}"?',
    edit:             'Edit',
    newTitle:         'New master',
    editTitle:        'Edit master',
    editingTitle:     'Edit: {name}',
    nameLabel:        'Name',
    roleLabel:        'Role / position',
    bioLabel:         'Bio',
    bioPlaceholder:   'Experience, specialties...',
    photoLabel:       'Photo',
    photoUpload:      '↑ Photo',
    photoUploadError: 'Photo upload error',
    saveBtn:          'Save',
    deleteBtn:        'Delete master',
    backLink:         '← Back to list',
  },
  hero: {
    title:        'Hero section',
    uploadBtn:    '↑ Upload photo',
    hint:         'Recommended size: 1920×1080px. Formats: JPEG, PNG, WebP. Max. 10 MB.',
    uploading:    'Uploading...',
    currentPhoto: 'Current photo',
  },
  legal: {
    title:         'Legal (DE)',
    impressumTab:  'Impressum',
    datenschutzTab:'Datenschutz',
    ownerLabel:    'Owner name / Inhaber',
    addressLabel:  'Address',
    vatLabel:      'VAT ID (USt-IdNr.)',
    emailLabel:    'Email',
    phoneLabel:    'Phone',
    save:          'Save',
    saveBtn:       'Save',
    saving:        'Saving...',
  },
  tables: {
    title:         'Tables',
    add:           '+ Add table',
    noTables:      'No tables yet. Add the first one.',
    nameLabel:     'Table name',
    capacityLabel: 'Capacity (persons)',
    deleteConfirm: 'Delete this table?',
    edit:          'Edit',
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
    deleteConfirm:  'Cancel this appointment?',
    date:           'Date',
    time:           'Time',
    client:         'Client',
    service:        'Service',
    master:         'Master',
    status:         'Status',
    confirmed:      'Confirmed',
    pending:        'Pending',
    cancelled:      'Cancelled',
    confirm:        'Confirm',
    cancel:         'Cancel',
    cancelConfirm:  'Cancel appointment?',
    phone:          'Phone',
    email:          'Email',
    duration:       'Duration',
    notes:          'Note',
    backLink:       '← Back to appointments',
    internalNote:   'Internal note',
    saveNote:       'Save note',
  },
  promotions: {
    title:             'Promotions',
    newPromo:          '+ New promo',
    active:            'Active',
    inactive:          'Inactive',
    validFrom:         'Valid from',
    validTo:           'Valid to',
    discount:          'Discount',
    code:              'Code',
    activate:          'Activate',
    deactivate:        'Deactivate',
    deleteConfirm:     'Really delete this promotion?',
    noPromos:          'No promotions',
    type:              'Type',
    period:            'Period',
    applied:           'Applied',
    pause:             'Pause',
    resume:            'Resume',
    announcementTitle: 'Announcement bar',
    showOnSite:        'Show on site',
    hiddenLabel:       'Hidden',
    freeDelivery:      'Free delivery',
  },
  orders: {
    title:             'Orders',
    export:            'Export Excel',
    searchPlaceholder: 'Search by name, phone, #...',
    noOrders:          'No orders yet',
    guest:             'Guest',
    orderNum:          'Order #',
    items:             'Items',
    payment:           'Payment',
    delivery:          'Delivery',
    actions:           'Actions',
    pickup:            'Pickup',
    dishes:            'dishes',
    goods:             'items',
    all:               'All',
    newLabel:          'New',
    processing:        'Processing',
  },
  products: {
    title:           'Digital products',
    add:             '+ Add product',
    edit:            'Edit product',
    newProduct:      'New product',
    slug:            'Slug (URL identifier)',
    price:           'Price',
    currency:        'Currency',
    previewLabel:    'Preview image',
    fileLabel:       'Product file (PDF / zip)',
    currentFile:     'Current file ↗',
    translationsLbl: 'Translations',
    nameField:       'Name',
    descField:       'Description',
    deleteConfirm:   'Really delete this product?',
    noProducts:      'No digital products yet.',
    hidden:          'hidden',
    uploadError:     'Upload error',
    validationError: 'Fill in slug, price and at least one translation',
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
  reservations: {
    ...EN.reservations,
    allStatuses:     'Všechny stavy',
    summaryByMaster: 'Přehled podle pracovníka',
    total:           'Celkem',
    records:         'záznamů',
    bookings:        'rezervací',
    noDataFilters:   'Žádné záznamy pro vybrané filtry.',
    unknown:         'Neznámý',
  },
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
  reviews: {
    title:          'Recenze',
    all:            'Vše',
    yourReply:      'Vaše odpověď...',
    ownerReplyLabel:'Odpověď majitele:',
    saveReply:      'Uložit odpověď',
    deleteConfirm:  'Opravdu smazat recenzi?',
    approved:       'Schváleno',
    pending:        'Čeká',
    rejected:       'Zamítnuto',
    approve:        'Schválit',
    reject:         'Zamítnout',
    reply:          'Odpovědět',
  },
  courses:      EN.courses,
  ai: {
    title:           'AI asistent',
    placeholder:     'Zeptejte se nebo zadejte pokyn...',
    send:            'Odeslat',
    generate:        'Generovat',
    generating:      'Generuji...',
    result:          'Výsledek',
    copy:            'Kopírovat',
    copied:          'Zkopírováno!',
    error:           'Chyba. Zkuste znovu.',
    clearHistory:    'Smazat historii',
    chatTitle:       'Store AI asistent',
    indexing:        'Indexuji...',
    updateKnowledge: 'Aktualizovat znalosti',
    settingsTitle:   'Nastavení AI',
  },
  dashboard: {
    title:             'Přehled',
    todayAppointments: 'Dnešní termíny',
    totalClients:      'Klienti celkem',
    pendingReviews:    'Čekající recenze',
    welcome:           'Vítejte zpět',
    recentBookings:    'Poslední rezervace',
    recentOrders:      'Poslední objednávky',
    revenue:           'Tržby',
    totalBookings:     'Rezervace',
    avgCheck:          'Průměrná obj.',
    today:             'Dnes',
    thisWeek:          'Tento týden',
    thisMonth:         'Tento měsíc',
    noData:            'Žádná data',
    viewAll:           'Zobrazit vše',
    client:            'Klient',
    service:           'Služba',
    date:              'Datum',
    status:            'Stav',
    amount:            'Částka',
    loading:           'Načítám...',
    time:              'Čas',
    guest:             'Host',
    guestCount:        'Osob',
    orderNum:          'č.',
    customer:          'Zákazník',
    topDishes:         'Nejlepší jídla',
    topProducts:       'Nejlepší produkty',
    salesUnit:         'prodáno',
    reviewsUnit:       'recenzí',
    noOrders:          'Žádné objednávky',
    todayReservations: 'Rezervace dnes',
    menuItems:         'Položky menu',
    processing:        'Zpracovává se',
    shipped:           'Odesláno',
    delivered:         'Doručeno',
  },
  gallery: {
    title:          'Galerie',
    addPhoto:       '↑ Přidat foto',
    uploading:      'Nahrávám...',
    hint:           'Fotky se automaticky optimalizují (WebP, max. 1200×800). Formáty: JPEG, PNG, WebP, GIF, AVIF. Max. 10 MB.',
    loading:        'Načítám...',
    empty:          'Galerie je prázdná — nahrajte první foto',
    deleteConfirm:  'Smazat toto foto?',
    replace:        '↑ Nahradit',
    altPlaceholder: 'Popis fotky...',
    layoutLabel:    'Rozložení galerie',
    savingLayout:   '— ukládám...',
    layout2col:     '2 sloupce',
    layout3col:     '3 sloupce (výchozí)',
    layout4col:     '4 sloupce',
    layoutMasonry:  'Masonry',
    photoCount:     '{count} fotografií',
    moveUp:         'Posunout nahoru',
    moveDown:       'Posunout dolů',
    uploadError:    'Chyba při nahrávání',
    hidePhoto:      'Skrýt',
    showPhoto:      'Zobrazit',
    deletePhoto:    'Smazat',
    hidden:         'skryto',
  },
  masters: {
    title:            'Mistři',
    add:              '+ Přidat mistra',
    noMasters:        'Žádní mistři. Přidejte prvního.',
    deleteConfirm:    'Smazat mistra "{name}"?',
    edit:             'Upravit',
    newTitle:         'Nový mistr',
    editTitle:        'Upravit mistra',
    editingTitle:     'Upravit: {name}',
    nameLabel:        'Jméno',
    roleLabel:        'Role / pozice',
    bioLabel:         'Bio',
    bioPlaceholder:   'Zkušenosti, speciality...',
    photoLabel:       'Fotografie',
    photoUpload:      '↑ Foto',
    photoUploadError: 'Chyba při nahrávání fotografie',
    saveBtn:          'Uložit',
    deleteBtn:        'Smazat mistra',
    backLink:         '← Zpět na seznam',
  },
  hero: {
    title:        'Hero sekce',
    uploadBtn:    '↑ Nahrát foto',
    hint:         'Doporučená velikost: 1920×1080px. Formáty: JPEG, PNG, WebP. Max. 10 MB.',
    uploading:    'Nahrávám...',
    currentPhoto: 'Aktuální fotografie',
  },
  legal:        EN.legal,
  tables: {
    title:         'Stoly',
    add:           '+ Přidat stůl',
    noTables:      'Žádné stoly. Přidejte první.',
    nameLabel:     'Název stolu',
    capacityLabel: 'Kapacita (osob)',
    deleteConfirm: 'Smazat stůl?',
    edit:          'Upravit',
  },
  appointments: {
    title:          'Termíny',
    noAppointments: 'Žádné termíny',
    loading:        'Načítám termíny...',
    clientLabel:    'Klient',
    serviceLabel:   'Služba',
    masterLabel:    'Mistr',
    dateLabel:      'Datum',
    timeLabel:      'Čas',
    statusLabel:    'Stav',
    notesLabel:     'Poznámka',
    deleteConfirm:  'Zrušit tento termín?',
    date:           'Datum',
    time:           'Čas',
    client:         'Klient',
    service:        'Služba',
    master:         'Mistr',
    status:         'Stav',
    confirmed:      'Potvrzeno',
    pending:        'Čeká',
    cancelled:      'Zrušeno',
    confirm:        'Potvrdit',
    cancel:         'Zrušit',
    cancelConfirm:  'Zrušit termín?',
    phone:          'Telefon',
    email:          'E-mail',
    duration:       'Délka',
    notes:          'Poznámka',
    backLink:       '← Zpět na termíny',
    internalNote:   'Interní poznámka',
    saveNote:       'Uložit poznámku',
  },
  promotions: {
    title:             'Akce',
    newPromo:          '+ Nová akce',
    active:            'Aktivní',
    inactive:          'Neaktivní',
    validFrom:         'Platí od',
    validTo:           'Platí do',
    discount:          'Sleva',
    code:              'Kód',
    activate:          'Aktivovat',
    deactivate:        'Deaktivovat',
    deleteConfirm:     'Opravdu smazat tuto akci?',
    noPromos:          'Žádné akce',
    type:              'Typ',
    period:            'Období',
    applied:           'Použito',
    pause:             'Pozastavit',
    resume:            'Obnovit',
    announcementTitle: 'Oznamovací pruh',
    showOnSite:        'Zobrazit na webu',
    hiddenLabel:       'Skryto',
    freeDelivery:      'Bezplatné doručení',
  },
  orders: {
    title:             'Objednávky',
    export:            'Export Excel',
    searchPlaceholder: 'Hledat podle jména, telefonu, č...',
    noOrders:          'Žádné objednávky',
    guest:             'Host',
    orderNum:          'Č. objednávky',
    items:             'Položky',
    payment:           'Platba',
    delivery:          'Doručení',
    actions:           'Akce',
    pickup:            'Vyzvednout',
    dishes:            'jídel',
    goods:             'produktů',
    all:               'Vše',
    newLabel:          'Nové',
    processing:        'Zpracovává se',
  },
  products: {
    title:           'Digitální produkty',
    add:             '+ Přidat produkt',
    edit:            'Upravit produkt',
    newProduct:      'Nový produkt',
    slug:            'Slug (URL identifikátor)',
    price:           'Cena',
    currency:        'Měna',
    previewLabel:    'Náhledový obrázek',
    fileLabel:       'Soubor produktu (PDF / zip)',
    currentFile:     'Aktuální soubor ↗',
    translationsLbl: 'Překlady',
    nameField:       'Název',
    descField:       'Popis',
    deleteConfirm:   'Opravdu smazat produkt?',
    noProducts:      'Zatím žádné digitální produkty.',
    hidden:          'skrytý',
    uploadError:     'Chyba při nahrávání',
    validationError: 'Vyplňte slug, cenu a alespoň jeden překlad',
  },
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
    allMasters:     'Alle Mitarbeiter',
    allServices:    'Alle Leistungen',
    dateFrom:       'Von',
    dateTo:         'Bis',
    allStatuses:     'Alle Status',
    summaryByMaster: 'Übersicht nach Mitarbeitern',
    total:           'Gesamt',
    records:         'Einträge',
    bookings:        'Buchungen',
    noDataFilters:   'Keine Einträge für die gewählten Filter.',
    unknown:         'Unbekannt',
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
    title:          'Bewertungen',
    all:            'Alle',
    yourReply:      'Ihre Antwort...',
    ownerReplyLabel:'Antwort des Inhabers:',
    saveReply:      'Antwort speichern',
    deleteConfirm:  'Bewertung wirklich löschen?',
    approved:       'Genehmigt',
    pending:        'Ausstehend',
    rejected:       'Abgelehnt',
    approve:        'Genehmigen',
    reject:         'Ablehnen',
    reply:          'Antworten',
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
    title:           'KI-Verwaltung',
    placeholder:     'Frage stellen oder Anweisung geben...',
    send:            'Senden',
    generate:        'Generieren',
    generating:      'Generiere...',
    result:          'Ergebnis',
    copy:            'Kopieren',
    copied:          'Kopiert!',
    error:           'Fehler. Bitte erneut versuchen.',
    clearHistory:    'Verlauf löschen',
    chatTitle:       'Store KI-Assistent',
    indexing:        'Indexiere...',
    updateKnowledge: 'Wissen aktualisieren',
    settingsTitle:   'KI-Einstellungen',
  },
  dashboard: {
    title:             'Übersicht',
    todayAppointments: 'Heutige Termine',
    totalClients:      'Kunden gesamt',
    pendingReviews:    'Ausstehende Bewertungen',
    welcome:           'Willkommen zurück',
    recentBookings:    'Nächste Buchungen',
    recentOrders:      'Letzte Bestellungen',
    revenue:           'Umsatz',
    totalBookings:     'Buchungen',
    avgCheck:          'Ø Bestellung',
    today:             'Heute',
    thisWeek:          'Diese Woche',
    thisMonth:         'Diesen Monat',
    noData:            'Noch keine Daten',
    viewAll:           'Alle anzeigen',
    client:            'Kunde',
    service:           'Leistung',
    date:              'Datum',
    status:            'Status',
    amount:            'Betrag',
    loading:           'Wird geladen...',
    time:              'Uhrzeit',
    guest:             'Gast',
    guestCount:        'Personen',
    orderNum:          'Nr.',
    customer:          'Kunde',
    topDishes:         'Top-Gerichte',
    topProducts:       'Top-Produkte',
    salesUnit:         'verkauft',
    reviewsUnit:       'Bewertungen',
    noOrders:          'Keine Bestellungen',
    todayReservations: 'Reservierungen heute',
    menuItems:         'Menü-Einträge',
    processing:        'In Bearbeitung',
    shipped:           'Versendet',
    delivered:         'Geliefert',
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
    layoutLabel:    'Galerie-Layout',
    savingLayout:   '— speichere...',
    layout2col:     '2 Spalten',
    layout3col:     '3 Spalten (Standard)',
    layout4col:     '4 Spalten',
    layoutMasonry:  'Masonry',
    photoCount:     '{count} Fotos',
    moveUp:         'Nach oben',
    moveDown:       'Nach unten',
    uploadError:    'Fehler beim Hochladen',
    hidePhoto:      'Ausblenden',
    showPhoto:      'Einblenden',
    deletePhoto:    'Löschen',
    hidden:         'verborgen',
  },
  masters: {
    title:            'Mitarbeiter',
    add:              '+ Mitarbeiter hinzufügen',
    noMasters:        'Keine Mitarbeiter. Fügen Sie den ersten hinzu.',
    deleteConfirm:    'Mitarbeiter "{name}" löschen?',
    edit:             'Bearbeiten',
    newTitle:         'Neuer Mitarbeiter',
    editTitle:        'Mitarbeiter bearbeiten',
    editingTitle:     'Bearbeiten: {name}',
    nameLabel:        'Name',
    roleLabel:        'Rolle / Position',
    bioLabel:         'Bio',
    bioPlaceholder:   'Erfahrung, Spezialitäten...',
    photoLabel:       'Foto',
    photoUpload:      '↑ Foto',
    photoUploadError: 'Fehler beim Hochladen des Fotos',
    saveBtn:          'Speichern',
    deleteBtn:        'Mitarbeiter löschen',
    backLink:         '← Zurück zur Liste',
  },
  hero: {
    title:        'Hero-Bereich',
    uploadBtn:    '↑ Foto hochladen',
    hint:         'Empfohlene Größe: 1920×1080px. Formate: JPEG, PNG, WebP. Max. 10 MB.',
    uploading:    'Lade hoch...',
    currentPhoto: 'Aktuelles Foto',
  },
  legal: {
    title:         'Impressum / Legal',
    impressumTab:  'Impressum',
    datenschutzTab:'Datenschutz',
    ownerLabel:    'Inhabername',
    addressLabel:  'Adresse',
    vatLabel:      'USt-IdNr.',
    emailLabel:    'E-Mail',
    phoneLabel:    'Telefon',
    save:          'Speichern',
    saveBtn:       'Speichern',
    saving:        'Speichere...',
  },
  tables: {
    title:         'Tische',
    add:           '+ Tisch hinzufügen',
    noTables:      'Keine Tische. Fügen Sie den ersten hinzu.',
    nameLabel:     'Tischname',
    capacityLabel: 'Kapazität (Personen)',
    deleteConfirm: 'Diesen Tisch löschen?',
    edit:          'Bearbeiten',
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
    notesLabel:     'Notizen',
    deleteConfirm:  'Diesen Termin absagen?',
    date:           'Datum',
    time:           'Uhrzeit',
    client:         'Kunde',
    service:        'Leistung',
    master:         'Mitarbeiter',
    status:         'Status',
    confirmed:      'Bestätigt',
    pending:        'Ausstehend',
    cancelled:      'Storniert',
    confirm:        'Bestätigen',
    cancel:         'Stornieren',
    cancelConfirm:  'Termin stornieren?',
    phone:          'Telefon',
    email:          'E-Mail',
    duration:       'Dauer',
    notes:          'Notiz',
    backLink:       '← Zurück zu Terminen',
    internalNote:   'Interne Notiz',
    saveNote:       'Notiz speichern',
  },
  promotions: {
    title:             'Aktionen',
    newPromo:          '+ Neue Aktion',
    active:            'Aktiv',
    inactive:          'Inaktiv',
    validFrom:         'Gültig ab',
    validTo:           'Gültig bis',
    discount:          'Rabatt',
    code:              'Code',
    activate:          'Aktivieren',
    deactivate:        'Deaktivieren',
    deleteConfirm:     'Aktion wirklich löschen?',
    noPromos:          'Keine Aktionen',
    type:              'Typ',
    period:            'Zeitraum',
    applied:           'Angewendet',
    pause:             'Pausieren',
    resume:            'Fortsetzen',
    announcementTitle: 'Ankündigungsleiste',
    showOnSite:        'Auf Website anzeigen',
    hiddenLabel:       'Versteckt',
    freeDelivery:      'Kostenlose Lieferung',
  },
  orders: {
    title:             'Bestellungen',
    export:            'Excel exportieren',
    searchPlaceholder: 'Suche nach Name, Telefon, Nr...',
    noOrders:          'Noch keine Bestellungen',
    guest:             'Gast',
    orderNum:          'Bestell-Nr.',
    items:             'Positionen',
    payment:           'Zahlung',
    delivery:          'Lieferung',
    actions:           'Aktionen',
    pickup:            'Abholung',
    dishes:            'Gerichte',
    goods:             'Produkte',
    all:               'Alle',
    newLabel:          'Neu',
    processing:        'In Bearbeitung',
  },
  products: {
    title:           'Digitale Produkte',
    add:             '+ Produkt hinzufügen',
    edit:            'Produkt bearbeiten',
    newProduct:      'Neues Produkt',
    slug:            'Slug (URL-Bezeichner)',
    price:           'Preis',
    currency:        'Währung',
    previewLabel:    'Vorschaubild',
    fileLabel:       'Produktdatei (PDF / zip)',
    currentFile:     'Aktuelle Datei ↗',
    translationsLbl: 'Übersetzungen',
    nameField:       'Name',
    descField:       'Beschreibung',
    deleteConfirm:   'Produkt wirklich löschen?',
    noProducts:      'Noch keine digitalen Produkte.',
    hidden:          'versteckt',
    uploadError:     'Upload-Fehler',
    validationError: 'Slug, Preis und mindestens eine Übersetzung ausfüllen',
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
  reservations: {
    ...EN.reservations,
    allStatuses:     'Всі статуси',
    summaryByMaster: 'Огляд по майстру',
    total:           'Разом',
    records:         'записів',
    bookings:        'записів',
    noDataFilters:   'Немає записів для вибраних фільтрів.',
    unknown:         'Невідомий',
  },
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
  reviews: {
    title:          'Відгуки',
    all:            'Усі',
    yourReply:      'Ваша відповідь...',
    ownerReplyLabel:'Відповідь власника:',
    saveReply:      'Зберегти відповідь',
    deleteConfirm:  'Справді видалити відгук?',
    approved:       'Схвалено',
    pending:        'Очікує',
    rejected:       'Відхилено',
    approve:        'Схвалити',
    reject:         'Відхилити',
    reply:          'Відповісти',
  },
  courses:  EN.courses,
  ai: {
    title:           'AI-менеджер',
    placeholder:     'Запитайте або дайте вказівку...',
    send:            'Надіслати',
    generate:        'Генерувати',
    generating:      'Генерую...',
    result:          'Результат',
    copy:            'Копіювати',
    copied:          'Скопійовано!',
    error:           'Помилка. Спробуйте знову.',
    clearHistory:    'Очистити історію',
    chatTitle:       'Store AI-асистент',
    indexing:        'Індексую...',
    updateKnowledge: 'Оновити знання',
    settingsTitle:   'Налаштування AI',
  },
  dashboard: {
    title:             'Огляд',
    todayAppointments: 'Записи сьогодні',
    totalClients:      'Клієнти разом',
    pendingReviews:    'Відгуки на розгляді',
    welcome:           'Ласкаво просимо',
    recentBookings:    'Останні записи',
    recentOrders:      'Останні замовлення',
    revenue:           'Виручка',
    totalBookings:     'Записи',
    avgCheck:          'Сер. чек',
    today:             'Сьогодні',
    thisWeek:          'Цей тиждень',
    thisMonth:         'Цей місяць',
    noData:            'Немає даних',
    viewAll:           'Переглянути всі',
    client:            'Клієнт',
    service:           'Послуга',
    date:              'Дата',
    status:            'Статус',
    amount:            'Сума',
    loading:           'Завантаження...',
    time:              'Час',
    guest:             'Гість',
    guestCount:        'Осіб',
    orderNum:          '№',
    customer:          'Покупець',
    topDishes:         'Топ страви',
    topProducts:       'Топ продукти',
    salesUnit:         'продано',
    reviewsUnit:       'відгуків',
    noOrders:          'Немає замовлень',
    todayReservations: 'Записи сьогодні',
    menuItems:         'Страви в меню',
    processing:        'Обробляється',
    shipped:           'Відправлено',
    delivered:         'Доставлено',
  },
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
    layoutLabel:    'Розкладка галереї',
    savingLayout:   '— зберігаю...',
    layout2col:     '2 стовпці',
    layout3col:     '3 стовпці (за замовч.)',
    layout4col:     '4 стовпці',
    layoutMasonry:  'Masonry',
    photoCount:     '{count} фото',
    moveUp:         'Вгору',
    moveDown:       'Вниз',
    uploadError:    'Помилка завантаження',
    hidePhoto:      'Сховати',
    showPhoto:      'Показати',
    deletePhoto:    'Видалити',
    hidden:         'приховано',
  },
  masters: {
    title:            'Майстри',
    add:              '+ Додати майстра',
    noMasters:        'Немає майстрів. Додайте першого.',
    deleteConfirm:    'Видалити майстра "{name}"?',
    edit:             'Редагувати',
    newTitle:         'Новий майстер',
    editTitle:        'Редагувати майстра',
    editingTitle:     'Редагувати: {name}',
    nameLabel:        'Імʼя',
    roleLabel:        'Роль / посада',
    bioLabel:         'Біо',
    bioPlaceholder:   'Досвід, спеціалізація...',
    photoLabel:       'Фотографія',
    photoUpload:      '↑ Фото',
    photoUploadError: 'Помилка завантаження фото',
    saveBtn:          'Зберегти',
    deleteBtn:        'Видалити майстра',
    backLink:         '← Назад до списку',
  },
  hero: {
    title:        'Головний банер',
    uploadBtn:    '↑ Завантажити фото',
    hint:         'Рекомендований розмір: 1920×1080px. Формати: JPEG, PNG, WebP. Макс. 10 МБ.',
    uploading:    'Завантажую...',
    currentPhoto: 'Поточне фото',
  },
  legal:        EN.legal,
  tables: {
    title:         'Столики',
    add:           '+ Додати столик',
    noTables:      'Немає столиків. Додайте перший.',
    nameLabel:     'Назва столика',
    capacityLabel: 'Місткість (осіб)',
    deleteConfirm: 'Видалити столик?',
    edit:          'Редагувати',
  },
  appointments: {
    title:          'Записи',
    noAppointments: 'Немає записів',
    loading:        'Завантажую записи...',
    clientLabel:    'Клієнт',
    serviceLabel:   'Послуга',
    masterLabel:    'Майстер',
    dateLabel:      'Дата',
    timeLabel:      'Час',
    statusLabel:    'Статус',
    notesLabel:     'Нотатка',
    deleteConfirm:  'Скасувати цей запис?',
    date:           'Дата',
    time:           'Час',
    client:         'Клієнт',
    service:        'Послуга',
    master:         'Майстер',
    status:         'Статус',
    confirmed:      'Підтверджено',
    pending:        'Очікує',
    cancelled:      'Скасовано',
    confirm:        'Підтвердити',
    cancel:         'Скасувати',
    cancelConfirm:  'Скасувати запис?',
    phone:          'Телефон',
    email:          'Email',
    duration:       'Тривалість',
    notes:          'Нотатка',
    backLink:       '← Назад до записів',
    internalNote:   'Внутрішня нотатка',
    saveNote:       'Зберегти нотатку',
  },
  promotions: {
    title:             'Акції',
    newPromo:          '+ Нова акція',
    active:            'Активна',
    inactive:          'Неактивна',
    validFrom:         'Діє від',
    validTo:           'Діє до',
    discount:          'Знижка',
    code:              'Код',
    activate:          'Активувати',
    deactivate:        'Деактивувати',
    deleteConfirm:     'Справді видалити акцію?',
    noPromos:          'Немає акцій',
    type:              'Тип',
    period:            'Період',
    applied:           'Застосовано',
    pause:             'Призупинити',
    resume:            'Відновити',
    announcementTitle: 'Рядок оголошень',
    showOnSite:        'Показувати на сайті',
    hiddenLabel:       'Приховано',
    freeDelivery:      'Безкоштовна доставка',
  },
  orders: {
    title:             'Замовлення',
    export:            'Експорт Excel',
    searchPlaceholder: 'Пошук по імені, телефону, №...',
    noOrders:          'Замовлень поки немає',
    guest:             'Гість',
    orderNum:          '№ замовлення',
    items:             'Товари',
    payment:           'Оплата',
    delivery:          'Доставка',
    actions:           'Дії',
    pickup:            'Самовивіз',
    dishes:            'страв',
    goods:             'товарів',
    all:               'Всі',
    newLabel:          'Нові',
    processing:        'В обробці',
  },
  products: {
    title:           'Цифрові продукти',
    add:             '+ Додати продукт',
    edit:            'Редагувати продукт',
    newProduct:      'Новий продукт',
    slug:            'Slug (URL ідентифікатор)',
    price:           'Ціна',
    currency:        'Валюта',
    previewLabel:    'Зображення прев\'ю',
    fileLabel:       'Файл продукту (PDF / zip)',
    currentFile:     'Поточний файл ↗',
    translationsLbl: 'Переклади',
    nameField:       'Назва',
    descField:       'Опис',
    deleteConfirm:   'Справді видалити продукт?',
    noProducts:      'Ще немає цифрових продуктів.',
    hidden:          'прихований',
    uploadError:     'Помилка завантаження',
    validationError: 'Введіть slug, ціну та хоча б один переклад',
  },
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
