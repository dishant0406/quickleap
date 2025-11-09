import { FileText, Github, Map } from 'lucide-react';
import Link from 'next/link';

import Logo from '@/components/Micro/Logo';

const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primaryBlack text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo width={120} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Effortless domain redirection service with zero hosting required. Streamline your
              traffic flow with our secure, fast, and easy-to-use platform.
            </p>
          </div>

          {/* Features */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/features/easy-setup"
                >
                  Easy Setup
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/features/analytics"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/features/custom-domains"
                >
                  Custom Domains
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/features/rules"
                >
                  Rule-Based Redirects
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/features/api-integration"
                >
                  API Integration
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/features/security"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm"
                  href="/terms"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm flex items-center gap-2"
                  href="https://github.com/dishant0406/redirects"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm flex items-center gap-2"
                  href="/sitemap.xml"
                  target="_blank"
                >
                  <Map className="w-4 h-4" />
                  Sitemap
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-[#FFDB58] transition-colors text-sm flex items-center gap-2"
                  href="/llm.txt"
                  target="_blank"
                >
                  <FileText className="w-4 h-4" />
                  LLM.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left text-sm">
              &copy; {currentYear} Quickleap - Domain Redirecting Service hassle-free
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <span className="mr-1">Made with ❤️ by </span>
              <a
                className="hover:text-yellow-400 transition-colors flex items-center"
                href="https://www.linkedin.com/in/dishant0406/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Dishant Sharma</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
