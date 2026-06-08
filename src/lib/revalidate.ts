import { revalidatePath } from 'next/cache';

const LOCALES = ['en', 'de', 'sk', 'cs', 'uk', 'ru'];

/**
 * Revalidate all storefront pages across all locales.
 * Needed because Vercel + next-intl may not revalidate locale-prefixed
 * routes when only '/' is revalidated.
 */
export function revalidateStorefront() {
  revalidatePath('/', 'layout');
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}`);
  }
}

/**
 * Revalidate catalog + all storefront pages (after price or product changes).
 */
export function revalidateCatalog() {
  revalidateStorefront();
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/catalog`);
  }
}
