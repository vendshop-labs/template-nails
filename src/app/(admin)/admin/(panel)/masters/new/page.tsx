'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const EMPTY = { name: '', role: '', bio: '', photo: '' };

export default function NewMasterPage() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) return;
    setSaving(true);
    setError('');

    const res = await fetch('/api/admin/masters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        role: form.role,
        bio: form.bio || undefined,
        photo: form.photo || undefined,
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

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>Nový majster</h1>
        <Link href="/admin/masters" className="btn-outline btn-sm">← Späť</Link>
      </div>

      <form onSubmit={submit} className="admin-masters__form">
        <div className="admin-services__form-grid">
          <div className="booking__field">
            <label>Meno *</label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ján Novák"
              required
            />
          </div>
          <div className="booking__field">
            <label>Pozícia *</label>
            <input
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              placeholder="Barber, Stylista..."
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
              placeholder="Krátky popis majstra..."
            />
          </div>
        </div>

        {error && (
          <p style={{ color: 'var(--color-error, #ef4444)', marginTop: '0.5rem' }}>{error}</p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button
            type="submit"
            className="btn-primary btn-sm"
            disabled={saving || !form.name.trim() || !form.role.trim()}
          >
            {saving ? 'Ukladá sa...' : 'Vytvoriť majstra'}
          </button>
          <Link href="/admin/masters" className="btn-outline btn-sm">Zrušiť</Link>
        </div>
      </form>
    </div>
  );
}
