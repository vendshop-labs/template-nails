'use client';

import { useState, type FormEvent } from 'react';
import { STATIC_SERVICES, STATIC_MASTERS, WHATSAPP_NUMBER } from '@/lib/constants';
import { features } from '@/lib/features';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GoldDivider from '@/components/ui/GoldDivider';

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name    = String(data.get('name')    ?? '').trim();
    const phone   = String(data.get('phone')   ?? '').trim();
    const service = String(data.get('service') ?? '').trim();
    const barber  = String(data.get('barber')  ?? '').trim();
    const note    = String(data.get('note')    ?? '').trim();

    const lines = [
      `📅 *Booking — Barber Studio*`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 ${name}  📞 ${phone}`,
      `✂️ ${service}`,
      barber       ? `💈 ${barber}`                    : '',
      selectedDate ? `📆 ${selectedDate}  🕐 ${selectedTime}` : '',
      note         ? `💬 ${note}`                      : '',
      `━━━━━━━━━━━━━━━━━━`,
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="booking" className="section">
      <ScrollReveal className="section-header">
        <p className="section-label">Appointment</p>
        <h2 className="section-title">Book Your Visit</h2>
        <GoldDivider />
        <p className="section-subtitle">
          Fill in the form — we will open WhatsApp with your details pre-filled.
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={150}>
        <div className="booking-container">
          <form onSubmit={handleSubmit} className="booking-form">

            <div className="booking-row">
              <div className="form-field">
                <label className="form-label">Service</label>
                <select name="service" required className="form-select">
                  <option value="">Choose service...</option>
                  {STATIC_SERVICES.map((s) => (
                    <option key={s.id} value={`${s.name} — €${s.price}`}>
                      {s.name} — €{s.price} ({s.duration} min)
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Master</label>
                <select name="barber" className="form-select">
                  <option value="">No preference</option>
                  {STATIC_MASTERS.map((m) => (
                    <option key={m.id} value={m.name}>{m.name} — {m.role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="booking-row">
              <div className="form-field">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Time</label>
                <select
                  name="time"
                  className="form-select"
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select time...</option>
                  {Array.from({ length: 20 }, (_, i) => {
                    const total = 9 * 60 + i * 30;
                    const h = Math.floor(total / 60).toString().padStart(2, '0');
                    const m = (total % 60).toString().padStart(2, '0');
                    return `${h}:${m}`;
                  }).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="booking-row">
              <div className="form-field">
                <label className="form-label">Your Name</label>
                <input type="text" name="name" placeholder="Full name" required className="form-input" />
              </div>
              <div className="form-field">
                <label className="form-label">Phone</label>
                <input type="tel" name="phone" placeholder="+421 9XX XXX XXX" required className="form-input" />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Note (optional)</label>
              <textarea name="note" placeholder="Special requests..." className="form-textarea" />
            </div>

            <button type="submit" className="booking-submit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {features.booking ? 'Book Appointment' : 'Send via WhatsApp'}
            </button>
          </form>

          <p className="booking-note">
            After clicking, WhatsApp opens with your details pre-filled. We reply within 30 minutes.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
