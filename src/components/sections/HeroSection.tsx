import Image from 'next/image';
import { STORE_NAME, WHATSAPP_LINKS, CONTACT } from '@/lib/constants';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { BLUR_PLACEHOLDER } from '@/components/ui/BlurImage';

interface HeroConfig {
  title?: string | null;
  subtitle?: string | null;
  ctaText?: string | null;
  imageUrl?: string | null;
}

interface HeroSectionProps {
  config?: HeroConfig | null;
}

const DEFAULTS = {
  title:    'Vaše nechty. Váš štýl.',
  subtitle: 'Prémiová manikúra, gélové nechty a nail art v Trenčíne.',
  ctaText:  'Rezervovať termín',
  imageUrl: '/hero-barbershop.webp',
};

export default function HeroSection({ config }: HeroSectionProps) {
  const title    = config?.title    || DEFAULTS.title;
  const subtitle = config?.subtitle || DEFAULTS.subtitle;
  const ctaText  = config?.ctaText  || DEFAULTS.ctaText;
  const imageSrc = config?.imageUrl || DEFAULTS.imageUrl;

  return (
    <section className="hero">
      <div className="hero__inner">
        {/* LEFT — text */}
        <div className="hero__content">
          <p className="hero__tagline">
            <span className="hero__tagline-line" />
            Est. 2024 — Trenčín
          </p>

          <h1 className="hero__title">{title}</h1>

          <p className="hero__subtitle">{subtitle}</p>

          {/* Service chips */}
          <div className="hero__chips">
            <span className="hero__chip">💅 Manikúra</span>
            <span className="hero__chip">✨ Gél nechty</span>
            <span className="hero__chip">🌸 Nail art</span>
            <span className="hero__chip">🎓 Kurzy</span>
          </div>

          {/* Price anchor */}
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

          <p className="hero__trust">
            ⭐ Google 4.9 &nbsp;·&nbsp; 🕐 Po–Pia 09:00–18:00 &nbsp;·&nbsp; 📍 Trenčín
            &nbsp;·&nbsp;{' '}
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hero__instagram">
              Instagram
            </a>
          </p>
        </div>

        {/* RIGHT — image */}
        <div className="hero__image-wrap">
          <Image
            src={imageSrc}
            alt={`${STORE_NAME} — nechtové štúdio Trenčín`}
            fill
            className="hero__image"
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 42vw"
            quality={85}
            unoptimized={imageSrc.startsWith('http')}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <div className="hero__overlay" />
        </div>
      </div>
    </section>
  );
}
