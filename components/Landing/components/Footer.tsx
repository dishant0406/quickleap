import { Github } from 'lucide-react';

import Logo from '@/components/Micro/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primaryBlack text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Logo width={100} />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a
              className="flex items-center gap-2 hover:text-[#FFDB58] transition-colors"
              href="https://github.com/dishant0406/redirects"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} Quickleap - Domain Redirecting Service hassle-free
            </p>
            <div className="flex items-center text-gray-400 mt-4 md:mt-0">
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
