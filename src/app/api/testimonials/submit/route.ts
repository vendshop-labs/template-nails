import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const STORE_SLUG = process.env.STORE_SLUG ?? 'lumiere-nails';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      rating?: number;
      text?: string;
      locale?: string;
    };

    const { name, email, rating, text, locale } = body;

    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json({ error: 'Zadajte meno (min. 2 znaky)' }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Zadajte platný email' }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json({ error: 'Vyberte hodnotenie 1–5' }, { status: 400 });
    }
    if (!text?.trim() || text.trim().length < 20) {
      return NextResponse.json({ error: 'Recenzia musí mať aspoň 20 znakov' }, { status: 400 });
    }
    if (text.trim().length > 2000) {
      return NextResponse.json({ error: 'Recenzia môže mať najviac 2000 znakov' }, { status: 400 });
    }

    const store = await db.store.findUnique({ where: { slug: STORE_SLUG } });
    if (!store) return NextResponse.json({ error: 'Store not found' }, { status: 404 });

    await db.testimonial.create({
      data: {
        storeId: store.id,
        authorName: name.trim(),
        authorEmail: email.trim().toLowerCase(),
        text: text.trim(),
        rating,
        locale: locale ?? 'sk',
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[testimonials/submit POST]', err);
    return NextResponse.json({ error: 'Chyba servera' }, { status: 500 });
  }
}
