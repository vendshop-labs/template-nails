'use client';

import { useTranslations } from 'next-intl';
import CheckoutForm from '@/components/checkout/CheckoutForm/CheckoutForm';
import CheckoutSummary from '@/components/checkout/CheckoutSummary/CheckoutSummary';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const t = useTranslations('checkout');

  return (
    <div className={styles.checkout}>
      <h1 className={styles.h1}>{t('title')}</h1>
      <div className={styles.body}>
        <div className={styles.formCol}>
          <CheckoutForm />
        </div>
        <CheckoutSummary />
      </div>
    </div>
  );
}
