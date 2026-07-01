type DayEntry = { open: string; close: string } | null;
type HoursMap = Record<string, DayEntry>;

const DAY_ORDER: Record<string, number> = {
  mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7,
};

const DAY_SHORT: Record<string, Record<string, string>> = {
  sk: { mon: 'Po', tue: 'Ut', wed: 'St', thu: 'Št', fri: 'Pi', sat: 'So', sun: 'Ne' },
  de: { mon: 'Mo', tue: 'Di', wed: 'Mi', thu: 'Do', fri: 'Fr', sat: 'Sa', sun: 'So' },
  en: { mon: 'Mo', tue: 'Tu', wed: 'We', thu: 'Th', fri: 'Fr', sat: 'Sa', sun: 'Su' },
  cs: { mon: 'Po', tue: 'Út', wed: 'St', thu: 'Čt', fri: 'Pá', sat: 'So', sun: 'Ne' },
  uk: { mon: 'Пн', tue: 'Вт', wed: 'Ср', thu: 'Чт', fri: 'Пт', sat: 'Сб', sun: 'Нд' },
  pl: { mon: 'Pn', tue: 'Wt', wed: 'Śr', thu: 'Cz', fri: 'Pt', sat: 'So', sun: 'Nd' },
  ru: { mon: 'Пн', tue: 'Вт', wed: 'Ср', thu: 'Чт', fri: 'Пт', sat: 'Сб', sun: 'Вс' },
};

export function formatWorkingHoursShort(raw: unknown, locale = 'sk'): string {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return '';

  const shorts = DAY_SHORT[locale] ?? DAY_SHORT['sk'];
  const hours = raw as HoursMap;
  const open = Object.entries(hours)
    .filter(([, v]) => v !== null)
    .sort(([a], [b]) => (DAY_ORDER[a] ?? 9) - (DAY_ORDER[b] ?? 9));

  if (open.length === 0) return '';

  const groups: Record<string, string[]> = {};
  for (const [day, entry] of open) {
    if (!entry) continue;
    const key = `${entry.open}–${entry.close}`;
    (groups[key] ??= []).push(day);
  }

  return Object.entries(groups)
    .map(([timeRange, days]) => {
      const sorted = [...days].sort((a, b) => (DAY_ORDER[a] ?? 9) - (DAY_ORDER[b] ?? 9));
      const orders = sorted.map((d) => DAY_ORDER[d] ?? 9);
      const isConsecutive =
        sorted.length > 1 && orders[orders.length - 1] - orders[0] === sorted.length - 1;
      const dayStr =
        isConsecutive && sorted.length > 2
          ? `${shorts[sorted[0]] ?? sorted[0]}–${shorts[sorted[sorted.length - 1]] ?? sorted[sorted.length - 1]}`
          : sorted.map((d) => shorts[d] ?? d).join(', ');
      return `${dayStr} ${timeRange}`;
    })
    .join(' · ');
}
