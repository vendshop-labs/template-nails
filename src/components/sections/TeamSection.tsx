import Image from 'next/image';
import { STATIC_MASTERS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GoldDivider from '@/components/ui/GoldDivider';

export default function TeamSection() {
  return (
    <section id="team" className="section">
      <ScrollReveal className="section-header">
        <p className="section-label">The team</p>
        <h2 className="section-title">Our Masters</h2>
        <GoldDivider />
      </ScrollReveal>

      <div className="team-grid">
        {STATIC_MASTERS.map((master, i) => (
          <ScrollReveal key={master.id} direction="up" delay={i * 100}>
            <div className="team-card">
              <div className="team-card__photo-wrap">
                {master.photo ? (
                  <Image
                    src={master.photo}
                    alt={master.name}
                    fill
                    className="team-card__photo"
                    sizes="(max-width: 768px) 100vw, 340px"
                  />
                ) : (
                  <div className="team-card__photo-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="team-card__body">
                <h3 className="team-card__name">{master.name}</h3>
                <p className="team-card__role">{master.role}</p>
                {master.bio && <p className="team-card__bio">{master.bio}</p>}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
