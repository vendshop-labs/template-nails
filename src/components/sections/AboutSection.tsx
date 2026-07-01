import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ABOUT } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface AboutSectionProps {
  aboutImage?: string | null;
  description?: string | null;
}

export default function AboutSection({ aboutImage, description }: AboutSectionProps) {
  const t = useTranslations('about');
  const titleLines = t('title').split('\n');

  return (
    <section id="o-nas" className="about">
      <div className="about__grid">
        <ScrollReveal direction="left">
          <div className="about__image-wrap">
            {aboutImage ? (
              <Image
                src={aboutImage}
                alt={ABOUT.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={aboutImage.startsWith('http')}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            ) : (
              <div className="about__image-placeholder" aria-label={ABOUT.imageAlt} />
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={150}>
          <div>
            <p className="about__label">{t('badge')}</p>
            <h3 className="about__title">
              {titleLines[0]}
              {titleLines[1] && (
                <>
                  <br />
                  {titleLines[1]}
                </>
              )}
            </h3>
            {description ? (
              <p className="about__text">{description}</p>
            ) : (
              <>
                <p className="about__text">{t('paragraph1')}</p>
                <p className="about__text">
                  {(() => {
                    const highlight = t('paragraph2Highlight');
                    const full = t('paragraph2');
                    const [before, after] = full.split(highlight);
                    return <>{before}<strong>{highlight}</strong>{after}</>;
                  })()}
                </p>
                <p className="about__text">{t('paragraph3')}</p>
              </>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
