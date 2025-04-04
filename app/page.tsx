import ComparisonSection from '@/components/Landing/components/ComparisonSection';
import FAQSection from '@/components/Landing/components/FAQSection';
import Features from '@/components/Landing/components/Features';
import Footer from '@/components/Landing/components/Footer';
import HeroSection from '@/components/Landing/components/HeroSection';
import MarqueeSection from '@/components/Landing/components/Marquee';
import Navbar from '@/components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="text-primaryBlack">
      <Navbar />
      <HeroSection />
      <MarqueeSection endText="PERFECT ROUTE" startText="EVERY CLICK DESERVES THE" />
      <Features />
      <MarqueeSection endText="GROW FASTER" startText="NAVIGATE BETTER, " />
      <ComparisonSection />
      <MarqueeSection endText="OUR TRAIL" startText="YOUR TRAFFIC, " />
      <FAQSection />
      <Footer />
      {/* <Main /> */}
    </div>
  );
};

export default Home;
