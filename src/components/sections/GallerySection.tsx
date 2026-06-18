import Image from 'next/image';
import { GALLERY_IMAGES } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GoldDivider from '@/components/ui/GoldDivider';

export default function GallerySection() {
  return (
    <section id="gallery" className="section-full">
      <div className="section">
        <ScrollReveal className="section-header">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Our Work</h2>
          <GoldDivider />
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up" delay={150}>
        <div className="gallery-grid">
          {GALLERY_IMAGES.map((image) => (
            <div key={image.src} className="gallery-item">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="gallery-item__image"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="gallery-item__overlay" />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
