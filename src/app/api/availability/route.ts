import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { BUSINESS_START, BUSINESS_END, SLOT_INTERVAL } from '@/lib/constants';
import type { TimeSlot } from '@/lib/types';

function parseTime(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

function generateSlots(startMin: number, endMin: number, intervalMin: number): string[] {
  const slots: string[] = [];
  for (let t = startMin; t < endMin; t += intervalMin) {
    const h = Math.floor(t / 60).toString().padStart(2, '0');
    const m = (t % 60).toString().padStart(2, '0');
    slots.push(`${h}:${m}`);
  }
  return slots;
}

// GET /api/availability?masterId=xxx&date=2026-06-20&serviceId=xxx
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const masterId  = searchParams.get('masterId');
  const dateStr   = searchParams.get('date');
  const serviceId = searchParams.get('serviceId');

  if (!dateStr) {
    return NextResponse.json({ error: 'date required' }, { status: 400 });
  }

  const date = new Date(dateStr);
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  // Load service duration
  let duration = SLOT_INTERVAL;
  if (serviceId) {
    const service = await db.service.findUnique({ where: { id: serviceId } });
    if (service) duration = service.duration;
  }

  // Load existing appointments for that master/day
  const bookedWhere: Record<string, unknown> = {
    date: { gte: dayStart, lte: dayEnd },
    status: { notIn: ['CANCELLED'] },
  };
  if (masterId) bookedWhere.masterId = masterId;

  const booked = await db.appointment.findMany({
    where: bookedWhere,
    select: { timeSlot: true, duration: true },
  });

  const bookedSlots = new Set(booked.map((a) => a.timeSlot));

  const allSlots = generateSlots(parseTime(BUSINESS_START), parseTime(BUSINESS_END), SLOT_INTERVAL);

  const result: TimeSlot[] = allSlots.map((time) => ({
    time,
    available: !bookedSlots.has(time),
  }));

  return NextResponse.json({ slots: result, duration });
}
