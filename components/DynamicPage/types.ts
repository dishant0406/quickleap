// Type definitions for dynamic page components

// Base component configuration
export interface BaseComponentConfig {
  id: string;
  type: string;
  className?: string;
  animation?: {
    type: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoom' | 'bounce';
    delay?: number;
    duration?: number;
  };
}

// Layout configurations
export interface ContainerConfig extends BaseComponentConfig {
  type: 'container';
  layout: 'full' | 'contained' | 'narrow' | 'wide';
  background?: 'default' | 'main' | 'muted' | 'gradient' | 'pattern';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: ComponentConfig[];
}

export interface GridConfig extends BaseComponentConfig {
  type: 'grid';
  columns: {
    xs: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  children: ComponentConfig[];
}

export interface FlexConfig extends BaseComponentConfig {
  type: 'flex';
  direction: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  children: ComponentConfig[];
}

// Content components
export interface HeadingConfig extends BaseComponentConfig {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'default' | 'main' | 'muted' | 'accent';
  align?: 'left' | 'center' | 'right';
}

export interface TextConfig extends BaseComponentConfig {
  type: 'text';
  content: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'main' | 'muted' | 'accent';
  align?: 'left' | 'center' | 'right';
}

export interface MarkdownConfig extends BaseComponentConfig {
  type: 'markdown';
  content: string;
  size?: 'sm' | 'base' | 'lg';
  color?: 'default' | 'main' | 'muted';
}

export interface ImageConfig extends BaseComponentConfig {
  type: 'image';
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  caption?: string;
}

export interface ButtonConfig extends BaseComponentConfig {
  type: 'button';
  text: string;
  variant?: 'default' | 'neutral' | 'noShadow' | 'reverse';
  size?: 'sm' | 'default' | 'lg';
  href?: string;
  onClick?: string; // Function name or action
  icon?: string; // Lucide icon name
  disabled?: boolean;
}

export interface BadgeConfig extends BaseComponentConfig {
  type: 'badge';
  text: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'default' | 'lg';
}

export interface CardConfig extends BaseComponentConfig {
  type: 'card';
  title?: string;
  description?: string;
  image?: ImageConfig;
  footer?: ComponentConfig[];
  children?: ComponentConfig[];
  shadow?: boolean;
  hover?: boolean;
}

export interface AccordionConfig extends BaseComponentConfig {
  type: 'accordion';
  items: {
    title: string;
    content: string | ComponentConfig[];
  }[];
  allowMultiple?: boolean;
}

export interface TabsConfig extends BaseComponentConfig {
  type: 'tabs';
  items: {
    label: string;
    value: string;
    content: ComponentConfig[];
  }[];
  defaultValue?: string;
}

export interface FeatureBoxConfig extends BaseComponentConfig {
  type: 'featureBox';
  icon: string; // Lucide icon name
  title: string;
  description: string;
  variant: 'big' | 'small';
  rotate?: -1 | 0 | 1;
}

export interface HeroConfig extends BaseComponentConfig {
  type: 'hero';
  badges?: string[];
  title: string;
  subtitle?: string;
  buttons?: ButtonConfig[];
  backgroundPattern?: boolean;
  height?: 'auto' | 'screen' | 'half';
}

export interface SectionConfig extends BaseComponentConfig {
  type: 'section';
  title?: string;
  subtitle?: string;
  background?: 'default' | 'main' | 'muted' | 'gradient' | 'pattern';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: ComponentConfig[];
}

export interface SpacerConfig extends BaseComponentConfig {
  type: 'spacer';
  height: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export interface SeparatorConfig extends BaseComponentConfig {
  type: 'separator';
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: 'default' | 'main' | 'muted';
}

// Union type for all component configurations
export type ComponentConfig =
  | ContainerConfig
  | GridConfig
  | FlexConfig
  | HeadingConfig
  | TextConfig
  | MarkdownConfig
  | ImageConfig
  | ButtonConfig
  | BadgeConfig
  | CardConfig
  | AccordionConfig
  | TabsConfig
  | FeatureBoxConfig
  | HeroConfig
  | SectionConfig
  | SpacerConfig
  | SeparatorConfig;

// Main page configuration
export interface PageConfig {
  title: string;
  description?: string;
  favicon?: string;
  theme?: 'light' | 'dark' | 'system';
  noIndex?: boolean; // Controls whether search engines should index this page
  layout: {
    showNavbar?: boolean;
    showFooter?: boolean;
    navbarConfig?: {
      logo?: string;
      links?: Array<{
        label: string;
        href: string;
        external?: boolean;
      }>;
    };
    footerConfig?: {
      content?: ComponentConfig[];
    };
  };
  components: ComponentConfig[];
  seo?: {
    keywords?: string[];
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
  };
  customCSS?: string;
  scripts?: Array<{
    src?: string;
    content?: string;
    position: 'head' | 'body';
  }>;
}
