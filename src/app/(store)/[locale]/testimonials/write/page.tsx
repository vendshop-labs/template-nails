import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import WriteTestimonialForm from './WriteTestimonialForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'testimonials' });
  return {
    title: `${t('writeTitle')} | Lumière Nails`,
    robots: { index: false, follow: false },
  };
}

export default async function WriteTestimonialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WriteTestimonialForm locale={locale} />;
}
