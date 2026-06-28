import Image from 'next/image';
import GoldDivider from '@/components/ui/GoldDivider';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { BLUR_PLACEHOLDER } from '@/components/ui/BlurImage';


interface Master {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  photo?: string | null;
}

export default function TeamSection({ masters }: { masters: Master[] }) {
  if (!masters.length) return null;

  return (
    <section id="tim" className="team">
      <ScrollReveal direction="up" className="section-header">
        <p className="section-label">Náš tím</p>
        <h2 className="section-title">Majstri svojho remesla</h2>
        <GoldDivider />
        <p className="section-subtitle">Každý z nás prináša unikátny štýl a roky skúseností.</p>
      </ScrollReveal>

      <div className="team-grid">
        {masters.map((member, i) => (
          <ScrollReveal key={member.id} direction="up" delay={i * 120}>
            <div className="team-card">
              <div className="team-photo-container">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={`${member.name} — nechtová technička`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="team-photo"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    unoptimized={member.photo.startsWith('http')}
                  />
                ) : (
                  <div className="team-photo-placeholder">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              {member.bio && <p className="team-exp">{member.bio}</p>}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
