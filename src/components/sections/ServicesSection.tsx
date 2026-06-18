import Image from 'next/image';
import { STATIC_SERVICES } from '@/lib/constants';
import { WHATSAPP_LINKS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GoldDivider from '@/components/ui/GoldDivider';

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <ScrollReveal className="section-header">
        <p className="section-label">What we offer</p>
        <h2 className="section-title">Our Services</h2>
        <GoldDivider />
        <p className="section-subtitle">
          Professional grooming services tailored to your style.
        </p>
      </ScrollReveal>

      <div className="services-grid">
        {STATIC_SERVICES.map((service, i) => (
          <ScrollReveal key={service.id} direction="up" delay={i * 80}>
            <div className="service-card">
              {service.image && (
                <div className="service-card__image-wrap">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="service-card__image"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>
              )}
              <div className="service-card__body">
                <div className="service-card__meta">
                  {service.category && (
                    <span className="service-card__category">{service.category}</span>
                  )}
                  <span className="service-card__duration">{service.duration} min</span>
                </div>
                <h3 className="service-card__name">{service.name}</h3>
                {service.description && (
                  <p className="service-card__desc">{service.description}</p>
                )}
                <div className="service-card__footer">
                  <span className="service-card__price">from €{service.price}</span>
                  <a
                    href={WHATSAPP_LINKS.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-card__btn"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
