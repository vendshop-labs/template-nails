import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CtaSection({ whatsapp = '', city }: { whatsapp?: string; city?: string | null }) {
  const rawWaNumber = whatsapp.replace(/[^\d]/g, '');
  const waHref = rawWaNumber ? `https://wa.me/${rawWaNumber}?text=${encodeURIComponent('Guten Tag, ich habe eine Frage.')}` : '';

  return (
    <section className="cta-section">
      <ScrollReveal direction="up">
        <div className="cta-inner">
          <h2 className="cta-title">Ready for a Fresh Look?</h2>
          <p className="cta-subtitle">
            Book your appointment today.{city ? ` Located in ${city}.` : ''}
          </p>
          <div className="cta-buttons">
            <a href="#booking" className="btn-primary">Book Now</a>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Contact Us
              </a>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
