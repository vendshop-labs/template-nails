'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import GoldDivider from '@/components/ui/GoldDivider';
import DateTimePicker from '@/components/ui/DateTimePicker';
import ScrollReveal from '@/components/ui/ScrollReveal';

type DbService = {
  id: string;
  nameKey: string;
  price: number;
  duration: number;
  category: string | null;
};

type DbMaster = {
  id: string;
  name: string;
  role: string;
  photo: string | null;
};

const WA_HREF = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '421900000000'}`;

interface BookingSectionProps {
  locale?: string;
}

export default function BookingSection({ locale = 'sk' }: BookingSectionProps) {
  const t = useTranslations('booking');

  const STEP_LABELS = [t('stepService'), t('stepTechnician'), t('stepDateTime'), t('stepContact')];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [services, setServices] = useState<DbService[]>([]);
  const [masters,  setMasters]  = useState<DbMaster[]>([]);

  const [selectedService, setSelectedService] = useState<DbService | null>(null);
  const [selectedMaster,  setSelectedMaster]  = useState<DbMaster | null>(null);
  const [selectedDate,    setSelectedDate]    = useState('');
  const [selectedTime,    setSelectedTime]    = useState('');

  const [name,        setName]        = useState('');
  const [phone,       setPhone]       = useState('');
  const [note,        setNote]        = useState('');
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmed,   setConfirmed]   = useState(false);

  const [bookedSlots,  setBookedSlots]  = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((d: { services?: DbService[] }) => setServices(d.services ?? []))
      .catch(() => {});

    fetch('/api/masters')
      .then((r) => r.json())
      .then((d: { masters?: DbMaster[] }) => setMasters(d.masters ?? []))
      .catch(() => {});
  }, []);

  const fetchSlots = useCallback(async (date: string) => {
    setBookedSlots([]);
    setLoadingSlots(true);
    try {
      const res  = await fetch(`/api/availability?date=${date}`);
      const data = (await res.json()) as { slots: { time: string; available: boolean }[] };
      setBookedSlots((data.slots ?? []).filter((s) => !s.available).map((s) => s.time));
    } catch {
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (step === 3) {
      void fetchSlots(new Date().toISOString().split('T')[0]);
    }
  }, [step, fetchSlots]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setSubmitError(t('errorRequired'));
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName:  name.trim(),
          clientPhone: phone.trim(),
          date:        selectedDate,
          time:        selectedTime,
          serviceId:   selectedService?.id ?? null,
          masterId:    selectedMaster?.id  ?? null,
          notes:       note.trim() || null,
        }),
      });

      if (res.status === 409) {
        await fetchSlots(selectedDate);
        setSelectedTime('');
        setSubmitError(t('errorSlotTaken'));
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setSubmitError(t('errorSave'));
        setSubmitting(false);
        return;
      }
      setConfirmed(true);
    } catch {
      setSubmitError(t('errorNetwork'));
    } finally {
      setSubmitting(false);
    }
  }

  // ── Confirmation screen ──────────────────────────────────────────────────
  if (confirmed) {
    return (
      <section id="rezervacia" className="booking">
        <ScrollReveal direction="up" className="section-header">
          <p className="section-label">{t('confirmedLabel')}</p>
          <h2 className="section-title">{t('confirmedTitle')}</h2>
          <GoldDivider />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="booking__container" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>✅</div>

            <div style={{
              display: 'inline-flex', flexDirection: 'column', gap: '0.4rem',
              padding: '1rem 1.5rem',
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              marginBottom: '1.75rem',
              textAlign: 'left',
            }}>
              {selectedService && (
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{t('labelService')} </span>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{selectedService.nameKey}</strong>
                </div>
              )}
              {selectedMaster && (
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{t('labelTechnician')} </span>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{selectedMaster.name}</strong>
                </div>
              )}
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('labelDateTime')} </span>
                <strong style={{ color: 'var(--color-text-primary)' }}>{selectedDate} · {selectedTime}</strong>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon size={18} />
                {t('whatsappQuestion')}
              </a>
            </div>

            <p className="booking__note">{t('confirmNote')}</p>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  // ── Wizard ───────────────────────────────────────────────────────────────
  return (
    <section id="rezervacia" className="booking">
      <ScrollReveal direction="up" className="section-header">
        <p className="section-label">{t('sectionLabel')}</p>
        <h2 className="section-title">{t('title')}</h2>
        <GoldDivider />
        <p className="section-subtitle">{t('subtitle')}</p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={200}>
        <div className="booking__container">

          {/* Progress bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.25rem', marginBottom: '2rem',
          }}>
            {STEP_LABELS.map((label, i) => {
              const s = (i + 1) as 1 | 2 | 3 | 4;
              const active = step === s;
              const done   = step > s;
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => done && setStep(s)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                      background: 'none', border: 'none',
                      cursor: done ? 'pointer' : 'default',
                      padding: '0 0.5rem',
                    }}
                  >
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: active ? 'var(--color-gold)' : done ? 'var(--color-gold-light)' : 'transparent',
                      color: active ? '#fff' : done ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      border: active || done ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.72rem', fontWeight: 700,
                    }}>
                      {done ? '✓' : s}
                    </span>
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: active ? 'var(--color-gold)' : done ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                    }}>
                      {label}
                    </span>
                  </button>
                  {s < 4 && (
                    <div style={{
                      width: '20px', height: '1px', flexShrink: 0,
                      background: done ? 'var(--color-gold)' : 'var(--color-border)',
                      marginBottom: '1.1rem',
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── STEP 1: Service ── */}
          {step === 1 && (
            <div>
              {services.length === 0 ? (
                <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2.5rem 0' }}>
                  {t('loadingServices')}
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {services.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => { setSelectedService(svc); setStep(2); }}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '1rem 1.25rem',
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-bg-card)',
                        cursor: 'pointer', textAlign: 'left', width: '100%',
                        color: 'var(--color-text-primary)',
                        transition: 'border-color 0.2s, transform 0.15s',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-gold)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{svc.nameKey}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          {svc.duration} min
                        </div>
                      </div>
                      <div style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                        €{svc.price}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Technician ── */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <button
                  onClick={() => { setSelectedMaster(null); setStep(3); }}
                  style={{
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-card)',
                    cursor: 'pointer', textAlign: 'left', width: '100%',
                    color: 'var(--color-text-muted)', fontFamily: 'inherit',
                  }}
                >
                  {t('noPreference')}
                </button>

                {masters.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setSelectedMaster(m); setStep(3); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem 1.25rem',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-card)',
                      cursor: 'pointer', textAlign: 'left', width: '100%',
                      color: 'var(--color-text-primary)',
                      transition: 'border-color 0.2s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                  >
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                      background: 'var(--color-gold-light)',
                      color: 'var(--color-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1rem',
                    }}>
                      {m.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{m.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {m.role}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                style={{ marginTop: '1.25rem', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}
              >
                {t('back')}
              </button>
            </div>
          )}

          {/* ── STEP 3: Date / Time ── */}
          {step === 3 && (
            <div>
              <div className="booking__picker-wrap">
                <DateTimePicker
                  locale={locale}
                  onSelect={(date, time) => { setSelectedDate(date); setSelectedTime(time); }}
                  onDayChange={(date) => { setSelectedTime(''); void fetchSlots(date); }}
                  bookedSlots={bookedSlots}
                  loading={loadingSlots}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', gap: '0.75rem' }}>
                <button
                  onClick={() => setStep(2)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}
                >
                  {t('back')}
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="booking__btn-submit"
                  style={{ flex: 'none', padding: '0.85rem 2rem', opacity: !selectedDate || !selectedTime ? 0.45 : 1, cursor: !selectedDate || !selectedTime ? 'not-allowed' : 'pointer' }}
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Contact ── */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="booking__form">
              {/* Booking summary */}
              <div style={{
                padding: '0.875rem 1rem', marginBottom: '1.25rem',
                background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)',
                display: 'flex', flexDirection: 'column', gap: '0.3rem',
                fontSize: '0.875rem',
              }}>
                {selectedService && (
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>{t('labelService')} </span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{selectedService.nameKey}</strong>
                    <span style={{ color: 'var(--color-gold)', marginLeft: '0.5rem', fontWeight: 700 }}>€{selectedService.price}</span>
                  </div>
                )}
                {selectedMaster && (
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>{t('labelTechnician')} </span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{selectedMaster.name}</strong>
                  </div>
                )}
                <div>
                  <span style={{ color: 'var(--color-text-muted)' }}>{t('labelDateTime')} </span>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{selectedDate} · {selectedTime}</strong>
                </div>
              </div>

              <div className="booking__form-row">
                <div>
                  <label className="booking__label">{t('labelName')}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('placeholderName')}
                    required
                    className="booking__input"
                  />
                </div>
                <div>
                  <label className="booking__label">{t('labelPhone')}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+421 9XX XXX XXX"
                    required
                    className="booking__input"
                  />
                </div>
              </div>

              <div>
                <label className="booking__label">{t('labelNote')}</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t('placeholderNote')}
                  className="booking__textarea"
                />
              </div>

              {submitError && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>⚠️ {submitError}</p>
              )}

              <div className="booking__actions">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  style={{
                    background: 'none', border: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                    padding: '1rem 1.5rem', cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {t('back')}
                </button>
                <button
                  type="submit"
                  className="booking__btn-submit"
                  disabled={submitting}
                  style={{ flex: 1 }}
                >
                  {submitting ? t('submitting') : t('submit')}
                </button>
              </div>

              <p className="booking__note">{t('confirmNote')}</p>
            </form>
          )}

        </div>
      </ScrollReveal>
    </section>
  );
}
