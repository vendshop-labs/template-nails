import { db } from '@/lib/db';
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar';
import { AdminLocaleProvider } from '@/contexts/AdminLocaleContext';
import styles from './admin.module.css';

const STORE_SLUG = process.env.STORE_SLUG ?? 'electromarket';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const store = await db.store.findUnique({
    where: { slug: STORE_SLUG },
    select: { name: true, vertical: true },
  });

  return (
    <AdminLocaleProvider>
      <div className={styles.adminWrapper}>
        <AdminSidebar
          storeName={store?.name ?? 'Store'}
          vertical={store?.vertical ?? 'ECOMMERCE'}
        />
        <main className={styles.main}>{children}</main>
      </div>
    </AdminLocaleProvider>
  );
}
