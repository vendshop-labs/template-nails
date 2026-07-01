const DAY_OFFSETS: Record<string, number> = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

// January 7, 2024 = Sunday → offset 0
const BASE_DATE = new Date(2024, 0, 7);

export function getDayName(
  locale: string,
  dayKey: string,
  form: 'long' | 'short' = 'long',
): string {
  const offset = DAY_OFFSETS[dayKey] ?? 0;
  const date = new Date(BASE_DATE);
  date.setDate(BASE_DATE.getDate() + offset);
  return new Intl.DateTimeFormat(locale, { weekday: form }).format(date);
}
