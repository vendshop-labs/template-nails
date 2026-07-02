import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { cookies } from 'next/headers';
import { verifyAdminToken, getAdminSecret, ADMIN_COOKIE } from '@/lib/adminAuth';
import {
  processImageVariants,
  validateImageFile,
  GALLERY_VARIANTS,
  PRODUCT_VARIANTS,
  HERO_VARIANTS,
  ABOUT_VARIANTS,
  AVATAR_VARIANTS,
  type ImageVariant,
} from '@/lib/image-utils';

const STORE_SLUG = process.env.STORE_SLUG ?? 'kate-barber';

const PURPOSE_VARIANTS: Record<string, ImageVariant[]> = {
  gallery: GALLERY_VARIANTS,
  product: PRODUCT_VARIANTS,
};

const TYPE_VARIANTS: Record<string, ImageVariant[]> = {
  hero:    HERO_VARIANTS,
  about:   ABOUT_VARIANTS,
  gallery: GALLERY_VARIANTS,
  avatar:  AVATAR_VARIANTS,
  general: GALLERY_VARIANTS,
};

async function saveToBlob(
  processed: Array<{ suffix: string; processed: { buffer: Buffer; contentType: string } }>,
  purpose: string,
  baseName: string,
  timestamp: number,
): Promise<Record<string, string>> {
  const urls: Record<string, string> = {};
  for (const { suffix, processed: img } of processed) {
    const blobPath = `${purpose}/${STORE_SLUG}/${timestamp}-${baseName}${suffix}.webp`;
    const blob = await put(blobPath, img.buffer, {
      access: 'public',
      contentType: img.contentType,
    });
    urls[suffix] = blob.url;
  }
  return urls;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminToken(token, getAdminSecret()))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const purpose = (formData.get('purpose') as string) ?? 'gallery';
  const type = (formData.get('type') as string) ?? '';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const validationError = validateImageFile(file);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const variants = TYPE_VARIANTS[type] ?? PURPOSE_VARIANTS[purpose] ?? GALLERY_VARIANTS;

  try {
    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const processed = await processImageVariants(inputBuffer, variants);

    const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const timestamp = Date.now();

    const urls = await saveToBlob(processed, purpose, baseName, timestamp);

    return NextResponse.json({
      urls,
      url: urls[variants[0].suffix],
      thumbnailUrl: urls[variants.at(-1)!.suffix],
      storage: 'blob',
    });
  } catch (error) {
    console.error('[admin upload] FULL ERROR:', {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : 'unknown',
      env_blob_token_set: !!process.env.BLOB_READ_WRITE_TOKEN,
      env_blob_token_prefix: process.env.BLOB_READ_WRITE_TOKEN?.slice(0, 20) ?? 'NOT SET',
      store_slug: process.env.STORE_SLUG ?? 'NOT SET (fallback: kate-barber)',
    });
    return NextResponse.json({
      error: 'Upload processing failed',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
