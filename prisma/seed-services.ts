import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const store = await prisma.store.upsert({
    where: { slug: 'kate-barber' },
    create: {
      name: 'Kate Barber Studio',
      slug: 'kate-barber',
      vertical: 'SERVICES',
      primaryMode: 'PHYSICAL',
      address: 'Palackého 12',
      city: 'Trenčín',
      phone: '+421900123456',
      email: 'info@katebarber.sk',
      openingHours: JSON.stringify({
        mon: { open: '09:00', close: '18:00' },
        tue: { open: '09:00', close: '18:00' },
        wed: { open: '09:00', close: '18:00' },
        thu: { open: '09:00', close: '18:00' },
        fri: { open: '09:00', close: '18:00' },
        sat: { open: '09:00', close: '14:00' },
        sun: null,
      }),
    },
    update: {},
  });

  console.log(`Store: ${store.name} (${store.id})`);

  // Masters
  const masterData = [
    { name: 'Kate',   role: 'Senior Barber', photo: '/team/team-kate.webp',   sortOrder: 0 },
    { name: 'Lucia',  role: 'Hair Stylist',  photo: '/team/team-lucia.webp',  sortOrder: 1 },
    { name: 'Martin', role: 'Beard Master',  photo: '/team/team-martin.webp', sortOrder: 2 },
  ];

  for (const m of masterData) {
    await prisma.serviceMaster.upsert({
      where: { id: `master-${m.name.toLowerCase()}-${store.id}` },
      create: { id: `master-${m.name.toLowerCase()}-${store.id}`, storeId: store.id, ...m },
      update: m,
    });
  }
  console.log('Masters seeded');

  // Services
  const serviceData = [
    { slug: 'haircut',    nameKey: 'services.haircut',   price: 15, duration: 45, category: 'Hair',    sortOrder: 0 },
    { slug: 'beard-trim', nameKey: 'services.beard',     price: 10, duration: 30, category: 'Beard',   sortOrder: 1 },
    { slug: 'hair-beard', nameKey: 'services.hairBeard', price: 22, duration: 60, category: 'Hair',    sortOrder: 2 },
    { slug: 'styling',    nameKey: 'services.styling',   price: 12, duration: 30, category: 'Styling', sortOrder: 3 },
  ];

  for (const s of serviceData) {
    await prisma.service.upsert({
      where: { storeId_slug: { storeId: store.id, slug: s.slug } },
      create: { storeId: store.id, ...s },
      update: s,
    });
  }
  console.log('Services seeded');

  console.log('Done!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
