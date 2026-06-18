import { setRequestLocale } from 'next-intl/server';
import { features } from '@/lib/features';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TeamSection from '@/components/sections/TeamSection';
import GallerySection from '@/components/sections/GallerySection';
import BookingSection from '@/components/sections/BookingSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CoursesSection from '@/components/sections/CoursesSection';
import CtaSection from '@/components/sections/CtaSection';

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <ServicesSection />
      {features.team && <TeamSection />}
      {features.gallery && <GallerySection />}
      <BookingSection />
      {features.digital && features.courses && <CoursesSection />}
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
