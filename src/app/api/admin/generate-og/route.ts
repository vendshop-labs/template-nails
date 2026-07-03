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
  try {
    const store = await db.store.findUnique({
      where: { slug: STORE_SLUG },
      select: { id: true, name: true, description: true, city: true, phone: true, email: true },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const name  = escapeXml(truncate(store.name, 36));
    const city  = escapeXml(truncate(store.city ?? '', 50));
    const desc  = escapeXml(truncate(store.description ?? 'Profesionálna starostlivosť o nechty', 72));
    const phone = escapeXml(store.phone ?? '');

    // Lumière Nails brand: cream + rose-gold theme
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdf8f5"/>
      <stop offset="100%" stop-color="#f5e6e3"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles right -->
  <circle cx="960" cy="315" r="290" fill="#b87c6f" fill-opacity="0.10"/>
  <circle cx="1080" cy="160" r="160" fill="#b87c6f" fill-opacity="0.07"/>
  <circle cx="850"  cy="510" r="130" fill="#b87c6f" fill-opacity="0.06"/>

  <!-- Left accent bar -->
  <rect x="80" y="160" width="5" height="310" rx="3" fill="#b87c6f" fill-opacity="0.55"/>

  <!-- Store name -->
  <text x="115" y="290"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="76"
    font-weight="400"
    letter-spacing="2"
    fill="#2d1b1b">
    ${name}
  </text>

  <!-- Divider -->
  <rect x="115" y="315" width="140" height="2" rx="1" fill="#b87c6f" fill-opacity="0.45"/>

  <!-- Description -->
  <text x="115" y="360"
    font-family="Arial, Helvetica, sans-serif"
    font-size="26"
    font-weight="300"
    letter-spacing="0.5"
    fill="#5a3a3a">
    ${desc}
  </text>

  <!-- City -->
  ${city ? `<text x="115" y="402"
    font-family="Arial, Helvetica, sans-serif"
    font-size="20"
    fill="#8a6a6a"
    letter-spacing="0.5">
    &#128205; ${city}
  </text>` : ''}

  <!-- Phone -->
  ${phone ? `<text x="115" y="440"
    font-family="Arial, Helvetica, sans-serif"
    font-size="19"
    fill="#8a6a6a">
    ${phone}
  </text>` : ''}

  <!-- Service pills -->
  <rect x="115" y="470" width="148" height="34" rx="17" fill="#b87c6f" fill-opacity="0.14"/>
  <text x="189" y="493" font-family="Arial, sans-serif" font-size="14"
    fill="#7a4a42" text-anchor="middle">Manik&#250;ra</text>

  <rect x="275" y="470" width="148" height="34" rx="17" fill="#b87c6f" fill-opacity="0.14"/>
  <text x="349" y="493" font-family="Arial, sans-serif" font-size="14"
    fill="#7a4a42" text-anchor="middle">Pedik&#250;ra</text>

  <rect x="435" y="470" width="168" height="34" rx="17" fill="#b87c6f" fill-opacity="0.14"/>
  <text x="519" y="493" font-family="Arial, sans-serif" font-size="14"
    fill="#7a4a42" text-anchor="middle">G&#233;lov&#233; nechty</text>

  <!-- Bottom URL -->
  <text x="600" y="600"
    font-family="Arial, sans-serif"
    font-size="17"
    fill="#b87c6f"
    fill-opacity="0.6"
    text-anchor="middle"
    letter-spacing="1">
    ${STORE_SLUG}.vendshop.shop
  </text>
</svg>`;

    const svgBuffer = Buffer.from(svg);

    const jpegBuffer = await sharp(svgBuffer)
      .resize(1200, 630)
      .jpeg({ quality: 90 })   // no mozjpeg — not supported on Vercel
      .toBuffer();

    const blob = await put(`og/${STORE_SLUG}-og.jpg`, jpegBuffer, {
      access: 'public',
      contentType: 'image/jpeg',
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    await db.store.update({
      where: { slug: STORE_SLUG },
      data: { ogImageUrl: blob.url },
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error('[generate-og] error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
