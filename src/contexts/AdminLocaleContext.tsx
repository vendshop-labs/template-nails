'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { AdminLocale } from '@/lib/admin-i18n';

const COOKIE_KEY = 'admin_locale';
const VALID_LOCALES: AdminLocale[] = ['sk', 'en', 'uk', 'cs', 'de'];

interface AdminLocaleContextValue {
  locale: AdminLocale;
  changeLocale: (locale: AdminLocale) => void;
}

const AdminLocaleContext = createContext<AdminLocaleContextValue>({
  locale: 'sk',
  changeLocale: () => {},
});

export function AdminLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<AdminLocale>('sk');

  useEffect(() => {
    const saved = document.cookie
      .split('; ')
      .find((r) => r.startsWith(COOKIE_KEY + '='))
      ?.split('=')[1] as AdminLocale | undefined;
    if (saved && (VALID_LOCALES as string[]).includes(saved)) {
      setLocale(saved);
    }
  }, []);

  function changeLocale(newLocale: AdminLocale) {
    setLocale(newLocale);
    document.cookie = `${COOKIE_KEY}=${newLocale};path=/;max-age=31536000`;
  }

  return (
    <AdminLocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </AdminLocaleContext.Provider>
  );
}

export function useAdminLocale(): AdminLocaleContextValue {
  return useContext(AdminLocaleContext);
}
