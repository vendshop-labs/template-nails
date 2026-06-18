'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Master {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  photo?: string | null;
  active: boolean;
}

export default function EditMasterPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState({ name: '', role: '', bio: '', photo: '' });
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/masters')
      .then((r) => r.json() as Promise<Master[]>)
      .then((masters) => {
        const m = masters.find((x) => x.id === id);
        if (m) {
          setForm({ name: m.name, role: m.role, bio: m.bio ?? '', photo: m.photo ?? '' });
          setActive(m.active);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) return;
    setSaving(true);
    setError('');

    const res = await fetch(`/api/admin/masters/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        role: form.role,
        bio: form.bio || null,
        photo: form.photo || null,
        active,
      }),
    });

    if (res.ok) {
      router.push('/admin/masters');
    } else {
      const data = await res.json() as { error?: string };
      setError(data.error ?? 'Chyba pri ukladaní');
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <p style={{ color: 'var(--color-text-muted)', padding: '2rem' }}>Načítavam...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>Upraviť majstra</h1>
        <Link href="/admin/masters" className="btn-outline btn-sm">← Späť</Link>
      </div>

      <form onSubmit={submit} className="admin-masters__form">
        <div className="admin-services__form-grid">
          <div className="booking__field">
            <label>Meno *</label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>
          <div className="booking__field">
            <label>Pozícia *</label>
            <input
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              required
            />
          </div>
          <div className="booking__field" style={{ gridColumn: '1 / -1' }}>
            <label>Foto URL</label>
            <input
              type="url"
              value={form.photo}
              onChange={(e) => setForm((p) => ({ ...p, photo: e.target.value }))}
              placeholder="https://..."
            />
          </div>
          <div className="booking__field" style={{ gridColumn: '1 / -1' }}>
            <label>Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            />
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <span style={{ color: 'var(--color-text-secondary)' }}>Aktívny (viditeľný na webe)</span>
        </label>

        {error && (
          <p style={{ color: 'var(--color-error, #ef4444)', marginTop: '0.5rem' }}>{error}</p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button
            type="submit"
            className="btn-primary btn-sm"
            disabled={saving || !form.name.trim() || !form.role.trim()}
          >
            {saving ? 'Ukladá sa...' : 'Uložiť zmeny'}
          </button>
          <Link href="/admin/masters" className="btn-outline btn-sm">Zrušiť</Link>
        </div>
      </form>
    </div>
  );
}
