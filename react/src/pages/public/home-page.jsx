import { HeroSection } from '../../features/home/components/hero-section';
import { CollageGallerySection } from '../../features/home/components/collage-gallery-section';
import { AuthorServicesSection } from '../../features/home/components/author-services-section';
import { DualModalitySection } from '../../features/home/components/dual-modality-section';
import { QuickBookingSection } from '../../features/home/components/quick-booking-section';
import { LocationHoursSection } from '../../features/home/components/location-hours-section';

export function HomePage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <HeroSection />
      <CollageGallerySection />
      <AuthorServicesSection />
      <DualModalitySection />
      <QuickBookingSection />
      <LocationHoursSection />
    </div>
  );
}

export default HomePage;
