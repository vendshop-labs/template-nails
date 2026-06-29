import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  name: string;
  content: string;
  rating: number;
  createdAt: string | Date;
  adminReply?: string | null;
  adminReplyAt?: string | Date | null;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="testimonial-card__stars" aria-label={`${rating} z 5 hviezd`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i <= rating ? 'var(--color-gold, #C96030)' : 'none'}
          stroke="var(--color-gold, #C96030)"
          strokeWidth="1.5"
          style={{ opacity: i <= rating ? 1 : 0.3 }}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({
  name,
  content,
  rating,
  createdAt,
  adminReply,
  adminReplyAt,
}: TestimonialCardProps) {
  const date = new Date(createdAt).toLocaleDateString('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="testimonial-card">
      <div className="testimonial-card__header">
        <div className="testimonial-card__avatar">{initials}</div>
        <div>
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__date">{date}</p>
        </div>
        <Stars rating={rating} />
      </div>

      <p className="testimonial-card__content">&ldquo;{content}&rdquo;</p>

      {adminReply && (
        <div className={styles.ownerReply}>
          <span className={styles.ownerLabel}>✍️ Lumière Nails</span>
          <p className={styles.ownerText}>{adminReply}</p>
        </div>
      )}
    </div>
  );
}
