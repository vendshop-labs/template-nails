'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import styles from './CheckoutSummary.module.css';

const CURRENCY = 'грн';
const FREE_DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE = 99;

// Same 3 sample items as the cart; names resolve via the `sampleProducts` namespace.
const ITEMS = [
  { id: 'a', nameKey: 'makitaDrill', image: '/placeholder-product.svg', price: 2990, oldPrice: 3499, quantity: 1 },
  { id: 'b', nameKey: 'boschPerforator', image: '/placeholder-product.svg', price: 5749, quantity: 1 },
  { id: 'c', nameKey: 'dewaltGrinder', image: '/placeholder-product.svg', price: 3199, oldPrice: 4099, quantity: 1 },
] as { id: string; nameKey: string; image: string; price: number; oldPrice?: number; quantity: number }[];

export default function CheckoutSummary() {
  const t = useTranslations('checkout');
  const tc = useTranslations('cart');
  const tn = useTranslations('sampleProducts');

  const { subtotal, discount, deliveryFee, deliveryFree, total } = useMemo(() => {
    const sub = ITEMS.reduce((s, it) => s + (it.oldPrice ?? it.price) * it.quantity, 0);
    const disc = ITEMS.reduce(
      (s, it) => s + (it.oldPrice != null ? (it.oldPrice - it.price) * it.quantity : 0),
      0,
    );
    const payable = sub - disc;
    const free = payable === 0 || payable > FREE_DELIVERY_THRESHOLD;
    const fee = free ? 0 : DELIVERY_FEE;
    return { subtotal: sub, discount: disc, deliveryFee: fee, deliveryFree: free, total: payable + fee };
  }, []);

  const formatPrice = (value: number) => new Intl.NumberFormat('uk-UA').format(value);

  return (
    <aside className={styles.sum}>
      <h2 className={styles.title}>{tc('orderSummary')}</h2>

      <ul className={styles.items}>
        {ITEMS.map((it) => (
          <li key={it.id} className={styles.item}>
            <span className={styles.itemImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image} alt={tn(it.nameKey)} loading="lazy" />
            </span>
            <span className={styles.itemInfo}>
              <span className={styles.itemName}>{tn(it.nameKey)}</span>
              <span className={styles.itemQty}>× {it.quantity}</span>
            </span>
            <span className={styles.itemPrice}>
              {formatPrice(it.price * it.quantity)} {CURRENCY}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.div} />

      <div className={styles.row}>
        <span>{tc('subtotal')}</span>
        <span>
          {formatPrice(subtotal)} {CURRENCY}
        </span>
      </div>
      <div className={`${styles.row} ${styles.rowGreen}`}>
        <span>{tc('discount')}</span>
        <span>{discount > 0 ? `−${formatPrice(discount)} ${CURRENCY}` : '—'}</span>
      </div>
      <div className={`${styles.row} ${deliveryFree ? styles.rowGreen : ''}`}>
        <span>{t('delivery')}</span>
        <span>{deliveryFree ? tc('deliveryFree') : `${formatPrice(deliveryFee)} ${CURRENCY}`}</span>
      </div>

      <div className={styles.div} />

      <div className={styles.total}>
        <span className={styles.totalLabel}>{tc('total')}</span>
        <span className={styles.totalVal}>
          {formatPrice(total)} {CURRENCY}
        </span>
      </div>
    </aside>
  );
}
