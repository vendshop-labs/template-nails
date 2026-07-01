import Link from 'next/link';
import { useTranslations } from 'next-intl';
import TestimonialCard from '@/components/ui/TestimonialCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GoldDivider from '@/components/ui/GoldDivider';
import styles from './TestimonialsSection.module.css';

export interface TestimonialItem {
  id: string;
  name: string;
  content: string;
  rating: number;
  createdAt: string;
  adminReply?: string | null;
  adminReplyAt?: string | null;
}

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  locale?: string;
}

export default function TestimonialsSection({ testimonials, locale = 'sk' }: TestimonialsSectionProps) {
  const t = useTranslations('testimonials');
  return (
    <section id="recenzie" className="testimonials">
      <ScrollReveal direction="up" className="section-header">
        <p className="section-label">Recenzie</p>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">Recenzie od našich klientiek</p>
        <GoldDivider />
      </ScrollReveal>

      {testimonials.length === 0 ? (
        <ScrollReveal direction="up" className="testimonials__empty">
          <p className="testimonials__empty-text">{t('empty')} {t('beFirst')}</p>
        </ScrollReveal>
      ) : (
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} direction="up" delay={i * 120}>
              <TestimonialCard
                name={t.name}
                content={t.content}
                rating={t.rating}
                createdAt={t.createdAt}
                adminReply={t.adminReply}
                adminReplyAt={t.adminReplyAt}
              />
            </ScrollReveal>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <Link href={`/${locale}/testimonials`} className={styles.btnOutline}>
          {t('viewAll')} →
        </Link>
        <Link href={`/${locale}/testimonials/write`} className={styles.btnPrimary}>
          {t('writeReview')} →
        </Link>
      </div>
    </section>
  );
}
