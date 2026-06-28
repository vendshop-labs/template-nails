import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { setRequestLocale } from 'next-intl/server';
import TestimonialCard from '@/components/ui/TestimonialCard';
import GoldDivider from '@/components/ui/GoldDivider';

const STORE_SLUG = process.env.STORE_SLUG ?? 'lumiere-nails';

export const metadata: Metadata = {
  title: 'Recenzie | Lumière Nails',
  description: 'Prečítajte si recenzie spokojných klientiek Lumière Nails štúdia v Trenčíne.',
  robots: { index: true, follow: true },
};

export const revalidate = 60;

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const store = await db.store.findUnique({ where: { slug: STORE_SLUG } });
  const testimonials = store
    ? await db.testimonial.findMany({
        where: { storeId: store.id, status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
        include: { customer: { select: { name: true } } },
      })
    : [];

  const avgRating = testimonials.length
    ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
    : null;

  return (
    <main style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      <section className="testimonials-page__section">

        <div className="testimonials-list__header">
          <div>
            <p className="section-label">Recenzie</p>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--color-text)', marginTop: '0.25rem' }}>
              Čo hovoria naše klientky
            </h1>
            <GoldDivider />
            {avgRating && (
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                ⭐ {avgRating} · {testimonials.length} spokojných klientiek
              </p>
            )}
          </div>
          <Link href={`/${locale}/testimonials/write`} className="btn-primary">
            Napísať recenziu →
          </Link>
        </div>

        {testimonials.length > 0 ? (
          <div className="testimonials-page__grid">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                name={(t as { authorName?: string | null }).authorName ?? t.customer?.name ?? 'Klient'}
                content={t.text}
                rating={t.rating}
                createdAt={t.createdAt.toISOString()}
                adminReply={t.adminReply}
                adminReplyAt={t.adminReplyAt?.toISOString() ?? null}
              />
            ))}
          </div>
        ) : (
          <div className="testimonials-page__empty">
            <p style={{ color: 'var(--color-text-muted)' }}>Zatiaľ žiadne recenzie.</p>
            <Link href={`/${locale}/testimonials/write`} className="btn-outline" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Buďte prvá!
            </Link>
          </div>
        )}

      </section>
    </main>
  );
}
