import type { ComponentConfig, PageConfig } from './types';

/**
 * Configuration builder for creating dynamic pages
 */
export class PageBuilder {
  private config: Partial<PageConfig> = {
    components: [],
  };

  constructor(title: string, description?: string) {
    this.config.title = title;
    this.config.description = description;
    this.config.layout = {
      showNavbar: true,
      showFooter: true,
    };
  }

  /**
   * Set SEO configuration
   */
  setSEO(seo: PageConfig['seo']): PageBuilder {
    this.config.seo = seo;
    return this;
  }

  /**
   * Set layout configuration
   */
  setLayout(layout: PageConfig['layout']): PageBuilder {
    this.config.layout = { ...this.config.layout, ...layout };
    return this;
  }

  /**
   * Add a component to the page
   */
  addComponent(component: ComponentConfig): PageBuilder {
    this.config.components = this.config.components || [];
    this.config.components.push(component);
    return this;
  }

  /**
   * Add multiple components
   */
  addComponents(components: ComponentConfig[]): PageBuilder {
    this.config.components = this.config.components || [];
    this.config.components.push(...components);
    return this;
  }

  /**
   * Add a hero section
   */
  addHero(config: {
    title: string;
    subtitle?: string;
    badges?: string[];
    buttons?: Array<{
      text: string;
      href?: string;
      variant?: 'default' | 'neutral' | 'noShadow' | 'reverse';
    }>;
    height?: 'auto' | 'screen' | 'half';
    backgroundPattern?: boolean;
  }): PageBuilder {
    const heroComponent: ComponentConfig = {
      id: 'hero',
      type: 'hero',
      title: config.title,
      subtitle: config.subtitle,
      badges: config.badges,
      height: config.height || 'screen',
      backgroundPattern: config.backgroundPattern !== false,
      buttons: config.buttons?.map((btn, index) => ({
        id: `hero-btn-${index}`,
        type: 'button',
        text: btn.text,
        href: btn.href,
        variant: btn.variant || 'default',
        size: 'lg',
      })),
    };
    return this.addComponent(heroComponent);
  }

  /**
   * Add a section with markdown content
   */
  addMarkdownSection(config: {
    title?: string;
    subtitle?: string;
    content: string;
    background?: 'default' | 'main' | 'muted' | 'gradient' | 'pattern';
    layout?: 'full' | 'contained' | 'narrow' | 'wide';
  }): PageBuilder {
    const sectionComponent: ComponentConfig = {
      id: `section-${Date.now()}`,
      type: 'section',
      title: config.title,
      subtitle: config.subtitle,
      background: config.background,
      children: [
        {
          id: 'content-container',
          type: 'container',
          layout: config.layout || 'narrow',
          padding: 'lg',
          children: [
            {
              id: 'markdown-content',
              type: 'markdown',
              content: config.content,
              size: 'base',
            },
          ],
        },
      ],
    };
    return this.addComponent(sectionComponent);
  }

  /**
   * Add a feature grid section
   */
  addFeatureGrid(config: {
    title?: string;
    subtitle?: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    background?: 'default' | 'main' | 'muted' | 'gradient' | 'pattern';
  }): PageBuilder {
    const sectionComponent: ComponentConfig = {
      id: `features-section-${Date.now()}`,
      type: 'section',
      title: config.title,
      subtitle: config.subtitle,
      background: config.background,
      children: [
        {
          id: 'features-container',
          type: 'container',
          layout: 'contained',
          children: [
            {
              id: 'features-grid',
              type: 'grid',
              columns: { xs: 1, md: config.features.length >= 3 ? 3 : config.features.length },
              gap: 'lg',
              children: config.features.map((feature, index) => ({
                id: `feature-${index}`,
                type: 'featureBox',
                variant: 'small',
                icon: feature.icon,
                title: feature.title,
                description: feature.description,
                rotate: (index % 2 === 0 ? -1 : 1) as -1 | 0 | 1,
              })),
            },
          ],
        },
      ],
    };
    return this.addComponent(sectionComponent);
  }

  /**
   * Add a FAQ section with accordion
   */
  addFAQ(config: {
    title?: string;
    subtitle?: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
    background?: 'default' | 'main' | 'muted' | 'gradient' | 'pattern';
  }): PageBuilder {
    const sectionComponent: ComponentConfig = {
      id: `faq-section-${Date.now()}`,
      type: 'section',
      title: config.title || 'Frequently Asked Questions',
      subtitle: config.subtitle,
      background: config.background,
      children: [
        {
          id: 'faq-container',
          type: 'container',
          layout: 'narrow',
          children: [
            {
              id: 'faq-accordion',
              type: 'accordion',
              allowMultiple: true,
              items: config.questions.map((q) => ({
                title: q.question,
                content: q.answer,
              })),
            },
          ],
        },
      ],
    };
    return this.addComponent(sectionComponent);
  }

  /**
   * Add a card grid section
   */
  addCardGrid(config: {
    title?: string;
    subtitle?: string;
    cards: Array<{
      title: string;
      description: string;
      image?: {
        src: string;
        alt: string;
      };
      button?: {
        text: string;
        href: string;
        variant?: 'default' | 'neutral' | 'noShadow' | 'reverse';
      };
    }>;
    columns?: { xs: number; sm?: number; md?: number; lg?: number };
    background?: 'default' | 'main' | 'muted' | 'gradient' | 'pattern';
  }): PageBuilder {
    const sectionComponent: ComponentConfig = {
      id: `cards-section-${Date.now()}`,
      type: 'section',
      title: config.title,
      subtitle: config.subtitle,
      background: config.background,
      children: [
        {
          id: 'cards-container',
          type: 'container',
          layout: 'contained',
          children: [
            {
              id: 'cards-grid',
              type: 'grid',
              columns: config.columns || { xs: 1, md: 3 },
              gap: 'lg',
              children: config.cards.map((card, index) => ({
                id: `card-${index}`,
                type: 'card',
                title: card.title,
                description: card.description,
                shadow: true,
                hover: true,
                image: card.image
                  ? {
                      id: `card-image-${index}`,
                      type: 'image',
                      src: card.image.src,
                      alt: card.image.alt,
                      aspectRatio: '16:9',
                      objectFit: 'cover',
                      rounded: 'lg',
                    }
                  : undefined,
                footer: card.button
                  ? [
                      {
                        id: `card-button-${index}`,
                        type: 'button',
                        text: card.button.text,
                        href: card.button.href,
                        variant: card.button.variant || 'default',
                      },
                    ]
                  : undefined,
              })),
            },
          ],
        },
      ],
    };
    return this.addComponent(sectionComponent);
  }

  /**
   * Add a spacer
   */
  addSpacer(height: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'lg'): PageBuilder {
    const spacerComponent: ComponentConfig = {
      id: `spacer-${Date.now()}`,
      type: 'spacer',
      height,
    };
    return this.addComponent(spacerComponent);
  }

  /**
   * Add a separator
   */
  addSeparator(config?: {
    orientation?: 'horizontal' | 'vertical';
    thickness?: 'thin' | 'medium' | 'thick';
    color?: 'default' | 'main' | 'muted';
  }): PageBuilder {
    const separatorComponent: ComponentConfig = {
      id: `separator-${Date.now()}`,
      type: 'separator',
      orientation: config?.orientation || 'horizontal',
      thickness: config?.thickness || 'thin',
      color: config?.color || 'default',
    };
    return this.addComponent(separatorComponent);
  }

  /**
   * Add custom CSS
   */
  addCustomCSS(css: string): PageBuilder {
    this.config.customCSS = (this.config.customCSS || '') + '\n' + css;
    return this;
  }

  /**
   * Add custom scripts
   */
  addScript(script: { src?: string; content?: string; position: 'head' | 'body' }): PageBuilder {
    this.config.scripts = this.config.scripts || [];
    this.config.scripts.push(script);
    return this;
  }

  /**
   * Build the final page configuration
   */
  build(): PageConfig {
    if (!this.config.title) {
      throw new Error('Page title is required');
    }
    if (!this.config.components || this.config.components.length === 0) {
      throw new Error('At least one component is required');
    }
    return this.config as PageConfig;
  }
}

/**
 * Quick page creation functions
 */
export const createPrivacyPage = (): PageConfig => {
  return new PageBuilder(
    'Privacy Policy',
    'Learn how we protect your privacy and handle your data.'
  )
    .setSEO({
      keywords: ['privacy policy', 'data protection', 'GDPR'],
    })
    .addHero({
      title: 'Privacy Policy',
      subtitle: 'Your privacy matters to us. Learn how we handle your data.',
      height: 'half',
    })
    .addMarkdownSection({
      content: `
# Information We Collect

We collect information to provide better services to all our users. The types of information we collect include:

## Personal Information
- Name and email address when you create an account
- Payment information for paid services
- Communication preferences

## Usage Information
- How you interact with our service
- Analytics about redirect performance
- Error logs and debugging information

# How We Use Information

We use the information we collect for:
- Providing and maintaining our services
- Processing transactions
- Sending important service updates
- Improving our services

# Information Sharing

We do not sell your personal information. We may share information in these limited circumstances:
- With your consent
- For legal reasons
- With service providers who assist us

# Data Security

We implement industry-standard security measures to protect your information.

# Your Rights

You have the right to access, update, or delete your personal information at any time.

# Contact Us

If you have questions about this privacy policy, contact us at privacy@example.com.
      `,
    })
    .build();
};

export const createTermsPage = (): PageConfig => {
  return new PageBuilder('Terms of Service', 'Terms and conditions for using our services.')
    .setSEO({
      keywords: ['terms of service', 'terms and conditions', 'legal'],
    })
    .addHero({
      title: 'Terms of Service',
      subtitle: 'Please read these terms carefully before using our services.',
      height: 'half',
    })
    .addMarkdownSection({
      content: `
# Acceptance of Terms

By using our service, you agree to these terms.

# Description of Service

Our service provides domain redirection and URL forwarding capabilities.

# User Responsibilities

You are responsible for:
- Maintaining account security
- Complying with applicable laws
- Not misusing our service

# Service Availability

We strive for 99.9% uptime but cannot guarantee uninterrupted service.

# Limitation of Liability

Our liability is limited to the amount you paid for the service.

# Termination

We may terminate accounts that violate these terms.

# Changes to Terms

We may update these terms from time to time.

# Contact Information

For questions about these terms, contact us at legal@example.com.
      `,
    })
    .build();
};

export const createAboutPage = (): PageConfig => {
  return new PageBuilder('About Us', 'Learn about our company and mission.')
    .setSEO({
      keywords: ['about us', 'company', 'mission'],
    })
    .addHero({
      title: 'About Our Company',
      subtitle: "We're passionate about making domain redirection simple and reliable.",
      badges: ['#Innovation', '#Quality', '#Service'],
    })
    .addMarkdownSection({
      title: 'Our Story',
      content: `
We started this company because we saw how complex domain redirection had become. 
Our mission is to simplify this process while providing enterprise-grade reliability and security.

Founded in 2024, we've quickly grown to serve thousands of customers worldwide.
      `,
    })
    .addFeatureGrid({
      title: 'Why Choose Us',
      features: [
        {
          icon: 'Zap',
          title: 'Lightning Fast',
          description: 'Global CDN ensures your redirects are blazing fast.',
        },
        {
          icon: 'Shield',
          title: 'Secure',
          description: 'Enterprise-grade security with SSL by default.',
        },
        {
          icon: 'HeartHandshake',
          title: 'Reliable',
          description: '99.9% uptime with 24/7 monitoring.',
        },
      ],
    })
    .build();
};

/**
 * Validation utilities
 */
export const validatePageConfig = (config: PageConfig): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config.title) {
    errors.push('Title is required');
  }

  if (!config.components || config.components.length === 0) {
    errors.push('At least one component is required');
  }

  // Validate component IDs are unique
  if (config.components) {
    const ids = config.components.map((c) => c.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      errors.push(`Duplicate component IDs found: ${duplicateIds.join(', ')}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
