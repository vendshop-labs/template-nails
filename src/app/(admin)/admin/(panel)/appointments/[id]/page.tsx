'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminLocale } from '@/hooks/useAdminLocale';
import { getAdminT } from '@/lib/admin-i18n';
import StatusBadge from '@/components/ui/StatusBadge';
import type { AppointmentStatus } from '@/lib/types';

interface AppointmentDetail {
  id: string;
  guestName: string | null;
  guestPhone: string | null;
  guestEmail: string | null;
  date: string;
  timeSlot: string;
  duration: number;
  status: AppointmentStatus;
  note: string | null;
  internalNote: string | null;
  service: { nameKey: string; price: number; duration: number };
  master: { name: string; role: string } | null;
}

const STATUSES: AppointmentStatus[] = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'];

export default function AppointmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { locale } = useAdminLocale();
  const ta = getAdminT(locale);
  const dateLocale = ({ sk: 'sk-SK', en: 'en-US', de: 'de-DE', cs: 'cs-CZ', uk: 'uk-UA' } as Record<string, string>)[locale] ?? 'sk-SK';
  const STATUS_LABELS: Record<AppointmentStatus, string> = {
    PENDING:   ta.appointments.pending,
    CONFIRMED: ta.appointments.confirmed,
    CANCELLED: ta.appointments.cancelled,
    COMPLETED: ta.reservations.completed,
    NO_SHOW:   ta.reservations.noShow,
  };
  const [data, setData] = useState<AppointmentDetail | null>(null);
  const [internalNote, setInternalNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/appointments/${id}`)
      .then((r) => r.json())
      .then(({ appointment }: { appointment: AppointmentDetail }) => {
        setData(appointment);
        setInternalNote(appointment.internalNote ?? '');
      });
  }, [id]);

  async function updateStatus(status: AppointmentStatus) {
    setSaving(true);
    await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setSaving(false);
    router.refresh();
    setData((d) => d ? { ...d, status } : d);
  }

  async function saveNote() {
    setSaving(true);
    await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ internalNote }),
    });
    setSaving(false);
  }

  if (!data) return <p style={{ padding: '2rem' }}>{ta.common.loading}</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: 640 }}>
      <a href="/admin/appointments" style={{ color: 'var(--color-primary)', fontSize: '0.85rem' }}>
        {ta.appointments.backLink}
      </a>

      <h1 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        {ta.appointments.title} — {data.guestName ?? '—'}
      </h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => updateStatus(s)}
            disabled={saving || data.status === s}
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: data.status === s ? 'default' : 'pointer',
              opacity: data.status === s ? 1 : 0.6,
              background: data.status === s ? 'var(--color-primary)' : 'var(--color-surface)',
              color: data.status === s ? '#fff' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
        {[
          [ta.appointments.status,   <StatusBadge key="s" status={data.status} />],
          [ta.appointments.service,  data.service.nameKey],
          [ta.appointments.master,   data.master?.name ?? '—'],
          [ta.appointments.date,     new Date(data.date).toLocaleDateString(dateLocale)],
          [ta.appointments.time,     data.timeSlot],
          [ta.appointments.duration, `${data.duration} min`],
          [ta.appointments.phone,    data.guestPhone ?? '—'],
          [ta.appointments.email,    data.guestEmail ?? '—'],
          [ta.appointments.notes,    data.note ?? '—'],
        ].map(([label, value]) => (
          <tr key={String(label)} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <td style={{ padding: '0.5rem 0', color: 'var(--color-text-muted)', width: 120, fontSize: '0.85rem' }}>{label}</td>
            <td style={{ padding: '0.5rem 0' }}>{value}</td>
          </tr>
        ))}
      </table>

      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>
          {ta.appointments.internalNote}
        </label>
        <textarea
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
          className="form-textarea"
          style={{ width: '100%', marginBottom: '0.75rem' }}
        />
        <button
          onClick={saveNote}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? ta.common.saving : ta.appointments.saveNote}
        </button>
      </div>
    </div>
  );
}
