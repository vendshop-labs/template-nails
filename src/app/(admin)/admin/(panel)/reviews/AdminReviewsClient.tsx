'use client';

import { useMemo, useState } from 'react';
import { useAdminLocale } from '@/hooks/useAdminLocale';
import { getAdminT } from '@/lib/admin-i18n';
import styles from './reviews.module.css';

type TestimonialStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface Testimonial {
  id: string;
  text: string;
  rating: number;
  locale: string | null;
  status: TestimonialStatus;
  adminReply: string | null;
  customerName: string;
  customerEmail: string;
  createdAt: string;
}

interface Counts {
  all: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface Aggregate {
  average: number;
  total: number;
  breakdown: { stars: number; count: number }[];
}

interface Props {
  initialTestimonials: Testimonial[];
  counts: Counts;
  aggregate: Aggregate;
}

type Filter = 'all' | TestimonialStatus;

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Stars({ value }: { value: number }) {
  return (
    <span className={styles.stars} aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= value ? '#f97316' : '#e5e7eb'} aria-hidden="true">
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.9 6.2 20.95l1.1-6.45-4.7-4.6 6.5-.95L12 2.5Z" />
        </svg>
      ))}
    </span>
  );
}

function CheckIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
}
function XIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>;
}
function ReplyIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M9 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6l-4 4v-4Z" /></svg>;
}
function TrashIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z" /></svg>;
}
function UserIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></svg>;
}

function formatDate(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

export default function AdminReviewsClient({ initialTestimonials, counts, aggregate }: Props) {
  const { locale } = useAdminLocale();
  const tr = getAdminT(locale);
  const dateLocale = ({ sk: 'sk-SK', en: 'en-US', de: 'de-DE', cs: 'cs-CZ', uk: 'uk-UA' } as Record<string, string>)[locale] ?? 'en-GB';
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [filter, setFilter] = useState<Filter>('all');
  const [replyOpen, setReplyOpen] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: tr.reviews.all, count: counts.all },
    { key: 'PENDING', label: tr.reviews.pending, count: counts.pending },
    { key: 'APPROVED', label: tr.reviews.approved, count: counts.approved },
    { key: 'REJECTED', label: tr.reviews.rejected, count: counts.rejected },
  ];

  const filtered = useMemo(
    () => (filter === 'all' ? testimonials : testimonials.filter((t) => t.status === filter)),
    [testimonials, filter],
  );

  const breakdownTotal = aggregate.breakdown.reduce((s, b) => s + b.count, 0);

  const updateTestimonial = async (id: string, data: Record<string, unknown>) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...updated } : t)),
        );
      }
    } catch (err) {
      console.error('[admin reviews update]', err);
    } finally {
      setUpdating(null);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm(tr.reviews.deleteConfirm)) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error('[admin reviews delete]', err);
    }
  };

  const openReply = (t: Testimonial) => {
    setReplyOpen(t.id);
    setReplyText(t.adminReply ?? '');
  };

  const sendReply = (id: string) => {
    updateTestimonial(id, { adminReply: replyText });
    setReplyOpen(null);
    setReplyText('');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.h1}>{tr.reviews.title}</h1>
          <div className={styles.filters}>
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`${styles.filter} ${filter === f.key ? styles.filterActive : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label} <span className={styles.filterCount}>({f.count})</span>
              </button>
            ))}
          </div>
        </div>

        {aggregate.total > 0 && (
          <div className={styles.summary}>
            <div className={styles.avg}>
              <span className={styles.avgNum}>{aggregate.average.toFixed(1)}</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#f97316" aria-hidden="true">
                <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.9 6.2 20.95l1.1-6.45-4.7-4.6 6.5-.95L12 2.5Z" />
              </svg>
            </div>
            <div className={styles.breakdown}>
              {aggregate.breakdown.map((b) => (
                <div key={b.stars} className={styles.bdRow}>
                  <span className={styles.bdLabel}>{b.stars}★</span>
                  <span className={styles.bdBar}>
                    <span
                      className={styles.bdFill}
                      style={{ width: `${breakdownTotal > 0 ? (b.count / breakdownTotal) * 100 : 0}%` }}
                    />
                  </span>
                  <span className={styles.bdCount}>{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.list}>
        {filtered.map((t) => (
          <article key={t.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.customerInfo}>
                <UserIcon />
                <div className={styles.customerMeta}>
                  <span className={styles.customerName}>{t.customerName}</span>
                  <span className={styles.customerEmail}>{t.customerEmail}</span>
                </div>
              </div>
              <div className={styles.topRight}>
                {t.locale && <span className={styles.locale}>{t.locale.toUpperCase()}</span>}
                <span className={styles.date}>{formatDate(t.createdAt, dateLocale)}</span>
              </div>
            </div>

            <div className={styles.cardMid}>
              <Stars value={t.rating} />
              <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
              {t.adminReply && (
                <div className={styles.existingReply}>
                  <span className={styles.replyLabel}>{tr.reviews.ownerReplyLabel}</span>
                  {t.adminReply}
                </div>
              )}
            </div>

            <div className={styles.cardBottom}>
              <span className={`${styles.statusBadge} ${styles[t.status.toLowerCase()]}`}>
                {t.status === 'APPROVED' ? tr.reviews.approved : t.status === 'PENDING' ? tr.reviews.pending : tr.reviews.rejected}
              </span>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.publish}
                  onClick={() => updateTestimonial(t.id, { status: 'APPROVED' })}
                  disabled={t.status === 'APPROVED' || updating === t.id}
                >
                  <CheckIcon /> {tr.reviews.approve}
                </button>
                <button
                  type="button"
                  className={styles.reject}
                  onClick={() => updateTestimonial(t.id, { status: 'REJECTED' })}
                  disabled={t.status === 'REJECTED' || updating === t.id}
                >
                  <XIcon /> {tr.reviews.reject}
                </button>
                <button type="button" className={styles.reply} onClick={() => openReply(t)}>
                  <ReplyIcon /> {tr.reviews.reply}
                </button>
                <button type="button" className={styles.delete} onClick={() => deleteTestimonial(t.id)}>
                  <TrashIcon /> {tr.common.delete}
                </button>
              </div>
            </div>

            {replyOpen === t.id && (
              <div className={styles.replyBox}>
                <textarea
                  className={styles.textarea}
                  rows={3}
                  placeholder={tr.reviews.yourReply}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className={styles.replyActions}>
                  <button type="button" className={styles.replyCancel} onClick={() => setReplyOpen(null)}>
                    {tr.common.cancel}
                  </button>
                  <button type="button" className={styles.replySend} onClick={() => sendReply(t.id)}>
                    {tr.reviews.saveReply}
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
        {filtered.length === 0 && <div className={styles.empty}>{tr.common.noData}</div>}
      </div>
    </div>
  );
}
