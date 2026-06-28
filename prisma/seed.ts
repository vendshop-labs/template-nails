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

async function main() {
  console.log('🌸 Seeding Lumière Nails...');

  // ============ STORE ============
  const store = await db.store.upsert({
    where: { slug: 'lumiere-nails' },
    update: {
      name: 'Lumière Nails',
      phone: '+421 900 000 000',
      email: 'info@lumiere-nails.sk',
      address: 'Mierové námestie 1',
      city: 'Trenčín',
    },
    create: {
      name: 'Lumière Nails',
      slug: 'lumiere-nails',
      vertical: 'SERVICES',
      primaryMode: 'PHYSICAL',
      phone: '+421 900 000 000',
      email: 'info@lumiere-nails.sk',
      address: 'Mierové námestie 1',
      city: 'Trenčín',
      openingHours: JSON.stringify({
        mon: { open: '09:00', close: '18:00' },
        tue: { open: '09:00', close: '18:00' },
        wed: { open: '09:00', close: '18:00' },
        thu: { open: '09:00', close: '18:00' },
        fri: { open: '09:00', close: '18:00' },
        sat: { open: '09:00', close: '15:00' },
        sun: null,
      }),
      themeConfig: {
        colors: {
          bg:            '#fdf8f5',
          primary:       '#b87c6f',
          primaryDark:   '#9a6459',
          primaryLight:  '#f5e6e3',
          text:          '#2d1b1b',
          textSecondary: '#7a5c5c',
          textMuted:     '#b09090',
          border:        'rgba(184,124,111,0.15)',
          bgSubtle:      '#f9ede9',
          success:       '#16a34a',
          error:         '#ef4444',
          contrast:      '#ffffff',
          overlay:       '#2d1b1b',
          overlayAlpha:  'rgba(45,27,27,0.38)',
          headerBg:      'rgba(253,248,245,0.96)',
          bgDark:        '#f9ede9',
          warning:       '#fbbf24',
          successLight:  '#dcfce7',
          errorLight:    '#fef2f2',
          infoLight:     '#eff6ff',
        },
        layout: {
          heroType:     'split',
          cardStyle:    'border',
          navPosition:  'top',
          borderRadius: 'sharp',
        },
      },
    },
  });
  console.log('✅ Store:', store.slug);

  // ============ SERVICES ============
  const serviceData = [
    { slug: 'klasicka-manikura',       nameKey: 'Klasická manikúra',         price: 18, duration: 30, category: 'manicure' },
    { slug: 'gelova-manikura',         nameKey: 'Gélová manikúra',           price: 35, duration: 60, category: 'manicure' },
    { slug: 'gelova-manikura-dizajn',  nameKey: 'Gélová manikúra + dizajn',  price: 45, duration: 75, category: 'manicure' },
    { slug: 'pediura-klasicka',        nameKey: 'Pedikúra klasická',          price: 25, duration: 45, category: 'pedicure' },
    { slug: 'nechtova-modelaz',        nameKey: 'Nechtová modeláž (akryl)',  price: 55, duration: 90, category: 'nail-art' },
    { slug: 'nail-art',                nameKey: 'Nail art (na 2 nechty)',    price: 10, duration: 20, category: 'nail-art' },
  ];

  for (const s of serviceData) {
    await db.service.upsert({
      where: { storeId_slug: { storeId: store.id, slug: s.slug } },
      update: { price: s.price, duration: s.duration, category: s.category },
      create: { storeId: store.id, ...s },
    });
  }
  console.log('✅ Services:', serviceData.length);

  // ============ TECHNICIANS ============
  const masterData = [
    {
      id: `master-kristina-${store.id}`,
      name: 'Kristína Malá',
      role: 'Nail technician',
      photo: '/team/team-kristina.webp',
      sortOrder: 0,
    },
    {
      id: `master-monika-${store.id}`,
      name: 'Monika Horváthová',
      role: 'Nail technician',
      photo: '/team/team-monika.webp',
      sortOrder: 1,
    },
  ];

  for (const m of masterData) {
    await db.serviceMaster.upsert({
      where: { id: m.id },
      update: { name: m.name, role: m.role, photo: m.photo, sortOrder: m.sortOrder },
      create: { storeId: store.id, ...m },
    });
  }
  console.log('✅ Technicians:', masterData.length);

  // ============ GALLERY ============
  const galleryData = [
    { alt: 'Gélová manikúra', sortOrder: 0 },
    { alt: 'Nail Art design',  sortOrder: 1 },
    { alt: 'Pedikúra',         sortOrder: 2 },
  ];

  for (const g of galleryData) {
    const existing = await db.galleryImage.findFirst({
      where: { storeId: store.id, alt: g.alt },
    });
    if (!existing) {
      await db.galleryImage.create({
        data: {
          storeId: store.id,
          url: '/placeholder-gallery.jpg',
          alt: g.alt,
          sortOrder: g.sortOrder,
        },
      });
    }
  }
  console.log('✅ Gallery:', galleryData.length);

  // ============ HERO CONFIG ============
  await db.heroConfig.upsert({
    where: { storeId: store.id },
    update: {
      title: 'Vaše nechty. Váš štýl.',
      subtitle: 'Prémiová manikúra, gélové nechty a nail art v Trenčíne.',
      ctaText: 'Rezervovať termín',
    },
    create: {
      storeId: store.id,
      title: 'Vaše nechty. Váš štýl.',
      subtitle: 'Prémiová manikúra, gélové nechty a nail art v Trenčíne.',
      ctaText: 'Rezervovať termín',
    },
  });
  console.log('✅ HeroConfig');

  // ============ COURSE ============
  const course = await db.digitalProduct.upsert({
    where: { storeId_slug: { storeId: store.id, slug: 'kurz-gelovej-manikury' } },
    update: {},
    create: {
      storeId: store.id,
      slug: 'kurz-gelovej-manikury',
      type: 'COURSE',
      price: 149,
      currency: 'EUR',
      active: true,
    },
  });

  await db.digitalProductTranslation.upsert({
    where: { productId_locale: { productId: course.id, locale: 'sk' } },
    update: {},
    create: {
      productId: course.id,
      locale: 'sk',
      name: 'Kurz gélovej manikúry — začiatočníci',
      description: 'Naučte sa profesionálnu gélovú manikúru od základov. 8-hodinový kurz.',
    },
  });

  await db.digitalProductTranslation.upsert({
    where: { productId_locale: { productId: course.id, locale: 'en' } },
    update: {},
    create: {
      productId: course.id,
      locale: 'en',
      name: 'Gel Nail Course — Beginners',
      description: 'Learn professional gel manicure from scratch. 8-hour intensive course.',
    },
  });
  console.log('✅ Course:', course.slug);

  // ============ ADMIN USER ============
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@lumiere-nails.sk';
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
  console.log(`   Address:     Mierové námestie 1, 911 01 Trenčín`);
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
