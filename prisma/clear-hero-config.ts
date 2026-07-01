import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const STORE_SLUG = process.env.STORE_SLUG ?? 'lumiere-nails';

async function main() {
  const store = await prisma.store.findUnique({ where: { slug: STORE_SLUG } });
  if (!store) {
    console.error(`Store "${STORE_SLUG}" not found.`);
    process.exit(1);
  }

  const result = await prisma.heroConfig.updateMany({
    where: { storeId: store.id },
    data: { title: '', subtitle: '', ctaText: '' },
  });

  console.log(`Cleared heroConfig for store "${STORE_SLUG}": ${result.count} row(s) updated.`);
  console.log('Hero section will now use i18n translations as fallback per locale.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
