// React imports
import React from 'react';

import Script from 'next/script';

// Local imports
import Footer from '../Landing/components/Footer';

import { ComponentRenderer } from './ComponentRenderer';

import type { PageConfig } from './types';

interface DynamicPageProps {
  config: PageConfig;
  className?: string;
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ config, className }) => {
  return (
    <>
      {/* Custom CSS */}
      {config.customCSS && <style dangerouslySetInnerHTML={{ __html: config.customCSS }} />}

      {/* Head Scripts */}
      {config.scripts
        ?.filter((script) => script.position === 'head')
        .map((script, index) =>
          script.src ? (
            <Script key={index} src={script.src} strategy="lazyOnload" />
          ) : script.content ? (
            <Script key={index} id={`head-script-${index}`} strategy="lazyOnload">
              {script.content}
            </Script>
          ) : null
        )}

      {/* Main Page Content */}
      <div className={className}>
        {/* Render all components */}
        {config.components.map((component, index) => (
          <ComponentRenderer key={`page-component-${index}`} config={component} />
        ))}
      </div>

      {/* Body Scripts */}
      {config.scripts
        ?.filter((script) => script.position === 'body')
        .map((script, index) =>
          script.src ? (
            <Script key={index} src={script.src} strategy="afterInteractive" />
          ) : script.content ? (
            <Script key={index} id={`body-script-${index}`} strategy="afterInteractive">
              {script.content}
            </Script>
          ) : null
        )}

      <Footer />
    </>
  );
};

export default DynamicPage;
