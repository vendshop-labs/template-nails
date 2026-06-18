import { db } from '@/lib/db';
import styles from '../admin.module.css';

const STORE_SLUG = process.env.STORE_SLUG ?? 'kate-barber';

export default async function MastersPage() {
  const store = await db.store.findUnique({ where: { slug: STORE_SLUG } });

  const masters = store
    ? await db.serviceMaster.findMany({
        where: { storeId: store.id },
        orderBy: { sortOrder: 'asc' },
      })
    : [];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Masters</h1>
        <a href="/admin/masters/new" className="btn-primary">+ Add Master</a>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {masters.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td>{m.name}</td>
                <td>{m.role}</td>
                <td>{m.active ? '✓' : '—'}</td>
                <td>
                  <a href={`/admin/masters/${m.id}`} className={styles.actionLink}>Edit</a>
                </td>
              </tr>
            ))}
            {masters.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyRow}>No masters yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
