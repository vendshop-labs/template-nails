import { db } from '@/lib/db';
import styles from '../admin.module.css';

const STORE_SLUG = process.env.STORE_SLUG ?? 'kate-barber';

export default async function AdminServicesPage() {
  const store = await db.store.findUnique({ where: { slug: STORE_SLUG } });

  const services = store
    ? await db.service.findMany({
        where: { storeId: store.id },
        orderBy: [{ category: 'asc' }, { price: 'asc' }],
      })
    : [];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Services</h1>
        <a href="/admin/services/new" className="btn-primary">+ Add Service</a>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td>{s.nameKey}</td>
                <td>{s.category ?? '—'}</td>
                <td>€{s.price}</td>
                <td>{s.duration} min</td>
                <td>{s.active ? '✓' : '—'}</td>
                <td>
                  <a href={`/admin/services/${s.id}`} className={styles.actionLink}>Edit</a>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyRow}>No services yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
