import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CookieBanner from '@/components/ui/CookieBanner/CookieBanner';
import { getStoreConfig } from '@/lib/store-config';
import { themeToCssVars, DEFAULT_THEME } from '@/lib/theme';
import { db } from '@/lib/db';
import { VerticalProvider } from '@/lib/vertical-context';
import { PresenceProvider } from '@/lib/presence-context';
import { CustomerProvider } from '@/lib/useCustomer';
import { getBaseUrl } from '@/lib/url';
import '../../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
});

const STORE_SLUG = process.env.STORE_SLUG ?? 'lumiere-nails';

const OG_LOCALE_MAP: Record<string, string> = {
  sk: 'sk_SK', en: 'en_US', de: 'de_DE', cs: 'cs_CZ',
  uk: 'uk_UA', pl: 'pl_PL', ru: 'ru_RU',
};

const COUNTRY_MAP: Record<string, string> = {
  sk: 'SK', de: 'DE', cs: 'CZ', uk: 'UA', pl: 'PL', en: 'GB', ru: 'RU',
};

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const baseUrl = getBaseUrl();

  const store = await db.store.findUnique({
    where: { slug: STORE_SLUG },
    select: { name: true, city: true },
  });

  const storeName = store?.name ?? 'Lumière Nails';
  const city = store?.city ?? '';

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${baseUrl}/${l}`;
  }

  const title = t('title', { storeName, city });
  const description = t('description', { storeName, city });
  const ogLocale = OG_LOCALE_MAP[locale] ?? 'en_US';

  return {
    title: {
      default: title,
      template: `%s | ${storeName}`,
    },
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALE_MAP).filter(l => l !== ogLocale),
      siteName: storeName,
      title,
      description,
      url: `${baseUrl}/${locale}`,
      images: [
        { url: '/og-lumiere.jpg', width: 1200, height: 630, alt: storeName },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-lumiere.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fdf8f5',
};

// Re-check DB every 60 seconds (ISR)
export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const config = await getStoreConfig();
  const siteUrl = getBaseUrl();
  const cssVars = themeToCssVars(config.theme ?? DEFAULT_THEME);
  const tSeo = await getTranslations({ locale, namespace: 'seo' });

  const store = await db.store.findUnique({
    where: { slug: STORE_SLUG },
    select: { id: true, name: true, openingHours: true, city: true, address: true, phone: true, email: true },
  });
  const legalConfig = (locale === 'de' && store)
    ? await db.legalConfig.findUnique({ where: { storeId: store.id } })
    : null;
  const legalEnabled = legalConfig?.enabled ?? false;

  const parsedFooterHours = (() => {
    try { return store?.openingHours ? JSON.parse(store.openingHours) as unknown : null; }
    catch { return null; }
  })();

  return (
    <html lang={locale} data-vertical={config.vertical.vertical} className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://conuflmgcnkfqjmncsth.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://conuflmgcnkfqjmncsth.public.blob.vercel-storage.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BeautySalon',
              name: store?.name ?? 'Lumière Nails',
              description: tSeo('jsonLdDescription', { storeName: store?.name ?? 'Lumière Nails', city: store?.city ?? '' }),
              url: siteUrl,
              telephone: store?.phone ?? '',
              email: store?.email ?? '',
              address: {
                '@type': 'PostalAddress',
                streetAddress: store?.address ?? '',
                addressLocality: store?.city ?? '',
                postalCode: '911 01',
                addressCountry: COUNTRY_MAP[locale] ?? 'SK',
              },
              openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-15:00'],
              priceRange: '€€',
            }),
          }}
        />
      </head>
      <body style={cssVars as React.CSSProperties}>
        <NextIntlClientProvider messages={messages}>
          <CustomerProvider>
            <VerticalProvider config={config.vertical}>
              <PresenceProvider presence={config.presence}>
                <Header logoUrl={config.logoUrl} storeName={store?.name ?? undefined} />
                <main>{children}</main>
                <Footer
                  locale={locale}
                  legalEnabled={legalEnabled}
                  storeName={store?.name ?? undefined}
                  address={store?.address ?? undefined}
                  city={store?.city ?? undefined}
                  phone={store?.phone ?? undefined}
                  email={store?.email ?? undefined}
                  workingHours={parsedFooterHours}
                />
                <CookieBanner />
              </PresenceProvider>
            </VerticalProvider>
          </CustomerProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
