import HeroSection from './_components/hero';
import NewsSection from './_components/news';
import ServiceDetails from '~/components/services/service-details';
import RecoverySection from './_components/recovery';
import CtaSection from './_components/cta';
import IntroductionSection from './_components/introduction';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <IntroductionSection />
      <ServiceDetails />
      <NewsSection />
      <RecoverySection />
      <CtaSection />
    </div>
  );
}
