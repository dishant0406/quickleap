// React imports
import React from 'react';

import Head from 'next/head';
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
      {/* SEO and Head Management */}
      <Head>
        <title>{config.title}</title>
        {config.description && <meta content={config.description} name="description" />}
        {config.favicon && <link href={config.favicon} rel="icon" />}

        {/* Robots meta tag - controls indexing */}
        <meta content={config.noIndex ? 'noindex, nofollow' : 'index, follow'} name="robots" />

        {/* SEO Meta Tags */}
        {config.seo?.keywords && <meta content={config.seo.keywords.join(', ')} name="keywords" />}
        {config.seo?.ogImage && <meta content={config.seo.ogImage} property="og:image" />}
        {config.seo?.twitterCard && <meta content={config.seo.twitterCard} name="twitter:card" />}

        <meta content={config.title} property="og:title" />
        {config.description && <meta content={config.description} property="og:description" />}

        {/* Theme */}
        {config.theme && (
          <meta content={config.theme === 'dark' ? '#212121' : '#ffffff'} name="theme-color" />
        )}

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
      </Head>

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
