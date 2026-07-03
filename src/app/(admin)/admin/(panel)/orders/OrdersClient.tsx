'use client';

import { useMemo, useState } from 'react';
import { useAdminLocale } from '@/hooks/useAdminLocale';
import { getAdminT } from '@/lib/admin-i18n';
import type { Vertical } from '@prisma/client';
import OrderDetailModal from '@/components/admin/OrderDetailModal/OrderDetailModal';
import TtnModal from '@/components/admin/TtnModal/TtnModal';
import {
  type AdminOrder,
  type OrderStatus,
  STATUS_ORDER,
  STATUS_LABELS_ECOMMERCE,
  STATUS_LABELS_FOOD,
  DELIVERY_MODE_LABELS,
  getStatusLabels,
  fmtPrice,
} from '@/components/admin/orderTypes';
import styles from './orders.module.css';

interface Props {
  orders: AdminOrder[];
  vertical: Vertical;
}

type StatFilter = 'all' | OrderStatus;


// Maps Prisma status → CSS class name (lowercase, matches existing .module.css)
const STATUS_CSS: Record<OrderStatus, string> = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
};

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function SearchIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>;
}
function ExportIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5M12 15V3" /></svg>;
}
function EyeIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
}
function BoxIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5M12 13v8" /></svg>;
}

export default function OrdersClient({ orders: initialOrders, vertical }: Props) {
  const { locale } = useAdminLocale();
  const tord = getAdminT(locale);
  const dateLocale = ({ sk: 'sk-SK', en: 'en-US', de: 'de-DE', cs: 'cs-CZ', uk: 'uk-UA' } as Record<string, string>)[locale] ?? 'sk-SK';

  const isFoodMarket = vertical === 'FOOD_MARKET';
  const isRestaurant = vertical === 'RESTAURANT';

  const STAT_FILTERS: { key: StatFilter; label: string }[] = [
    { key: 'all',        label: tord.orders.all },
    { key: 'PENDING',    label: tord.orders.newLabel },
    { key: 'PROCESSING', label: tord.orders.processing },
    { key: 'SHIPPED',    label: tord.dashboard.shipped },
    { key: 'DELIVERED',  label: tord.dashboard.delivered },
  ];

  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState<StatFilter>('all');
  const [search, setSearch] = useState('');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [ttnId, setTtnId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) {
      c[o.status] = (c[o.status] ?? 0) + 1;
    }
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      const customerName = o.customer?.name ?? o.guestName ?? '';
      const phone = o.customer?.phone ?? o.guestPhone ?? '';
      if (q && !customerName.toLowerCase().includes(q) && !phone.includes(q) && !o.orderNumber.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [orders, statusFilter, search]);

  const changeStatus = async (id: string, status: OrderStatus) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch { /* silent */ }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const saveTracking = async (id: string, trackingNumber: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber }),
      });
    } catch { /* silent */ }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, trackingNumber } : o)));
    setTtnId(null);
  };

  const exportExcel = () => console.log('[admin orders export]', filtered.map((o) => o.id));

  const detailOrder = orders.find((o) => o.id === detailId) ?? null;
  const ttnOrder = orders.find((o) => o.id === ttnId) ?? null;

  const statusLabels = isFoodMarket ? STATUS_LABELS_FOOD : STATUS_LABELS_ECOMMERCE;

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <h1 className={styles.h1}>{tord.orders.title}</h1>
        <button type="button" className={styles.exportBtn} onClick={exportExcel}>
          <ExportIcon />
          {tord.orders.export}
        </button>
      </div>

      {/* Stat filter badges */}
      <div className={styles.stats}>
        {STAT_FILTERS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`${styles.stat} ${statusFilter === s.key ? styles.statActive : ''}`}
            onClick={() => setStatusFilter(s.key)}
          >
            {s.key === 'all' ? s.label : (statusLabels[s.key as OrderStatus] ?? s.label)}
            {' '}<span className={styles.statCount}>({counts[s.key] ?? 0})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <SearchIcon />
        <input
          className={styles.search}
          type="search"
          placeholder={tord.orders.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{tord.orders.orderNum}</th>
              <th>{tord.dashboard.customer}</th>
              <th>{tord.orders.items}</th>
              <th>{tord.dashboard.amount}</th>
              <th>{tord.orders.payment}</th>
              {isFoodMarket && <th>{tord.orders.delivery}</th>}
              <th>{tord.dashboard.status}</th>
              <th>{tord.dashboard.date}</th>
              <th className={styles.colActions}>{tord.orders.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => {
              const customerName = o.customer?.name ?? o.guestName ?? tord.orders.guest;
              const phone = o.customer?.phone ?? o.guestPhone ?? '';
              const itemCount = o.items.reduce((s, i) => s + i.quantity, 0);
              const itemWord = isRestaurant ? tord.orders.dishes : tord.orders.goods;
              const dateStr = new Date(o.createdAt).toLocaleDateString(dateLocale);
              const orderStatusLabels = getStatusLabels(vertical, o.deliveryMode);

              return (
                <tr key={o.id}>
                  <td>
                    <button type="button" className={styles.orderId} onClick={() => setDetailId(o.id)}>
                      {o.orderNumber}
                    </button>
                  </td>
                  <td>
                    <span className={styles.customer}>{customerName}</span>
                    {phone && <span className={styles.phone}>{phone}</span>}
                  </td>
                  <td className={styles.items}>{itemCount} {itemWord}</td>
                  <td className={styles.sum}>{fmtPrice(o.total, o.currency)}</td>
                  <td className={styles.payment}>{o.paymentMethod ?? '—'}</td>
                  {isFoodMarket && (
                    <td>
                      <div className={styles.zoneInfo}>
                        {o.deliveryZone && (
                          <span className={styles.zoneName}>{o.deliveryZone.name}</span>
                        )}
                        <span className={o.deliveryMode === 'PICKUP' ? styles.badgePickup : styles.badgeCourier}>
                          {o.deliveryMode === 'PICKUP' ? `🏪 ${tord.orders.pickup}` : `🚗 ${tord.orders.delivery}`}
                        </span>
                        {o.deliveryZone && (
                          <span className={styles.deliveryTime}>
                            ~{o.deliveryZone.estimatedMin ?? 30}–{o.deliveryZone.estimatedMax ?? 60} хв
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                  <td>
                    <select
                      className={`${styles.statusSelect} ${styles[STATUS_CSS[o.status]]}`}
                      value={o.status}
                      onChange={(e) => void changeStatus(o.id, e.target.value as OrderStatus)}
                    >
                      {STATUS_ORDER.map((s) => (
                        <option key={s} value={s}>
                          {orderStatusLabels[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.date}>{dateStr}</td>
                  <td>
                    <div className={styles.actions}>
                      <button type="button" className={styles.iconBtn} onClick={() => setDetailId(o.id)} aria-label="Переглянути">
                        <EyeIcon />
                      </button>
                      {!isFoodMarket && (
                        <button type="button" className={styles.iconBtn} onClick={() => setTtnId(o.id)} aria-label="ТТН">
                          <BoxIcon />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={isFoodMarket ? 9 : 8} className={styles.emptyRow}>
                  {tord.orders.noOrders}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          vertical={vertical}
          onStatusChange={(id, status) => void changeStatus(id, status)}
          onSaveTracking={saveTracking}
          onNotify={(id) => console.log('[admin order notify]', id)}
          onClose={() => setDetailId(null)}
        />
      )}

      {ttnOrder && !isFoodMarket && (
        <TtnModal
          orderId={ttnOrder.id}
          initialTtn={ttnOrder.trackingNumber ?? undefined}
          onSave={saveTracking}
          onClose={() => setTtnId(null)}
        />
      )}
    </div>
  );
}
