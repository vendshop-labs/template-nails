import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import WriteTestimonialForm from './WriteTestimonialForm';

export const metadata: Metadata = {
  title: 'Napísať recenziu | Lumière Nails',
  robots: { index: false, follow: false },
};

export default async function WriteTestimonialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WriteTestimonialForm locale={locale} />;
}
