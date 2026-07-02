'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAdminLocale } from '@/hooks/useAdminLocale';
import { getAdminT } from '@/lib/admin-i18n';
import styles from './settings.module.css';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
  active: boolean;
}

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('purpose', 'gallery');
  formData.append('type', 'gallery');
  const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string; details?: string };
    throw new Error(err.details ?? err.error ?? 'Upload failed');
  }
  const { url } = (await res.json()) as { url: string };
  return url;
}

export default function GalleryTab() {
  const { locale } = useAdminLocale();
  const t = getAdminT(locale);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [galleryLayout, setGalleryLayout] = useState('grid-3');
  const [savingLayout, setSavingLayout] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const [galleryRes, storeRes] = await Promise.all([
        fetch('/api/admin/gallery'),
        fetch('/api/admin/store-info'),
      ]);
      const galleryData = (await galleryRes.json()) as { images?: GalleryImage[] };
      const storeData = (await storeRes.json()) as { store?: { galleryLayout?: string } };
      setImages(galleryData.images ?? []);
      if (storeData.store?.galleryLayout) setGalleryLayout(storeData.store.galleryLayout);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchImages(); }, [fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading('new');
    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, alt: file.name.replace(/\.[^.]+$/, '') }),
        });
      }
      await fetchImages();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Chyba pri nahrávaní');
    } finally {
      setUploading(null);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const moveItem = async (index: number, dir: 'up' | 'down') => {
    const swap = dir === 'up' ? index - 1 : index + 1;
    const newItems = [...images];
    [newItems[index], newItems[swap]] = [newItems[swap], newItems[index]];
    setImages(newItems);
    await Promise.all(
      newItems.map((item, i) =>
        fetch('/api/admin/gallery', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.id, sortOrder: i }),
        })
      )
    );
  };

  const toggleActive = async (img: GalleryImage) => {
    await fetch('/api/admin/gallery', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: img.id, active: !img.active }),
    });
    setImages((prev) => prev.map((i) => (i.id === img.id ? { ...i, active: !img.active } : i)));
  };

  const deleteImage = async (img: GalleryImage) => {
    if (!confirm(t.gallery.deleteConfirm)) return;
    await fetch(`/api/admin/gallery?id=${img.id}`, { method: 'DELETE' });
    setImages((prev) => prev.filter((i) => i.id !== img.id));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(id);
    try {
      const url = await uploadFile(file);
      await fetch('/api/admin/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, url }),
      });
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, url } : img)));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Chyba pri nahrávaní');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleLayoutChange = async (layout: string) => {
    setGalleryLayout(layout);
    setSavingLayout(true);
    try {
      await fetch('/api/admin/store-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ galleryLayout: layout }),
      });
    } finally {
      setSavingLayout(false);
    }
  };

  if (loading) return <p className={styles.muted}>{t.gallery.loading}</p>;

  return (
    <>
      {/* Layout selector */}
      <div className={styles.field} style={{ marginBottom: 16 }}>
        <span className={styles.label}>Rozloženie galérie {savingLayout && <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>— ukladám...</span>}</span>
        <select
          className={styles.input}
          value={galleryLayout}
          onChange={(e) => handleLayoutChange(e.target.value)}
        >
          <option value="grid-2">2 stĺpce</option>
          <option value="grid-3">3 stĺpce (predvolené)</option>
          <option value="grid-4">4 stĺpce</option>
          <option value="masonry">Masonry</option>
        </select>
      </div>

      {/* Upload toolbar */}
      <div className={styles.galleryToolbar}>
        <label className={styles.uploadLabel}>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} />
          {uploading === 'new' ? t.gallery.uploading : t.gallery.addPhoto}
        </label>
        <span className={styles.muted}>{images.length} fotografií</span>
      </div>

      {images.length === 0 ? (
        <p className={styles.muted}>{t.gallery.empty}</p>
      ) : (
        <div className={styles.galleryGrid}>
          {images.map((img, index) => (
            <div key={img.id} className={`${styles.galleryCard} ${!img.active ? styles.galleryCardInactive : ''}`}>
              <div className={styles.cardImageWrap}>
                {img.url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={img.url} alt={img.alt} />
                ) : (
                  <div className={styles.galleryPlaceholder}>
                    <span>📷</span>
                    <span className={styles.galleryPlaceholderTitle}>{img.alt}</span>
                  </div>
                )}
                <label className={styles.changePhotoOverlay}>
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.hiddenInput}
                    onChange={(e) => handleImageChange(e, img.id)}
                  />
                  <span>{uploading === img.id ? t.gallery.uploading : `📷 ${t.gallery.replace}`}</span>
                </label>
              </div>
              <div className={styles.galleryCardActions}>
                {/* Sort buttons */}
                <button
                  type="button"
                  className={`${styles.cardBtn} ${styles.cardBtnOutline}`}
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  title="Posunúť hore"
                >↑</button>
                <button
                  type="button"
                  className={`${styles.cardBtn} ${styles.cardBtnOutline}`}
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === images.length - 1}
                  title="Posunúť dole"
                >↓</button>
                <button
                  type="button"
                  className={`${styles.cardBtn} ${styles.cardBtnOutline}`}
                  onClick={() => toggleActive(img)}
                >
                  {img.active ? t.common.hide : t.common.show}
                </button>
                <button
                  type="button"
                  className={`${styles.cardBtn} ${styles.cardBtnDanger}`}
                  onClick={() => deleteImage(img)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
