import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CookieBanner from '@/components/ui/CookieBanner/CookieBanner';
import { getStoreConfig } from '@/lib/store-config';
import { themeToCssVars, DARK_THEME } from '@/lib/theme';
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

export async function generateMetadata(): Promise<Metadata> {
  const config = await getStoreConfig();
  const baseUrl = getBaseUrl();

  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${baseUrl}/${locale}`;
  }

  const seoTitle = 'Lumière Nails Trenčín | Gélová manikúra, Nail Art, Pedikúra';
  const seoDesc = 'Prémiové nechtové štúdio v Trenčíne. Online rezervácia 24/7. Gélová manikúra, nail art, nechtová modeláž, pedikúra.';

  return {
    title: {
      default: seoTitle,
      template: `%s | Lumière Nails`,
    },
    description: seoDesc,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Lumière Nails',
      title: seoTitle,
      description: seoDesc,
      url: baseUrl,
      locale: 'sk_SK',
      alternateLocale: ['en_US', 'de_DE', 'cs_CZ', 'ru_RU'],
      images: [
        { url: '/og-lumiere.jpg', width: 1200, height: 630, alt: 'Lumière Nails Trenčín' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
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
  const theme = process.env.NEXT_PUBLIC_THEME ?? 'dark';
  const cssVars = themeToCssVars(theme === 'dark' ? DARK_THEME : config.theme);

  const storeSlug = process.env.STORE_SLUG ?? 'lumiere-nails';
  const store = await db.store.findUnique({
    where: { slug: storeSlug },
    select: { id: true, name: true },
  });
  const legalConfig = (locale === 'de' && store)
    ? await db.legalConfig.findUnique({ where: { storeId: store.id } })
    : null;
  const legalEnabled = legalConfig?.enabled ?? false;

  return (
    <html lang={locale} data-vertical={config.vertical.vertical} data-theme={theme} className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://conuflmgcnkfqjmncsth.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://conuflmgcnkfqjmncsth.public.blob.vercel-storage.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BeautySalon',
              name: 'Lumière Nails',
              description: 'Prémiové nechtové štúdio v Trenčíne — gélová manikúra, nail art, pedikúra.',
              url: siteUrl,
              telephone: '+421900000000',
              email: 'info@lumiere-nails.sk',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Mierové námestie 1',
                addressLocality: 'Trenčín',
                postalCode: '911 01',
                addressCountry: 'SK',
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
                <Footer locale={locale} legalEnabled={legalEnabled} storeName={store?.name ?? undefined} />
                <CookieBanner />
              </PresenceProvider>
            </VerticalProvider>
          </CustomerProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
