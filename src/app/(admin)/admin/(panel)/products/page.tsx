import { db } from '@/lib/db';
import AdminProductsClient from './AdminProductsClient';

const STORE_SLUG = process.env.STORE_SLUG ?? 'electromarket';

export default async function AdminProductsPage() {
  const store = await db.store.findUnique({
    where: { slug: STORE_SLUG },
    select: { vertical: true },
  });
  return <AdminProductsClient vertical={store?.vertical ?? 'ECOMMERCE'} />;
}
