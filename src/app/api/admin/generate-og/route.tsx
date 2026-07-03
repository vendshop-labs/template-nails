import { NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';
import { put } from '@vercel/blob';
import { db } from '@/lib/db';

const STORE_SLUG = process.env.STORE_SLUG ?? 'lumiere-nails';

// Fetch Inter font from Google (cached by Node.js module system)
let fontCache: ArrayBuffer | null = null;
async function getFont(): Promise<ArrayBuffer> {
  if (fontCache) return fontCache;
  const res = await fetch(
    'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff'
  );
  fontCache = await res.arrayBuffer();
  return fontCache;
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

export async function POST() {
  const steps: Record<string, unknown> = {};

  try {
    // Step 1: DB connection
    const store = await db.store.findUnique({
      where: { slug: STORE_SLUG },
      select: { name: true, city: true, description: true },
    });
    steps.db = store ? { ok: true, name: store.name } : { ok: false };
    if (!store) return NextResponse.json({ steps, error: 'store not found' }, { status: 404 });

    // Step 2: Font fetch
    let font: ArrayBuffer;
    try {
      const fontRes = await fetch(
        'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff'
      );
      steps.fontFetch = { status: fontRes.status, ok: fontRes.ok };
      font = await fontRes.arrayBuffer();
      steps.fontSize = font.byteLength;
    } catch (e) {
      return NextResponse.json({ steps, error: 'font fetch failed', detail: String(e) }, { status: 500 });
    }

    // Step 3: ImageResponse
    let imgBuffer: Buffer;
    try {
      const ir = new ImageResponse(
        (
          <div style={{ width: '1200px', height: '630px', background: '#fdf8f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '60px', color: '#b87c6f', fontFamily: 'Inter' }}>
              {store.name}
            </span>
          </div>
        ),
        { width: 1200, height: 630, fonts: [{ name: 'Inter', data: font, weight: 400 }] }
      );
      const ab = await ir.arrayBuffer();
      imgBuffer = Buffer.from(ab);
      steps.image = { ok: true, bytes: imgBuffer.length };
    } catch (e) {
      return NextResponse.json({ steps, error: 'ImageResponse failed', detail: String(e) }, { status: 500 });
    }

    // Step 4: Blob upload
    try {
      const blob = await put(`og/${STORE_SLUG}-og.png`, imgBuffer, {
        access: 'public',
        contentType: 'image/png',
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      steps.blob = { ok: true, url: blob.url };

      await db.store.update({ where: { slug: STORE_SLUG }, data: { ogImageUrl: blob.url } });
      steps.dbUpdate = { ok: true };

      return NextResponse.json({ ok: true, url: blob.url, steps });
    } catch (e) {
      return NextResponse.json({ steps, error: 'blob upload failed', detail: String(e) }, { status: 500 });
    }

  } catch (err) {
    return NextResponse.json({ steps, error: 'unexpected', detail: String(err) }, { status: 500 });
  }
}

// ── original full handler (disabled during diagnostics) ──────────────────────
async function _POST_FULL() {
  try {
    const store = await db.store.findUnique({
      where: { slug: STORE_SLUG },
      select: { name: true, description: true, city: true, phone: true },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const name  = truncate(store.name, 32);
    const desc  = truncate(store.description ?? 'Profesionálna starostlivosť o nechty', 60);
    const city  = store.city ?? '';
    const phone = store.phone ?? '';

    const font = await getFont();

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            background: 'linear-gradient(135deg, #fdf8f5 0%, #f5e6e3 100%)',
            display: 'flex',
            flexDirection: 'column',
            padding: '0',
            position: 'relative',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', right: '-40px', top: '25px',
            width: '580px', height: '580px', borderRadius: '50%',
            background: 'rgba(184,124,111,0.10)', display: 'flex',
          }} />
          <div style={{
            position: 'absolute', right: '80px', top: '-60px',
            width: '320px', height: '320px', borderRadius: '50%',
            background: 'rgba(184,124,111,0.07)', display: 'flex',
          }} />

          {/* Left accent bar */}
          <div style={{
            position: 'absolute', left: '80px', top: '160px',
            width: '5px', height: '310px', borderRadius: '3px',
            background: 'rgba(184,124,111,0.55)', display: 'flex',
          }} />

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '115px', paddingTop: '200px' }}>

            {/* Store name */}
            <div style={{
              fontSize: '76px',
              fontWeight: '400',
              color: '#2d1b1b',
              letterSpacing: '-1px',
              lineHeight: '1.1',
              display: 'flex',
            }}>
              {name}
            </div>

            {/* Rose-gold divider */}
            <div style={{
              width: '140px', height: '2px', borderRadius: '1px',
              background: 'rgba(184,124,111,0.45)',
              marginTop: '16px', marginBottom: '20px', display: 'flex',
            }} />

            {/* Description */}
            <div style={{
              fontSize: '26px', fontWeight: '300',
              color: '#5a3a3a', letterSpacing: '0.5px',
              display: 'flex',
            }}>
              {desc}
            </div>

            {/* City + Phone */}
            {(city || phone) && (
              <div style={{
                fontSize: '19px', color: '#8a6a6a',
                marginTop: '14px', display: 'flex', gap: '24px',
              }}>
                {city && <span>📍 {city}</span>}
                {phone && <span>{phone}</span>}
              </div>
            )}

            {/* Service pills */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '28px' }}>
              {['Manikúra', 'Pedikúra', 'Gélové nechty'].map((label) => (
                <div key={label} style={{
                  padding: '8px 20px',
                  borderRadius: '20px',
                  background: 'rgba(184,124,111,0.14)',
                  color: '#7a4a42',
                  fontSize: '14px',
                  display: 'flex',
                }}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom URL */}
          <div style={{
            position: 'absolute', bottom: '28px',
            left: 0, right: 0, display: 'flex', justifyContent: 'center',
            fontSize: '16px', color: 'rgba(184,124,111,0.6)',
            letterSpacing: '1px',
          }}>
            {STORE_SLUG}.vendshop.shop
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [{ name: 'Inter', data: font, weight: 400 }],
      }
    );

    // Convert PNG response to Buffer for Blob upload
    const arrayBuf = await imageResponse.arrayBuffer();
    const buffer   = Buffer.from(arrayBuf);

    const blob = await put(`og/${STORE_SLUG}-og.png`, buffer, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    await db.store.update({
      where: { slug: STORE_SLUG },
      data: { ogImageUrl: blob.url },
    });

    return NextResponse.json({ url: blob.url });

  } catch (err) {
    console.error('[generate-og]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
