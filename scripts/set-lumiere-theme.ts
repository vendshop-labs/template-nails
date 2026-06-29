import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
};

async function main() {
  const result = await prisma.store.updateMany({
    where: { slug: 'lumiere-nails' },
    data: { themeConfig: LUMIERE_THEME as any },
  });
  console.log(`✅ Updated ${result.count} store(s) to Lumière Nails theme`);
}

main().finally(() => prisma.$disconnect());
