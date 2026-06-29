type DayEntry = { open: string; close: string } | null;
type HoursMap = Record<string, DayEntry>;

const DAY_ORDER: Record<string, number> = {
  mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7,
};
const DAY_SHORT: Record<string, string> = {
  mon: 'Po', tue: 'Ut', wed: 'St', thu: 'Št', fri: 'Pi', sat: 'So', sun: 'Ne',
};

export function formatWorkingHoursShort(raw: unknown): string {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return '';

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
          ? `${DAY_SHORT[sorted[0]]}–${DAY_SHORT[sorted[sorted.length - 1]]}`
          : sorted.map((d) => DAY_SHORT[d] ?? d).join(', ');
      return `${dayStr} ${timeRange}`;
    })
    .join(' · ');
}
