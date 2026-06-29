import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const STORE_SLUG = process.env.STORE_SLUG ?? 'lumiere-nails';

async function main() {
  const store = await prisma.store.findUnique({ where: { slug: STORE_SLUG } });
  if (!store) throw new Error(`Store "${STORE_SLUG}" not found`);

  // Find all testimonials with the broken English reply
  const broken = await prisma.testimonial.findMany({
    where: {
      storeId: store.id,
      adminReply: { contains: 'All The best' },
    },
  });

  if (broken.length === 0) {
    console.log('No broken replies found — already fixed or not yet in DB.');
    return;
  }

  for (const t of broken) {
    await prisma.testimonial.update({
      where: { id: t.id },
      data: {
        adminReply: 'Thank you so much for your kind words! We look forward to welcoming you again. 💅',
        adminReplyAt: new Date(),
      },
    });
    console.log(`✅ Fixed reply for testimonial ${t.id}`);
  }

  console.log(`Done — fixed ${broken.length} reply(s).`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
