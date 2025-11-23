import ComparisonSection from '@/components/Landing/components/ComparisonSection';
import FAQSection from '@/components/Landing/components/FAQSection';
import Features from '@/components/Landing/components/Features';
import FeaturesStacking from '@/components/Landing/components/FeaturesStacking';
import Footer from '@/components/Landing/components/Footer';
import HeroSection from '@/components/Landing/components/HeroSection';
import MarqueeSection from '@/components/Landing/components/Marquee';
import PlansSection from '@/components/Landing/components/PlansSection';
import {
  FAQSchema,
  OrganizationSchema,
  SoftwareApplicationSchema,
  WebsiteSchema,
} from '@/components/StructuredData';

export const revalidate = 600; // Revalidate every hour

const FAQS = [
  {
    question: 'How do I get started?',
    answer:
      'Simply sign up for a free account, create your first redirect, and start tracking your traffic—all through our user-friendly interface.',
  },
  {
    question: 'Can I integrate my redirects with my existing apps?',
    answer:
      'Yes! Our advanced API lets you seamlessly incorporate redirection functionality into your applications and workflows.',
  },
  {
    question: 'How secure is my data?',
    answer:
      'Security and privacy are top priorities. We utilize a secure global network to ensure fast, safe redirection while keeping your data compliant with industry standards.',
  },
  {
    question: 'Do you offer analytics?',
    answer:
      'Absolutely. Our dashboard provides detailed insights into your traffic, helping you optimize performance and understand user behavior.',
  },
  {
    question: 'What if I need help?',
    answer:
      'Our support team is here for you. Visit our support center or contact us directly for any assistance.',
  },
];

const Home: React.FC = () => {
  return (
    <div className="text-primaryBlack">
      <OrganizationSchema />
      <WebsiteSchema />
      <SoftwareApplicationSchema />
      <FAQSchema faqs={FAQS} />
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
