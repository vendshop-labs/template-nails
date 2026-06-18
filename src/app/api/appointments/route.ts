import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { BookingFormData } from '@/lib/types';

const STORE_SLUG = process.env.STORE_SLUG ?? 'kate-barber';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const date   = searchParams.get('date');

  const store = await db.store.findUnique({ where: { slug: STORE_SLUG } });
  if (!store) return NextResponse.json({ appointments: [] });

  const where: Record<string, unknown> = { storeId: store.id };
  if (status) where.status = status;
  if (date) {
    const d = new Date(date);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    where.date = { gte: d, lt: next };
  }

  const appointments = await db.appointment.findMany({
    where,
    orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
    include: {
      service: { select: { nameKey: true } },
      master:  { select: { name: true } },
    },
  });

  return NextResponse.json({ appointments });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingFormData;
    const store = await db.store.findUnique({ where: { slug: STORE_SLUG } });
    if (!store) return NextResponse.json({ error: 'Store not found' }, { status: 404 });

    const service = await db.service.findFirst({
      where: { id: body.serviceId, storeId: store.id },
    });
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    const appointment = await db.appointment.create({
      data: {
        storeId:    store.id,
        serviceId:  body.serviceId,
        masterId:   body.masterId ?? null,
        guestName:  body.guestName,
        guestPhone: body.guestPhone,
        guestEmail: body.guestEmail ?? null,
        note:       body.note ?? null,
        date:       new Date(body.date),
        timeSlot:   body.timeSlot,
        duration:   service.duration,
      },
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
