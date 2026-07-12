'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './write.module.css';

interface Props {
  locale: string;
}

export default function WriteTestimonialForm({ locale }: Props) {
  const t = useTranslations('testimonials');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (submitted) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successIcon} aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h1 className={styles.title}>{t('successTitle')}</h1>
          <p className={styles.subtitle}>{t('successPending')}</p>
          <Link href={`/${locale}/testimonials`} className={styles.btn}>
            {t('viewAll')}
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 2) {
      setError(t('errName'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('errEmail'));
      return;
    }
    if (text.trim().length < 20) {
      setError(t('errText'));
      return;
    }
    if (!consent) {
      setError(t('errConsent'));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/testimonials/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), rating, text: text.trim(), locale }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? t('errSend'));
      } else {
        setSubmitted(true);
      }
    } catch {
      setError(t('errNetwork'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page} style={{ paddingTop: '5rem' }}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('writeTitle')}</h1>
        <p className={styles.subtitle}>{t('writeSubtitle', { store: 'Lumière Nails' })}</p>

        <form className={styles.form} onSubmit={handleSubmit}>

          <label className={styles.label}>
            <span className={styles.labelText}>{t('nameLabel')} *</span>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              required
              minLength={2}
              maxLength={80}
            />
          </label>

          <label className={styles.label}>
            <span className={styles.labelText}>{t('emailLabel')} *</span>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              required
            />
          </label>

          <div className={styles.ratingGroup}>
            <span className={styles.ratingLabel}>{t('ratingLabel')} *</span>
            <div className={styles.starPicker}>
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  className={(hoverRating || rating) >= v ? styles.starActive : styles.starInactive}
                  onMouseEnter={() => setHoverRating(v)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(v)}
                  aria-label={`${v} ★`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <label className={styles.label}>
            <span className={styles.labelText}>{t('textLabel')} *</span>
            <textarea
              className={styles.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('textPlaceholder')}
              minLength={20}
              maxLength={2000}
              rows={5}
              required
            />
            <span className={styles.charCount}>{text.length} / 2000</span>
          </label>

          <label className={styles.consentLabel}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <span>{t('consent')}</span>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.btn} disabled={submitting || !consent}>
            {submitting ? t('submitting') : t('submitBtn')}
          </button>
        </form>

        <Link href={`/${locale}/testimonials`} className={styles.backLink}>
          ← {t('backToReviews')}
        </Link>
      </div>
    </main>
  );
}
