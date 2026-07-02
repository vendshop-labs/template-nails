import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcryptjs from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

const LUMIERE_THEME = {
  colors: {
    bg:            '#fdf8f5',
    primary:       '#b87c6f',
    primaryDark:   '#9a6459',
    primaryLight:  '#f5e6e3',
    text:          '#2d1b1b',
    textSecondary: '#7a5c5c',
    textMuted:     '#b09090',
    border:        'rgba(184,124,111,0.2)',
    bgSubtle:      '#f9ede9',
    success:       '#16a34a',
    error:         '#ef4444',
    contrast:      '#ffffff',
    overlay:       '#2d1b1b',
    overlayAlpha:  'rgba(45,27,27,0.55)',
    headerBg:      'rgba(253,248,245,0.96)',
    bgDark:        '#2d1b1b',
    warning:       '#fbbf24',
    successLight:  '#dcfce7',
    errorLight:    '#fef2f2',
    infoLight:     '#eff6ff',
    surface:       '#ffffff',
    bgAlt:         '#f5ede9',
    bgCard:        '#ffffff',
  },
  layout: {
    heroType:     'split',
    cardStyle:    'border',
    navPosition:  'top',
    borderRadius: 'rounded',
  },
} as const;

async function main() {
  console.log('🌸 Seeding Lumière Nails...');

  // ============ STORE ============
  const store = await db.store.upsert({
    where: { slug: 'lumiere-nails' },
    update: {
      name: 'Lumière Nails',
      phone: '+49 30 901 820 60',
      email: 'info@lumiere-nails.de',
      address: 'Unter den Linden 1',
      city: 'Berlin',
      instagramUrl: 'https://instagram.com/lumiere.nails',
      googleRating: '4.9',
      themeConfig: LUMIERE_THEME as unknown as Record<string, unknown>,
    },
    create: {
      name: 'Lumière Nails',
      slug: 'lumiere-nails',
      vertical: 'SERVICES',
      primaryMode: 'PHYSICAL',
      phone: '+49 30 901 820 60',
      email: 'info@lumiere-nails.de',
      address: 'Unter den Linden 1',
      city: 'Berlin',
      instagramUrl: 'https://instagram.com/lumiere.nails',
      googleRating: '4.9',
      openingHours: JSON.stringify({
        mon: { open: '09:00', close: '18:00' },
        tue: { open: '09:00', close: '18:00' },
        wed: { open: '09:00', close: '18:00' },
        thu: { open: '09:00', close: '18:00' },
        fri: { open: '09:00', close: '18:00' },
        sat: { open: '09:00', close: '15:00' },
        sun: null,
      }),
      themeConfig: LUMIERE_THEME as unknown as Record<string, unknown>,
    },
  });
  console.log('✅ Store:', store.slug);

  // ============ SERVICES ============
  await db.service.deleteMany({ where: { storeId: store.id } });
  const serviceData = [
    { slug: 'klassische-manikure',  nameKey: 'Klassische Maniküre', description: 'Pflege und Formgebung der natürlichen Nägel mit Nagellack nach Wahl.',         price: 18, duration: 45, category: 'manicure' },
    { slug: 'gel-manikure',         nameKey: 'Gel-Maniküre',        description: 'Langanhaltende Gelnägel – bis zu 3–4 Wochen perfekter Halt.',                   price: 35, duration: 60, category: 'manicure' },
    { slug: 'gel-design',           nameKey: 'Gel + Design',         description: 'Gel-Maniküre mit individuellem Nail-Art-Design Ihrer Wahl.',                    price: 45, duration: 75, category: 'manicure' },
    { slug: 'pedikure',             nameKey: 'Pediküre',             description: 'Professionelle Fußpflege – weiche Haut, gepflegte Nägel.',                     price: 25, duration: 50, category: 'pedicure' },
    { slug: 'modellage',            nameKey: 'Modellage',            description: 'Aufbau und Verlängerung der Nägel mit Gel für perfekte Form.',                  price: 55, duration: 90, category: 'nail-art' },
    { slug: 'nail-art',             nameKey: 'Nail Art',             description: 'Kreative Designs, Glitter oder Stempel – auf Wunsch zu jedem Service buchbar.', price: 10, duration: 20, category: 'nail-art' },
  ];

  for (const s of serviceData) {
    await db.service.create({ data: { storeId: store.id, ...s } });
  }
  console.log('✅ Services:', serviceData.length);

  // ============ TECHNICIANS ============
  // NOTE: seed creates structure only — photo is set via admin panel
  const masterData = [
    { id: `master-kristina-${store.id}`, name: 'Kristína Malá',     role: 'Nail technician', photo: null, sortOrder: 0 },
    { id: `master-monika-${store.id}`,   name: 'Monika Horváthová', role: 'Nail technician', photo: null, sortOrder: 1 },
  ];

  const isCdnUrl = (url: string | null) =>
    !!url && (url.includes('unsplash.com') || url.includes('ui-avatars.com') || url.includes('picsum.photos'));

  for (const m of masterData) {
    const existing = await db.serviceMaster.findUnique({ where: { id: m.id }, select: { photo: true } });
    await db.serviceMaster.upsert({
      where: { id: m.id },
      update: {
        name: m.name, role: m.role, sortOrder: m.sortOrder,
        // Reset CDN photos to null; preserve real admin-uploaded photos
        ...(isCdnUrl(existing?.photo ?? null) ? { photo: null } : {}),
      },
      create: { storeId: store.id, ...m },
    });
  }
  console.log('✅ Technicians:', masterData.length);

  // ============ GALLERY ============
  // NOTE: seed creates structure only — url is set via admin panel
  await db.galleryImage.deleteMany({ where: { storeId: store.id } });
  const galleryData = [
    { alt: 'Gel-Maniküre — perfekte Nägel',           sortOrder: 0 },
    { alt: 'Nail Art Design',                          sortOrder: 1 },
    { alt: 'Klassische Pediküre',                      sortOrder: 2 },
    { alt: 'Modellage — Nagelverlängerung mit Gel',    sortOrder: 3 },
    { alt: 'Lumière Nails Berlin — Innenraum',         sortOrder: 4 },
  ];

  for (const g of galleryData) {
    await db.galleryImage.create({ data: { storeId: store.id, url: '', ...g } });
  }
  console.log('✅ Gallery:', galleryData.length);

  // ============ HERO CONFIG ============
  await db.heroConfig.upsert({
    where: { storeId: store.id },
    update: {
      title: 'Ihre Nägel. Ihr Stil.',
      subtitle: 'Premium Maniküre, Gel-Nägel und Nail Art in Berlin.',
      ctaText: 'Termin buchen',
    },
    create: {
      storeId: store.id,
      title: 'Ihre Nägel. Ihr Stil.',
      subtitle: 'Premium Maniküre, Gel-Nägel und Nail Art in Berlin.',
      ctaText: 'Termin buchen',
    },
  });
  console.log('✅ HeroConfig');

  // ============ COURSE ============
  const course = await db.digitalProduct.upsert({
    where: { storeId_slug: { storeId: store.id, slug: 'gel-manikure-kurs' } },
    update: { price: 149 },
    create: {
      storeId: store.id,
      slug: 'gel-manikure-kurs',
      type: 'COURSE',
      price: 149,
      currency: 'EUR',
      active: true,
    },
  });

  await db.digitalProductTranslation.upsert({
    where: { productId_locale: { productId: course.id, locale: 'de' } },
    update: { name: 'Gel-Maniküre Kurs', description: 'Lernen Sie professionelle Gel-Techniken von unseren Meisterinnen. Ideal für Einsteiger und Fortgeschrittene.' },
    create: {
      productId: course.id,
      locale: 'de',
      name: 'Gel-Maniküre Kurs',
      description: 'Lernen Sie professionelle Gel-Techniken von unseren Meisterinnen. Ideal für Einsteiger und Fortgeschrittene.',
    },
  });

  await db.digitalProductTranslation.upsert({
    where: { productId_locale: { productId: course.id, locale: 'en' } },
    update: { name: 'Gel Nail Course — Beginners', description: 'Learn professional gel techniques from our nail artists. Perfect for beginners and intermediate levels.' },
    create: {
      productId: course.id,
      locale: 'en',
      name: 'Gel Nail Course — Beginners',
      description: 'Learn professional gel techniques from our nail artists. Perfect for beginners and intermediate levels.',
    },
  });
  console.log('✅ Course:', course.slug);

  // ============ TESTIMONIALS ============
  await db.testimonial.deleteMany({ where: { storeId: store.id } });
  const testimonialData = [
    {
      authorName: 'Lena Fischer',
      rating: 5,
      text: 'Absolut traumhafte Gel-Nägel! Lena hat sich so viel Zeit genommen und das Ergebnis hält jetzt schon 4 Wochen perfekt. Ich komme definitiv wieder.',
      status: 'APPROVED' as const,
      locale: 'de',
      adminReply: 'Liebe Lena, vielen Dank für deine lieben Worte! Es freut uns sehr, dass du mit deinen Nägeln so zufrieden bist. Wir freuen uns auf deinen nächsten Besuch! 💅',
      adminReplyAt: new Date('2026-05-15T10:00:00Z'),
      createdAt: new Date('2026-05-14T14:00:00Z'),
    },
    {
      authorName: 'Sophie Wagner',
      rating: 5,
      text: 'Die Pediküre war ein Traum — meine Füße fühlen sich wie neu an. Das Studio ist wunderschön eingerichtet und das Team super freundlich. Sehr empfehlenswert!',
      status: 'APPROVED' as const,
      locale: 'de',
      adminReply: 'Liebe Sophie, das ist so schön zu hören! Danke, dass du dir die Zeit genommen hast, uns zu bewerten. Bis bald im Lumière Nails! 🌸',
      adminReplyAt: new Date('2026-05-22T09:00:00Z'),
      createdAt: new Date('2026-05-21T16:30:00Z'),
    },
    {
      authorName: 'Julia Becker',
      rating: 5,
      text: 'Ich war zum ersten Mal hier und bin begeistert. Modellage perfekt ausgeführt, sehr sauber gearbeitet. Die Atmosphäre ist entspannend und das Team professionell.',
      status: 'APPROVED' as const,
      locale: 'de',
      adminReply: 'Liebe Julia, herzlich willkommen bei Lumière Nails! Wir freuen uns, dass dein erster Besuch so schön war. Wir sehen uns bald wieder! ✨',
      adminReplyAt: new Date('2026-06-02T11:00:00Z'),
      createdAt: new Date('2026-06-01T13:00:00Z'),
    },
    {
      authorName: 'Marie Hofmann',
      rating: 5,
      text: 'Nail Art von Kristina ist unglaublich — genau nach meinen Wünschen, schnell und präzise. Das Studio hat eine tolle Atmosphäre. Ich empfehle es unbedingt weiter!',
      status: 'APPROVED' as const,
      locale: 'de',
      adminReply: 'Liebe Marie, wir freuen uns so sehr über dein Feedback! Bis zum nächsten Mal! 💖',
      adminReplyAt: new Date('2026-06-10T08:30:00Z'),
      createdAt: new Date('2026-06-09T17:00:00Z'),
    },
  ];

  for (const t of testimonialData) {
    await db.testimonial.create({ data: { storeId: store.id, ...t } });
  }
  console.log('✅ Testimonials:', testimonialData.length);

  // ============ ADMIN USER ============
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@lumiere-nails.de';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'LumiereNails2026!';
  const passwordHash = await bcryptjs.hash(adminPassword, 10);

  await db.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash, storeId: store.id },
    create: {
      email: adminEmail,
      passwordHash,
      name: 'Admin',
      role: 'superadmin',
      storeId: store.id,
    },
  });
  console.log('✅ AdminUser:', adminEmail);

  console.log('\n🎉 Lumière Nails seed complete!');
  console.log(`   Store slug:  ${store.slug}`);
  console.log(`   Address:     Unter den Linden 1, 10117 Berlin`);
  console.log(`   Admin email: ${adminEmail}`);
  console.log(`   Admin pass:  ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    await pool.end();
  });
