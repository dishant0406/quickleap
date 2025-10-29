import ComparisonSection from '@/components/Landing/components/ComparisonSection';
import FAQSection from '@/components/Landing/components/FAQSection';
import Features from '@/components/Landing/components/Features';
import FeaturesStacking from '@/components/Landing/components/FeaturesStacking';
import Footer from '@/components/Landing/components/Footer';
import HeroSection from '@/components/Landing/components/HeroSection';
import MarqueeSection from '@/components/Landing/components/Marquee';
import PlansSection from '@/components/Landing/components/PlansSection';

const Home: React.FC = () => {
  return (
    <div className="text-primaryBlack">
      <HeroSection />
      <MarqueeSection endText="PERFECT ROUTE" startText="EVERY CLICK DESERVES THE" />
      <Features />
      <MarqueeSection endText="GROW FASTER" startText="NAVIGATE BETTER, " />
      <FeaturesStacking />
      <MarqueeSection endText="OUR TRAIL" startText="YOUR TRAFFIC, " />
      <ComparisonSection />
      <MarqueeSection endText="ADVANCED SOLUTIONS" startText="POWERFUL FEATURES, " />
      <PlansSection />
      <MarqueeSection endText="YOUR SUCCESS" startText="INVEST IN " />
      <FAQSection />
      <Footer />
      {/* <Main /> */}
    </div>
  );
};

export default Home;
