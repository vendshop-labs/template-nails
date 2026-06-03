import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const STORE_SLUG = process.env.STORE_SLUG ?? 'electromarket';

// GET /api/tables?date=2026-06-15&time=19:00
export async function GET(request: Request) {
  try {
    const store = await db.store.findUnique({ where: { slug: STORE_SLUG } });
    if (!store || store.vertical !== 'RESTAURANT') {
      return NextResponse.json({ tables: [] });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    const tables = await db.restaurantTable.findMany({
      where: { storeId: store.id, active: true },
      orderBy: [{ zone: 'asc' }, { number: 'asc' }],
    });

    let reservedTableIds: string[] = [];
    if (date && time) {
      const reservationDate = new Date(date);
      reservationDate.setHours(0, 0, 0, 0);
      const reservations = await db.reservation.findMany({
        where: {
          storeId: store.id,
          date: reservationDate,
          time,
          status: { in: ['PENDING', 'CONFIRMED'] },
          tableId: { not: null },
        },
        select: { tableId: true },
      });
      reservedTableIds = reservations.map((r) => r.tableId!);
    }

    const tablesWithStatus = tables.map((t) => ({
      id: t.id,
      number: t.number,
      seats: t.seats,
      zone: t.zone,
      x: t.x,
      y: t.y,
      type: t.type,
      status: reservedTableIds.includes(t.id) ? 'occupied' : 'available',
    }));

    return NextResponse.json({ tables: tablesWithStatus });
  } catch (error) {
    console.error('[GET /api/tables]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
