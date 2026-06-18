import { STATIC_TESTIMONIALS } from '@/lib/constants';
import { features } from '@/lib/features';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GoldDivider from '@/components/ui/GoldDivider';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="testimonial-stars" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? 'var(--color-primary)' : 'var(--color-border)'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  if (features.reviews === 'dynamic') {
    return null;
  }

  return (
    <section id="reviews" className="section">
      <ScrollReveal className="section-header">
        <p className="section-label">Client reviews</p>
        <h2 className="section-title">What People Say</h2>
        <GoldDivider />
      </ScrollReveal>

      <div className="testimonials-grid">
        {STATIC_TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.id} direction="up" delay={i * 80}>
            <div className="testimonial-card">
              <Stars rating={t.rating} />
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <p className="testimonial-author">{t.name}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
