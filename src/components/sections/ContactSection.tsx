import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import { CONTACT, HOURS, STORE_NAME_FALLBACK } from '@/lib/constants';
import { getDayName } from '@/lib/day-utils';
import GoldDivider from '@/components/ui/GoldDivider';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import ScrollReveal from '@/components/ui/ScrollReveal';

// ─── Working hours types & helpers ───────────────────────────────────────
type DayHours = { open: string; close: string } | null;
type WorkingHours = Record<string, DayHours>;

const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function formatHours(
  wh: WorkingHours | null | undefined,
  locale: string,
): { label: string; hours: string | null }[] {
  if (!wh || typeof wh !== 'object') return [];

  const result: { label: string; hours: string | null }[] = [];
  let i = 0;

  while (i < DAY_ORDER.length) {
    const day = DAY_ORDER[i];
    const hours = wh[day];

    if (!hours) {
      result.push({ label: getDayName(locale, day, 'long'), hours: null });
      i++;
      continue;
    }

    let j = i + 1;
    while (
      j < DAY_ORDER.length &&
      wh[DAY_ORDER[j]] &&
      wh[DAY_ORDER[j]]?.open === hours.open &&
      wh[DAY_ORDER[j]]?.close === hours.close
    ) j++;

    const label =
      j - i > 1
        ? `${getDayName(locale, day, 'long')} – ${getDayName(locale, DAY_ORDER[j - 1], 'long')}`
        : getDayName(locale, day, 'long');

    result.push({ label, hours: `${hours.open} – ${hours.close}` });
    i = j;
  }

  return result;
}

// ─── Props ────────────────────────────────────────────────────────────────
interface ContactSectionProps {
  locale?: string;
  storeName?: string | null;
  address?: string | null;
  city?: string | null;
  phone?: string | null;
  email?: string | null;
  mapLat?: number | null;
  mapLng?: number | null;
  workingHours?: unknown;
  whatsapp?: string;
}

export default function ContactSection({
  locale = 'sk',
  storeName,
  address,
  city,
  phone,
  email,
  mapLat,
  mapLng,
  workingHours,
  whatsapp = '',
}: ContactSectionProps) {
  const t = useTranslations('contact');
  const tw = useTranslations('whatsapp');

  const displayAddress = address ?? CONTACT.address;
  const displayCity    = city    ?? CONTACT.city;
  const displayPhone   = phone   ?? CONTACT.phone;
  const displayEmail   = email   ?? CONTACT.email;
  const displayName    = storeName ?? STORE_NAME_FALLBACK;

  const phoneHref = displayPhone ? `tel:${displayPhone.replace(/\s/g, '')}` : CONTACT.phoneHref;
  const emailHref = displayEmail ? `mailto:${displayEmail}`                  : CONTACT.emailHref;

  const mapQuery = encodeURIComponent(
    [address ?? CONTACT.address, city].filter(Boolean).join(', ')
  );
  const mapSrc =
    mapLat && mapLng
      ? `https://maps.google.com/maps?q=${mapLat},${mapLng}&z=15&output=embed&hl=${locale}`
      : `https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed&hl=${locale}`;

  const hoursData = formatHours(workingHours as WorkingHours, locale);
  const rawWaNumber = whatsapp.replace(/[^\d]/g, '');
  const waLocationHref = rawWaNumber ? `https://wa.me/${rawWaNumber}?text=${encodeURIComponent(tw('location'))}` : '';

  return (
    <section id="kontakt" className="contact">
      <ScrollReveal direction="up" className="section-header">
        <p className="section-label">{t('title')}</p>
        <h2 className="section-title">{t('where')}</h2>
        <GoldDivider />
      </ScrollReveal>

      <div className="contact-grid">
        <ScrollReveal direction="left" delay={100}>
          <div className="contact-info">
            <div>
              <p className="contact-item-label">{t('address')}</p>
              <p className="contact-item-value contact-item-value--pre">
                {displayCity ? `${displayAddress}\n${displayCity}` : displayAddress}
              </p>
            </div>

            <div>
              <p className="contact-item-label">{t('phoneLabel')}</p>
              <p className="contact-item-value">
                <a href={phoneHref} className="contact-link">{displayPhone}</a>
                <br />
                <a href={emailHref} className="contact-link">{displayEmail}</a>
              </p>
            </div>

            <div>
              <p className="contact-item-label">{t('hours')}</p>
              <div className="contact-hours-grid">
                {hoursData.length > 0
                  ? hoursData.map((row, idx) => (
                      <Fragment key={idx}>
                        <span className="contact-hours-day">{row.label}</span>
                        <span
                          className="contact-hours-time"
                          style={{ fontWeight: row.hours === null ? 400 : undefined }}
                        >
                          {row.hours ?? t('closed')}
                        </span>
                      </Fragment>
                    ))
                  : HOURS.map((row) => (
                      <Fragment key={row.day}>
                        <span className="contact-hours-day">{row.day}</span>
                        <span className="contact-hours-time">{row.time}</span>
                      </Fragment>
                    ))}
              </div>
            </div>

            {waLocationHref && (
              <a
                href={waLocationHref}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-wa-btn"
              >
                <WhatsAppIcon size={18} />
                {t('writeUs')}
              </a>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={200}>
          <iframe
            src={mapSrc}
            className="contact-map"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('mapTitle', { storeName: displayName })}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
