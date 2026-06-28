import Image from 'next/image';
import { ABOUT } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { BLUR_PLACEHOLDER } from '@/components/ui/BlurImage';

interface AboutSectionProps {
  aboutImage?: string | null;
}

export default function AboutSection({ aboutImage }: AboutSectionProps) {
  const titleLines = ABOUT.title.split('\n');
  const imageSrc = aboutImage || ABOUT.image;

  return (
    <section id="o-nas" className="about">
      <div className="about__grid">
        <ScrollReveal direction="left">
          <div className="about__image-wrap">
            <Image
              src={imageSrc}
              alt={ABOUT.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="about__image"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              unoptimized={imageSrc.startsWith('http')}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={150}>
          <div>
            <p className="about__label">{ABOUT.badge}</p>
            <h3 className="about__title">
              {titleLines[0]}
              {titleLines[1] && (
                <>
                  <br />
                  {titleLines[1]}
                </>
              )}
            </h3>
            {ABOUT.paragraphs.map((text, i) => {
              if (ABOUT.highlightText && text.includes(ABOUT.highlightText)) {
                const [before, after] = text.split(ABOUT.highlightText);
                return (
                  <p key={i} className="about__text">
                    {before}
                    <strong>{ABOUT.highlightText}</strong>
                    {after}
                  </p>
                );
              }
              return (
                <p key={i} className="about__text">
                  {text}
                </p>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
