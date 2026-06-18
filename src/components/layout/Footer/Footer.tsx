'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useVerticalConfig } from '@/lib/vertical-context';
import { useStorePresence } from '@/lib/presence-context';
import type { Vertical } from '@prisma/client';
import StoreLogo from '@/components/ui/StoreLogo';
import styles from './Footer.module.css';

export interface FooterProps {
  /** Brand / store name shown next to the logo icon. */
  storeName?: string;
  /** Contact phone number shown in the contacts column. */
  phone?: string;
  /** Contact e-mail shown in the contacts column. */
  email?: string;
  /** Controls dark theme + restaurant-specific content. */
  vertical?: string;
}

// Catalog column reuses the existing `categories` namespace so the footer links
// stay in sync with the rest of the site (no duplicated translation strings).
const CATALOG_CATEGORIES = [
  'drills',
  'grinders',
  'perforators',
  'jigsaws',
  'sanders',
  'lasers',
] as const;

const RESTAURANT_CATEGORIES = [
  'antipasti',
  'primi',
  'secondi',
  'pizza',
  'dolci',
  'bevande',
] as const;

const FOOD_MARKET_CATEGORIES = [
  'fruits',
  'vegetables',
  'dairy',
  'meat',
  'bakery',
  'drinks',
  'frozen',
  'grocery',
] as const;

const SHOE_MARKET_CATEGORIES = [
  'sneakers',
  'running',
  'boots',
  'sandals',
  'dress-shoes',
  'sport',
  'kids',
  'sale',
] as const;

const B2B_CATEGORIES = [
  'industrial',
  'office',
  'electronics',
  'raw-materials',
  'packaging',
  'services',
] as const;

function parseOpeningHours(raw: string | undefined): Array<{ label: string; hours: string; closed: boolean }> {
  if (!raw) return [];
  const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
  const DAY_SHORT: Record<string, string> = {
    mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu',
    fri: 'Fri', sat: 'Sat', sun: 'Sun',
  };
  try {
    const data = JSON.parse(raw) as Record<string, { open: string; close: string } | null>;
    const result: Array<{ label: string; hours: string; closed: boolean }> = [];
    let i = 0;
    while (i < DAY_ORDER.length) {
      const day = DAY_ORDER[i];
      const slot = data[day] ?? null;
      if (!slot) {
        result.push({ label: DAY_SHORT[day], hours: '', closed: true });
        i++;
        continue;
      }
      const h = `${slot.open}–${slot.close}`;
      let j = i + 1;
      while (j < DAY_ORDER.length) {
        const next = data[DAY_ORDER[j]] ?? null;
        if (!next || `${next.open}–${next.close}` !== h) break;
        j++;
      }
      const label = j > i + 1
        ? `${DAY_SHORT[day]}–${DAY_SHORT[DAY_ORDER[j - 1]]}`
        : DAY_SHORT[day];
      result.push({ label, hours: h, closed: false });
      i = j;
    }
    return result;
  } catch {
    return [];
  }
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6 9-6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <path d="M3 6.5h11v9H3zM14 9.5h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17.5" cy="17.5" r="1.6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default function Footer({
  storeName = 'Store',
  phone = '+38 (097) 123-45-67',
  email,
  vertical,
}: FooterProps) {
  const t = useTranslations('footer');
  const tc = useTranslations('categories');
  const tMenu = useTranslations('menuCategories');
  const vConfig = useVerticalConfig();
  const presence = useStorePresence();
  const displayPhone = presence.phone ?? phone;
  const displayEmail = presence.email ?? email;
  const telHref = `tel:${displayPhone.replace(/[^+\d]/g, '')}`;
  const effectiveVertical = vertical ?? vConfig.vertical;
  const isRestaurant = effectiveVertical === 'RESTAURANT';
  const isFoodMarket = effectiveVertical === 'FOOD_MARKET';
  const isShoeMarket = effectiveVertical === 'SHOE_MARKET';
  const isB2B = effectiveVertical === 'B2B';
  const isServices = effectiveVertical === 'SERVICES';
  const isDark = isRestaurant || isServices;

  return (
    <footer className={`${styles.footer} ${isDark ? styles.footerDark : ''}`}>
      <div className={styles.wrap}>
        {/* Brand / about */}
        <div className={styles.brandCol}>
          <a className={styles.logo} href="/">
            <span className={styles.logoIcon} aria-hidden="true">
              <StoreLogo vertical={effectiveVertical} size={22} />
            </span>
            <span className={styles.logoText}>{storeName}</span>
          </a>
          <p className={styles.aboutDesc}>
            {isRestaurant
              ? t('aboutDescRestaurant')
              : isFoodMarket
                ? t('aboutDescFood')
                : isShoeMarket
                  ? t('aboutDescShoe')
                  : isB2B
                    ? t('aboutDescB2B')
                    : isServices
                      ? t('aboutDescServices')
                      : t('aboutDesc')}
          </p>
          {isServices && presence.city && (
            <p className={styles.schedule}>
              <MapPinIcon />
              {presence.address ? `${presence.address}, ` : ''}{presence.city}
            </p>
          )}
          {!isServices && (presence.openingHours || (!isRestaurant && !isFoodMarket)) && (
            <p className={styles.schedule}>
              <ClockIcon />
              {presence.openingHours ?? t('schedule')}
            </p>
          )}
        </div>

        {/* Catalog / Menu / Navigation */}
        <nav className={styles.col} aria-label={isRestaurant ? t('menuTitle') : isServices ? t('servicesNavTitle') : t('catalog')}>
          <h3 className={styles.colTitle}>{isRestaurant ? t('menuTitle') : isServices ? t('servicesNavTitle') : t('catalog')}</h3>
          <ul className={styles.links}>
            {isServices ? (
              <>
                <li><a className={styles.link} href="/#services">{t('servicesServices')}</a></li>
                <li><a className={styles.link} href="/#team">{t('servicesTeam')}</a></li>
                <li><a className={styles.link} href="/#gallery">{t('servicesGallery')}</a></li>
                <li><a className={styles.link} href="/#booking">{t('servicesBookNow')}</a></li>
                <li><a className={styles.link} href="/admin">{t('servicesAdmin')}</a></li>
              </>
            ) : isRestaurant ? (
              RESTAURANT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link className={styles.link} href={`/catalog?category=${cat}`}>
                    {tMenu(cat)}
                  </Link>
                </li>
              ))
            ) : isFoodMarket ? (
              <>
                <li>
                  <Link className={styles.link} href="/catalog">
                    {t('allCategories')}
                  </Link>
                </li>
                {FOOD_MARKET_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link className={styles.link} href={`/catalog?category=${cat}`}>
                      {tc(cat)}
                    </Link>
                  </li>
                ))}
              </>
            ) : isShoeMarket ? (
              <>
                <li>
                  <Link className={styles.link} href="/catalog">
                    {t('allCategories')}
                  </Link>
                </li>
                {SHOE_MARKET_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link className={styles.link} href={`/catalog?category=${cat}`}>
                      {tc(cat)}
                    </Link>
                  </li>
                ))}
              </>
            ) : isB2B ? (
              <>
                <li>
                  <Link className={styles.link} href="/catalog">
                    {t('allCategories')}
                  </Link>
                </li>
                {B2B_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link className={styles.link} href={`/catalog?category=${cat}`}>
                      {tc(cat)}
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <>
                <li>
                  <Link className={styles.link} href="/catalog">
                    {t('allCategories')}
                  </Link>
                </li>
                {CATALOG_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link className={styles.link} href={`/catalog?category=${cat}`}>
                      {tc(cat)}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </nav>

        {/* Information / Hours */}
        <nav className={styles.col} aria-label={isServices ? t('servicesHoursTitle') : t('info')}>
          <h3 className={styles.colTitle}>{isServices ? t('servicesHoursTitle') : t('info')}</h3>
          {isServices ? (
            <ul className={styles.hoursGrid}>
              {parseOpeningHours(presence.openingHours).map((row) => (
                <li key={row.label} className={styles.hoursRow}>
                  <span className={styles.hoursDay}>{row.label}</span>
                  <span className={row.closed ? styles.hoursClosed : undefined}>
                    {row.closed ? t('servicesClosed') : row.hours}
                  </span>
                </li>
              ))}
            </ul>
          ) : isRestaurant ? (
            <ul className={styles.links}>
              <li><a className={styles.link} href="/#menu">{t('menuLink')}</a></li>
              <li><a className={styles.link} href="/#reservations">{t('reservationsLink')}</a></li>
              <li><a className={styles.link} href="/delivery">{t('deliveryLink')}</a></li>
              <li><a className={styles.link} href="/privacy">{t('privacy')}</a></li>
            </ul>
          ) : isFoodMarket ? (
            <ul className={styles.links}>
              <li><a className={styles.link} href="/delivery">{t('delivery')}</a></li>
              <li><a className={styles.link} href="/guarantee">{t('freshGuarantee')}</a></li>
              <li><a className={styles.link} href="/returns">{t('returns')}</a></li>
              <li><a className={styles.link} href="/privacy">{t('privacy')}</a></li>
            </ul>
          ) : isShoeMarket ? (
            <ul className={styles.links}>
              <li><a className={styles.link} href="/delivery">{t('delivery')}</a></li>
              <li><a className={styles.link} href="/size-guide">{t('sizeGuide')}</a></li>
              <li><a className={styles.link} href="/returns">{t('returns')}</a></li>
              <li><a className={styles.link} href="/privacy">{t('privacy')}</a></li>
            </ul>
          ) : isB2B ? (
            <ul className={styles.links}>
              <li><a className={styles.link} href="/delivery">{t('delivery')}</a></li>
              <li><a className={styles.link} href="/wholesale">{t('wholesale')}</a></li>
              <li><a className={styles.link} href="/returns">{t('returns')}</a></li>
              <li><a className={styles.link} href="/privacy">{t('privacy')}</a></li>
            </ul>
          ) : (
            <ul className={styles.links}>
              <li><a className={styles.link} href="/delivery">{t('delivery')}</a></li>
              <li><a className={styles.link} href="/guarantee">{t('guarantee')}</a></li>
              <li><a className={styles.link} href="/returns">{t('returns')}</a></li>
              <li><a className={styles.link} href="/offer">{t('offer')}</a></li>
              <li><a className={styles.link} href="/privacy">{t('privacy')}</a></li>
            </ul>
          )}
        </nav>

        {/* Contacts */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>{t('contacts')}</h3>
          <ul className={styles.contacts}>
            <li>
              <a className={styles.contactLink} href={telHref}>
                <PhoneIcon />
                {displayPhone}
              </a>
            </li>
            {isServices && displayPhone && (
              <li>
                <a
                  className={styles.contactLink}
                  href={`https://wa.me/${displayPhone.replace(/[^+\d]/g, '').replace(/^\+/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
            )}
            {displayEmail && (
              <li>
                <a className={styles.contactLink} href={`mailto:${displayEmail}`}>
                  <MailIcon />
                  {displayEmail}
                </a>
              </li>
            )}
            {presence.hasPhysicalLocation && presence.address && (
              <li className={styles.contactItem}>
                <MapPinIcon />
                {presence.address}{presence.city ? `, ${presence.city}` : ''}
              </li>
            )}
            {!isServices && (
              <li className={styles.contactItem}>
                <ClockIcon />
                {presence.openingHours ?? t('schedule')}
              </li>
            )}
            {!isRestaurant && !isFoodMarket && !isServices && !presence.hasPhysicalLocation && (
              <li className={styles.contactItem}>
                <TruckIcon />
                {isShoeMarket
                  ? t('deliveryEU')
                  : isB2B
                    ? t('deliveryB2B')
                    : t('deliveryNova')}
              </li>
            )}
          </ul>
        </div>
      </div>

      {!isRestaurant && vConfig.store.showHours && presence.openingHours && (
        <div className={styles.hours}>
          <h4 className={styles.hoursTitle}>{t('openingHours')}</h4>
          <p className={styles.hoursLine}>{presence.openingHours}</p>
        </div>
      )}

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.rights}>
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </span>
          <span className={styles.bottomLinks}>
            <a className={styles.bottomLink} href="/privacy">
              {t('privacy')}
            </a>
            <a className={styles.bottomLink} href={isRestaurant ? '/terms' : '/offer'}>
              {isRestaurant ? t('termsLink') : t('offer')}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
