import Image from 'next/image';
import { WHATSAPP_LINKS, CONTACT } from '@/lib/constants';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import styles from './HeroSection.module.css';

interface HeroConfig {
  title?: string | null;
  subtitle?: string | null;
  ctaText?: string | null;
  imageUrl?: string | null;
}

interface StoreInfo {
  city?: string | null;
  instagramUrl?: string | null;
  googleRating?: string | null;
  workingHoursLabel?: string | null;
}

interface HeroSectionProps {
  config?: HeroConfig | null;
  store?: StoreInfo | null;
}

const DEFAULTS = {
  title:    'Vaše nechty. Váš štýl.',
  subtitle: 'Prémiová manikúra, gélové nechty a nail art v Trenčíne.',
  ctaText:  'Rezervovať termín',
};

export default function HeroSection({ config, store }: HeroSectionProps) {
  const title    = config?.title    || DEFAULTS.title;
  const subtitle = config?.subtitle || DEFAULTS.subtitle;
  const ctaText  = config?.ctaText  || DEFAULTS.ctaText;
  const imageSrc = config?.imageUrl || null;

  return (
    <section className={styles.hero}>
      {/* Левая колонка — контент */}
      <div className={styles.heroLeft}>
        <p className="hero__tagline">
          <span className="hero__tagline-line" />
          Est. 2024 — Trenčín
        </p>

        <h1 className="hero__title">{title}</h1>

        <p className="hero__subtitle">{subtitle}</p>

        <div className="hero__chips">
          <span className="hero__chip">💅 Manikúra</span>
          <span className="hero__chip">✨ Gél nechty</span>
          <span className="hero__chip">🌸 Nail art</span>
          <span className="hero__chip">🎓 Kurzy</span>
        </div>

        <p className="hero__price-anchor">
          Manikúra od <strong>€18</strong> · Gél od <strong>€35</strong>
        </p>

        <div className="hero__buttons">
          <a href="#rezervacia" className="btn-primary">
            {ctaText}
          </a>
          <a
            href={WHATSAPP_LINKS.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </a>
        </div>

        <div className={styles.stats}>
          {(store?.googleRating ?? '4.9') && (
            <>
              <span>⭐ Google {store?.googleRating ?? '4.9'}</span>
              <span className={styles.dot}>·</span>
            </>
          )}
          {(store?.workingHoursLabel ?? 'Po–Pia 09:00–18:00') && (
            <>
              <span>🕐 {store?.workingHoursLabel ?? 'Po–Pia 09:00–18:00'}</span>
              <span className={styles.dot}>·</span>
            </>
          )}
          {(store?.city ?? CONTACT.city) && (
            <>
              <span>📍 {store?.city ?? CONTACT.city}</span>
              <span className={styles.dot}>·</span>
            </>
          )}
          <a
            href={store?.instagramUrl ?? CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramLink}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
        </div>
      </div>

      {/* Правая колонка — изображение */}
      <div className={styles.heroRight}>
        {imageSrc ? (
          <div className={styles.heroImageWrap}>
            <Image
              src={imageSrc}
              alt="Lumière Nails — nechtové štúdio Trenčín"
              fill
              priority
              fetchPriority="high"
              sizes="50vw"
              quality={85}
              unoptimized={imageSrc.startsWith('http')}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ) : (
          <div className={styles.heroGradient} />
        )}
      </div>
    </section>
  );
}
