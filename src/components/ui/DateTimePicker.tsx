'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getDayName } from '@/lib/day-utils';

interface DateTimePickerProps {
  locale?: string;
  onSelect: (date: string, time: string) => void;
  onDayChange?: (date: string) => void;
  bookedSlots?: string[];
  loading?: boolean;
}

// Sunday=0, Monday=1, ... Saturday=6
const KEY_ORDER = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function generateTimeSlots(dayOfWeek: number): string[] {
  if (dayOfWeek === 0) return [];
  const closeHour  = dayOfWeek === 6 ? 14 : 18;
  const closeTotal = closeHour * 60;
  const SLOT       = 30;
  const slots: string[] = [];
  let t = 9 * 60;
  while (t + SLOT <= closeTotal) {
    slots.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`);
    t += SLOT;
  }
  return slots;
}

const SKELETON_COUNT = 10;

export default function DateTimePicker({
  locale = 'sk',
  onSelect,
  onDayChange,
  bookedSlots = [],
  loading = false,
}: DateTimePickerProps) {
  const t = useTranslations('booking');

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const [selectedDay, setSelectedDay]   = useState<Date>(days[0]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [timesKey, setTimesKey]         = useState(0);

  const timeSlots = generateTimeSlots(selectedDay.getDay());

  const isToday = selectedDay.toDateString() === days[0].toDateString();
  const nowHHMM = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Bratislava',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date()).trim();

  const handleDaySelect = (day: Date) => {
    if (day.getDay() === 0) return;
    setSelectedTime('');
    setSelectedDay(day);
    setTimesKey((k) => k + 1);
    onDayChange?.(day.toISOString().split('T')[0]);
  };

  const handleTimeSelect = (time: string) => {
    if (loading) return;
    if (bookedSlots.includes(time)) return;
    if (isToday && time <= nowHHMM) return;
    setSelectedTime(time);
    onSelect(selectedDay.toISOString().split('T')[0], time);
  };

  return (
    <div className="date-picker">
      <div className="date-picker__days">
        {days.map((day) => {
          const isSunday   = day.getDay() === 0;
          const isSelected = day.toDateString() === selectedDay.toDateString();
          let cls = 'date-picker__day';
          if (isSelected) cls += ' date-picker__day--selected';
          if (isSunday)   cls += ' date-picker__day--disabled';

          const dayKey = KEY_ORDER[day.getDay()];

          return (
            <button
              key={day.toDateString()}
              type="button"
              className={cls}
              onClick={() => handleDaySelect(day)}
            >
              <span className="date-picker__day-name">
                {getDayName(locale, dayKey, 'short')}
              </span>
              <span className="date-picker__day-number">{day.getDate()}</span>
              <span className="date-picker__day-month">
                {isSunday
                  ? t('closed')
                  : new Intl.DateTimeFormat(locale, { month: 'short' }).format(day)}
              </span>
            </button>
          );
        })}
      </div>

      <div key={timesKey} className="date-picker__times">
        {loading ? (
          Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div key={i} className="date-picker__skeleton" />
          ))
        ) : timeSlots.length === 0 ? (
          <p className="date-picker__closed">{t('closedFull')}</p>
        ) : (
          timeSlots.map((slot) => {
            const isBooked      = bookedSlots.includes(slot);
            const isPast        = isToday && slot <= nowHHMM;
            const isUnavailable = isBooked || isPast;
            const isSelected    = selectedTime === slot;
            let cls = 'date-picker__time';
            if (isSelected)    cls += ' date-picker__time--selected';
            if (isUnavailable) cls += ' date-picker__time--booked';

            return (
              <button
                key={slot}
                type="button"
                className={cls}
                onClick={() => handleTimeSelect(slot)}
                disabled={isUnavailable}
                title={isBooked ? t('slotBooked') : isPast ? t('slotPast') : undefined}
              >
                {slot}
                {isBooked && <span className="date-picker__time-booked-label">{t('slotBookedLabel')}</span>}
                {isPast && !isBooked && <span className="date-picker__time-booked-label">{t('slotPastLabel')}</span>}
              </button>
            );
          })
        )}
      </div>

      {selectedTime && !loading && (
        <p className="date-picker__selected-info">
          ✓ {getDayName(locale, KEY_ORDER[selectedDay.getDay()], 'short')} {selectedDay.getDate()}. {new Intl.DateTimeFormat(locale, { month: 'short' }).format(selectedDay)} {t('selectedInfo')} {selectedTime}
        </p>
      )}
    </div>
  );
}
