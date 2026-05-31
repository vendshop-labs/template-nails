import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar';
import '../../globals.css';
import styles from './admin.module.css';

export const metadata: Metadata = {
  title: 'Admin — ElectroMarket',
  robots: { index: false, follow: false },
};

// Standalone root layout for the admin section — its own <html>/<body>, no
// store Header/Footer, no next-intl. Ukrainian-only owner tool.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <div className={styles.shell}>
          <AdminSidebar />
          <main className={styles.content}>{children}</main>
        </div>
      </body>
    </html>
  );
}
