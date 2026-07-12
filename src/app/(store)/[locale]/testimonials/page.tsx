import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import TestimonialCard from '@/components/ui/TestimonialCard';
import GoldDivider from '@/components/ui/GoldDivider';
import styles from './testimonials.module.css';

const STORE_SLUG = process.env.STORE_SLUG ?? 'lumiere-nails';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'testimonials' });
  const store = await db.store.findUnique({ where: { slug: STORE_SLUG }, select: { name: true } });
  const storeName = store?.name ?? 'Lumière Nails';
  return {
    title: `${t('pageTitle')} | ${storeName}`,
    description: t('pageDescription'),
    robots: { index: true, follow: true },
  };
}

export const revalidate = 60;

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'testimonials' });

  const store = await db.store.findUnique({ where: { slug: STORE_SLUG } });
  const testimonials = store
    ? await db.testimonial.findMany({
        where: { storeId: store.id, status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
        include: { customer: { select: { name: true } } },
      })
    : [];

  const avgRating = testimonials.length
    ? (testimonials.reduce((s, item) => s + item.rating, 0) / testimonials.length).toFixed(1)
    : null;

  return (
    <main style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      <section className="testimonials-page__section">

        <Link href={`/${locale}`} className={styles.backBtn}>
          ← {t('backHome')}
        </Link>

        <div className="testimonials-list__header">
          <div>
            <p className="section-label">{t('label')}</p>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--color-text)', marginTop: '0.25rem' }}>
              {t('title')}
            </h1>
            <GoldDivider />
            {avgRating && (
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                ⭐ {avgRating} · {testimonials.length} {t('happyCustomers')}
              </p>
            )}
          </div>
          <Link href={`/${locale}/testimonials/write`} className="btn-primary">
            {t('writeReview')} →
          </Link>
        </div>

        {testimonials.length > 0 ? (
          <div className="testimonials-page__grid">
            {testimonials.map((item) => (
              <TestimonialCard
                key={item.id}
                name={(item as { authorName?: string | null }).authorName ?? item.customer?.name ?? t('beFirst')}
                content={item.text}
                rating={item.rating}
                createdAt={item.createdAt.toISOString()}
                adminReply={item.adminReply}
                adminReplyAt={item.adminReplyAt?.toISOString() ?? null}
              />
            ))}
          </div>
        ) : (
          <div className="testimonials-page__empty">
            <p style={{ color: 'var(--color-text-muted)' }}>{t('empty')}</p>
            <Link href={`/${locale}/testimonials/write`} className="btn-outline" style={{ marginTop: '1rem', display: 'inline-block' }}>
              {t('writeReview')}
            </Link>
          </div>
        )}

      </section>
    </main>
  );
}
