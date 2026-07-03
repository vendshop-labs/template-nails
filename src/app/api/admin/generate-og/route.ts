import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { db } from '@/lib/db';

const STORE_SLUG = process.env.STORE_SLUG ?? 'lumiere-nails';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

export async function POST() {
  const store = await db.store.findUnique({
    where: { slug: STORE_SLUG },
    select: { id: true, name: true, description: true, city: true, phone: true, email: true },
  });

  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  const name  = escapeXml(truncate(store.name, 40));
  const city  = escapeXml(truncate(store.city ?? '', 60));
  const desc  = escapeXml(truncate(store.description ?? '', 80));
  const phone = escapeXml(store.phone ?? '');

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1a1008"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C9A347" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#C9A347" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="480" height="630" fill="url(#accent)"/>

  <rect x="80" y="60" width="60" height="4" fill="#C9A347" rx="2"/>
  <rect x="80" y="566" width="1040" height="1" fill="#C9A347" fill-opacity="0.3"/>

  <text x="80" y="240"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="80"
    font-weight="bold"
    fill="#C9A347"
    letter-spacing="-1">
    ${name}
  </text>

  ${city ? `<text x="80" y="310"
    font-family="Arial, Helvetica, sans-serif"
    font-size="32"
    fill="#C8C0B0"
    letter-spacing="3">
    ${city.toUpperCase()}
  </text>` : ''}

  ${desc ? `<text x="80" y="390"
    font-family="Arial, Helvetica, sans-serif"
    font-size="26"
    fill="#ffffff"
    fill-opacity="0.85">
    ${desc}
  </text>` : ''}

  ${phone ? `<text x="80" y="460"
    font-family="Arial, Helvetica, sans-serif"
    font-size="22"
    fill="#C9A347"
    fill-opacity="0.7">
    ${phone}
  </text>` : ''}

  <circle cx="1100" cy="315" r="200" fill="#C9A347" fill-opacity="0.03"/>
  <circle cx="1100" cy="315" r="140" fill="#C9A347" fill-opacity="0.03"/>

  <text x="80" y="600"
    font-family="Arial, Helvetica, sans-serif"
    font-size="18"
    fill="#666666"
    letter-spacing="2">
    NAIL STUDIO
  </text>
</svg>`;

  const svgBuffer = Buffer.from(svg);

  const jpegBuffer = await sharp(svgBuffer)
    .resize(1200, 630)
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  const blob = await put(`og/${STORE_SLUG}-og.jpg`, jpegBuffer, {
    access: 'public',
    contentType: 'image/jpeg',
    addRandomSuffix: false,
  });

  await db.store.update({
    where: { slug: STORE_SLUG },
    data: { ogImageUrl: blob.url },
  });

  return NextResponse.json({ url: blob.url });
}
