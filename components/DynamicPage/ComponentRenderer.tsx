'use client';

import React from 'react';

import * as LucideIcons from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import type {
  AccordionConfig,
  BadgeConfig,
  ButtonConfig,
  CardConfig,
  ComponentConfig,
  ContainerConfig,
  FeatureBoxConfig,
  FlexConfig,
  GridConfig,
  HeadingConfig,
  HeroConfig,
  ImageConfig,
  MarkdownConfig,
  SectionConfig,
  SeparatorConfig,
  SpacerConfig,
  TabsConfig,
  TextConfig,
} from './types';

interface ComponentRendererProps {
  config: ComponentConfig;
  className?: string;
}

// Animation classes mapping
const getAnimationClasses = (animation?: ComponentConfig['animation']): string => {
  if (!animation) return '';

  const { type, delay = 0, duration = 500 } = animation;
  const baseClasses = 'transition-all';

  const animationStyles = {
    fadeIn: 'animate-in fade-in',
    slideUp: 'animate-in slide-in-from-bottom-4',
    slideLeft: 'animate-in slide-in-from-right-4',
    slideRight: 'animate-in slide-in-from-left-4',
    zoom: 'animate-in zoom-in-95',
    bounce: 'animate-bounce',
  };

  return cn(
    baseClasses,
    animationStyles[type],
    delay > 0 && `delay-[${delay}ms]`,
    duration !== 500 && `duration-[${duration}ms]`
  );
};

// Layout helpers
const getContainerClasses = (layout: ContainerConfig['layout']): string => {
  const layouts = {
    full: 'w-full',
    contained: 'container mx-auto px-4',
    narrow: 'max-w-3xl mx-auto px-4',
    wide: 'max-w-7xl mx-auto px-4',
  };
  return layouts[layout];
};

const getBackgroundClasses = (background?: string): string => {
  const backgrounds = {
    default: 'bg-bg',
    main: 'bg-main',
    muted: 'bg-bw',
    gradient: 'bg-gradient-to-br from-bg to-main',
    pattern: cn(
      '[background-size:40px_40px]',
      '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
      'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
    ),
  };
  return background ? backgrounds[background as keyof typeof backgrounds] || '' : '';
};

const getPaddingClasses = (padding?: string): string => {
  const paddings = {
    none: '',
    sm: 'p-4 md:p-6',
    md: 'p-6 md:p-8 lg:p-10',
    lg: 'p-8 md:p-12 lg:p-16',
    xl: 'p-12 md:p-16 lg:p-20',
  };
  return padding ? paddings[padding as keyof typeof paddings] || '' : '';
};

const getGridClasses = (columns: GridConfig['columns']): string => {
  const { xs, sm, md, lg, xl } = columns;

  const xsClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    }[xs] || 'grid-cols-1';

  const smClass = sm
    ? {
        1: 'sm:grid-cols-1',
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
        5: 'sm:grid-cols-5',
        6: 'sm:grid-cols-6',
        12: 'sm:grid-cols-12',
      }[sm]
    : '';

  const mdClass = md
    ? {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
        6: 'md:grid-cols-6',
        12: 'md:grid-cols-12',
      }[md]
    : '';

  const lgClass = lg
    ? {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        5: 'lg:grid-cols-5',
        6: 'lg:grid-cols-6',
        12: 'lg:grid-cols-12',
      }[lg]
    : '';

  const xlClass = xl
    ? {
        1: 'xl:grid-cols-1',
        2: 'xl:grid-cols-2',
        3: 'xl:grid-cols-3',
        4: 'xl:grid-cols-4',
        5: 'xl:grid-cols-5',
        6: 'xl:grid-cols-6',
        12: 'xl:grid-cols-12',
      }[xl]
    : '';

  return cn('grid', xsClass, smClass, mdClass, lgClass, xlClass);
};

const getGapClasses = (gap?: string): string => {
  const gaps = {
    xs: 'gap-1 sm:gap-2',
    sm: 'gap-2 sm:gap-3 md:gap-4',
    md: 'gap-3 sm:gap-4 md:gap-6 lg:gap-8',
    lg: 'gap-4 sm:gap-6 md:gap-8 lg:gap-10',
    xl: 'gap-6 sm:gap-8 md:gap-12 lg:gap-16',
  };
  return gap ? gaps[gap as keyof typeof gaps] || 'gap-4 md:gap-6' : 'gap-4 md:gap-6';
};

// Component renderers
const renderContainer = (config: ContainerConfig): React.ReactElement => (
  <div
    className={cn(
      getContainerClasses(config.layout),
      getBackgroundClasses(config.background),
      getPaddingClasses(config.padding),
      getAnimationClasses(config.animation),
      'space-y-4 md:space-y-6 lg:space-y-8',
      config.className
    )}
  >
    {config.children.map((child, index) => (
      <ComponentRenderer key={`${config.id}-${index}`} config={child} />
    ))}
  </div>
);

const renderGrid = (config: GridConfig): React.ReactElement => (
  <div
    className={cn(
      getGridClasses(config.columns),
      getGapClasses(config.gap),
      getAnimationClasses(config.animation),
      config.className
    )}
  >
    {config.children.map((child, index) => (
      <ComponentRenderer key={`${config.id}-${index}`} config={child} />
    ))}
  </div>
);

const renderFlex = (config: FlexConfig): React.ReactElement => {
  const direction = config.direction === 'column' ? 'flex-col' : 'flex-row';
  const align = config.align ? `items-${config.align}` : '';
  const justify = config.justify ? `justify-${config.justify}` : '';
  const wrap = config.wrap ? 'flex-wrap' : '';

  return (
    <div
      className={cn(
        'flex',
        direction,
        align,
        justify,
        wrap,
        getGapClasses(config.gap),
        getAnimationClasses(config.animation),
        config.className
      )}
    >
      {config.children.map((child, index) => (
        <ComponentRenderer key={`${config.id}-${index}`} config={child} />
      ))}
    </div>
  );
};

const renderHeading = (config: HeadingConfig): React.ReactElement => {
  const sizeClasses = {
    xs: 'text-xs md:text-sm',
    sm: 'text-sm md:text-base',
    md: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl lg:text-5xl',
    '4xl': 'text-4xl md:text-5xl lg:text-6xl',
    '5xl': 'text-5xl md:text-6xl lg:text-7xl',
    '6xl': 'text-6xl md:text-7xl lg:text-8xl',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const colorClasses = {
    default: 'text-text',
    main: 'text-main',
    muted: 'text-mtext',
    accent: 'text-primaryBlack',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const className = cn(
    'font-heading leading-tight',
    config.size && sizeClasses[config.size],
    config.weight && weightClasses[config.weight],
    config.color && colorClasses[config.color],
    config.align && alignClasses[config.align],
    getAnimationClasses(config.animation),
    config.className
  );

  const content = config.text;

  switch (config.level) {
    case 1:
      return <h1 className={className}>{content}</h1>;
    case 2:
      return <h2 className={className}>{content}</h2>;
    case 3:
      return <h3 className={className}>{content}</h3>;
    case 4:
      return <h4 className={className}>{content}</h4>;
    case 5:
      return <h5 className={className}>{content}</h5>;
    case 6:
      return <h6 className={className}>{content}</h6>;
    default:
      return <h1 className={className}>{content}</h1>;
  }
};

const renderText = (config: TextConfig): React.ReactElement => {
  const sizeClasses = {
    xs: 'text-xs md:text-sm',
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClasses = {
    default: 'text-text',
    main: 'text-main',
    muted: 'text-mtext',
    accent: 'text-primaryBlack',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <p
      className={cn(
        'font-base leading-relaxed',
        config.size && sizeClasses[config.size],
        config.weight && weightClasses[config.weight],
        config.color && colorClasses[config.color],
        config.align && alignClasses[config.align],
        getAnimationClasses(config.animation),
        config.className
      )}
    >
      {config.content}
    </p>
  );
};

const renderMarkdown = (config: MarkdownConfig): React.ReactElement => {
  const sizeClasses = {
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
  };

  const colorClasses = {
    default: 'text-text',
    main: 'text-main',
    muted: 'text-mtext',
  };

  // Custom overrides for all HTML elements based on design system
  const markdownOverrides = {
    // Headings
    h1: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
          {...props}
          className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-primaryBlack dark:text-white mb-6 mt-8 leading-tight"
        >
          {children}
        </h1>
      ),
    },
    h2: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        return (
          <h2
            {...props}
            className="font-bold text-2xl md:text-3xl lg:text-4xl text-primaryBlack dark:text-white mb-4 mt-6 leading-tight"
          >
            {children}
          </h2>
        );
      },
    },
    h3: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
          {...props}
          className="font-bold text-xl md:text-2xl lg:text-3xl text-primaryBlack dark:text-white mb-3 mt-5 leading-tight"
        >
          {children}
        </h3>
      ),
    },
    h4: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
          {...props}
          className="font-semibold text-lg md:text-xl lg:text-2xl text-primaryBlack dark:text-white mb-2 mt-4 leading-tight"
        >
          {children}
        </h4>
      ),
    },
    h5: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5
          {...props}
          className="font-semibold text-base md:text-lg lg:text-xl text-primaryBlack dark:text-white mb-2 mt-3 leading-tight"
        >
          {children}
        </h5>
      ),
    },
    h6: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6
          {...props}
          className="font-medium text-sm md:text-base lg:text-lg text-primaryBlack dark:text-white mb-2 mt-3 leading-tight"
        >
          {children}
        </h6>
      ),
    },

    // Paragraphs
    p: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props} className="text-base md:text-lg leading-7 mb-4 text-text dark:text-white">
          {children}
        </p>
      ),
    },

    // Lists
    ul: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul {...props} className="list-disc list-inside my-4 space-y-1 text-text dark:text-white">
          {children}
        </ul>
      ),
    },
    ol: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol
          {...props}
          className="list-decimal list-inside my-4 space-y-1 text-text dark:text-white"
        >
          {children}
        </ol>
      ),
    },
    li: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li {...props} className="my-1 leading-6 text-base md:text-lg text-text dark:text-white">
          {children}
        </li>
      ),
    },

    // Links
    a: {
      component: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
          {...props}
          className="text-main font-medium no-underline hover:underline transition-all duration-200 hover:text-primaryBlack dark:hover:text-white"
          href={href}
        >
          {children}
        </a>
      ),
    },

    // Emphasis
    strong: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <strong {...props} className="font-bold text-text dark:text-white">
          {children}
        </strong>
      ),
    },
    em: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <em {...props} className="italic text-mtext dark:text-white">
          {children}
        </em>
      ),
    },

    // Code
    code: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code {...props} className="px-1 py-0.5 rounded text-sm font-mono text-bg">
          {children}
        </code>
      ),
    },
    pre: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
          {...props}
          className="bg-primaryBlack text-white p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono border border-border"
        >
          {children}
        </pre>
      ),
    },

    // Blockquotes
    blockquote: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
          {...props}
          className="border-l-4 border-main pl-4 italic my-4 text-mtext dark:text-white bg-bg dark:bg-bw p-4 rounded-r-lg"
        >
          {children}
        </blockquote>
      ),
    },

    // Tables
    table: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto my-4">
          <table {...props} className="w-full border-collapse border border-border rounded-lg">
            {children}
          </table>
        </div>
      ),
    },
    thead: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead {...props} className="bg-bg dark:bg-bw">
          {children}
        </thead>
      ),
    },
    tbody: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody {...props}>{children}</tbody>
      ),
    },
    tr: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
          {...props}
          className="border-b border-border hover:bg-bg dark:hover:bg-bw transition-colors"
        >
          {children}
        </tr>
      ),
    },
    th: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
          {...props}
          className="border border-border p-3 text-left font-semibold text-primaryBlack dark:text-white"
        >
          {children}
        </th>
      ),
    },
    td: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td {...props} className="border border-border p-3 text-text dark:text-white">
          {children}
        </td>
      ),
    },

    // Horizontal Rule
    hr: {
      component: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
        <hr {...props} className="my-8 border-0 h-px bg-border" />
      ),
    },

    // Images with Next.js optimization
    img: {
      component: ({
        alt = '',
        src = '',
        width,
        height,
        ...props
      }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <Image
          {...props}
          alt={alt}
          className="max-w-full h-auto rounded-lg border-2 border-border shadow-shadow my-4"
          height={Number(height) || 400}
          src={src}
          width={Number(width) || 800}
        />
      ),
    },
  };

  return (
    <div
      className={cn(
        'max-w-none',
        // Base responsive text size
        config.size && sizeClasses[config.size],
        config.color && colorClasses[config.color],
        getAnimationClasses(config.animation),
        config.className
      )}
    >
      <Markdown
        options={{
          overrides: markdownOverrides,
          wrapper: React.Fragment,
        }}
      >
        {config.content}
      </Markdown>
    </div>
  );
};

const renderImage = (config: ImageConfig): React.ReactElement => {
  const aspectRatioClasses = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    auto: '',
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <figure className={cn(getAnimationClasses(config.animation), config.className)}>
      <div
        className={cn(
          'relative overflow-hidden border-2 border-border',
          config.aspectRatio && aspectRatioClasses[config.aspectRatio],
          config.rounded && roundedClasses[config.rounded]
        )}
      >
        <Image
          alt={config.alt}
          className={cn('w-full h-full', config.objectFit && objectFitClasses[config.objectFit])}
          height={config.height || 600}
          src={config.src}
          width={config.width || 800}
        />
      </div>
      {config.caption && (
        <figcaption className="mt-2 text-sm text-mtext text-center">{config.caption}</figcaption>
      )}
    </figure>
  );
};

const renderButton = (config: ButtonConfig): React.ReactElement => {
  const IconComponent = config.icon
    ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
        config.icon
      ]
    : null;

  return (
    <Button
      className={cn(getAnimationClasses(config.animation), config.className)}
      disabled={config.disabled}
      href={config.href}
      size={config.size}
      variant={config.variant}
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      {config.text}
    </Button>
  );
};

const renderBadge = (config: BadgeConfig): React.ReactElement => (
  <Badge
    className={cn(
      config.size === 'sm' && 'text-xs px-2 py-1',
      config.size === 'lg' && 'text-lg px-4 py-2',
      getAnimationClasses(config.animation),
      config.className
    )}
    variant={
      config.variant === 'secondary' ||
      config.variant === 'destructive' ||
      config.variant === 'outline'
        ? 'default'
        : config.variant
    }
  >
    {config.text}
  </Badge>
);

const renderCard = (config: CardConfig): React.ReactElement => (
  <Card
    className={cn(
      'w-full h-full flex flex-col min-w-0', // Added w-full and min-w-0 to prevent squashing
      config.shadow && 'shadow-shadow',
      config.hover &&
        'hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all duration-300 cursor-pointer',
      getAnimationClasses(config.animation),
      config.className
    )}
  >
    {config.image && (
      <div className="p-4 md:p-6 pb-0">
        <ComponentRenderer config={config.image} />
      </div>
    )}
    {(config.title || config.description) && (
      <CardHeader className="pb-4">
        {config.title && (
          <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">
            {config.title}
          </CardTitle>
        )}
        {config.description && (
          <CardDescription className="text-sm md:text-base text-mtext leading-relaxed">
            {config.description}
          </CardDescription>
        )}
      </CardHeader>
    )}
    {config.children && (
      <CardContent className="flex-1 space-y-3 md:space-y-4">
        {config.children.map((child, index) => (
          <ComponentRenderer key={`${config.id}-${index}`} config={child} />
        ))}
      </CardContent>
    )}
    {config.footer && (
      <CardContent className="pt-0 mt-auto">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {config.footer.map((child, index) => (
            <ComponentRenderer key={`${config.id}-footer-${index}`} config={child} />
          ))}
        </div>
      </CardContent>
    )}
  </Card>
);

const renderAccordion = (config: AccordionConfig): React.ReactElement => (
  <div className={cn('space-y-2', getAnimationClasses(config.animation), config.className)}>
    <Accordion className="w-full" type={config.allowMultiple ? 'multiple' : 'single'}>
      {config.items.map((item, index) => (
        <AccordionItem
          key={`${config.id}-${index}`}
          className="mb-4 last:mb-0 "
          value={`item-${index}`}
        >
          <AccordionTrigger>
            <span className="text-base md:text-lg">{item.title}</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="text-mtext pt-4 leading-relaxed">
              {typeof item.content === 'string' ? (
                <p className="text-sm md:text-base leading-6">{item.content}</p>
              ) : (
                <div className="space-y-3">
                  {item.content.map((child, childIndex) => (
                    <ComponentRenderer key={`${config.id}-${index}-${childIndex}`} config={child} />
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

const renderTabs = (config: TabsConfig): React.ReactElement => (
  <div className={cn('w-full', getAnimationClasses(config.animation), config.className)}>
    <Tabs className="w-full" defaultValue={config.defaultValue || config.items[0]?.value}>
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-6 md:mb-8 bg-bg border border-border">
        {config.items.map((item) => (
          <TabsTrigger
            key={item.value}
            className="text-sm md:text-base font-medium data-[state=active]:bg-main data-[state=active]:text-mtext"
            value={item.value}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {config.items.map((item) => (
        <TabsContent key={item.value} className="mt-0 space-y-4 md:space-y-6" value={item.value}>
          {item.content.map((child, index) => (
            <ComponentRenderer key={`${config.id}-${item.value}-${index}`} config={child} />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  </div>
);

const renderFeatureBox = (config: FeatureBoxConfig): React.ReactElement => {
  const IconComponent = (
    LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
  )[config.icon];
  const rotateClasses = {
    '-1': '-rotate-1 hover:rotate-0',
    0: 'hover:rotate-1',
    1: 'rotate-1 hover:rotate-0',
  };

  // Only apply width variants if not in a grid (grid will handle sizing)
  const variantClasses = {
    big: 'flex-1 max-w-2xl', // Use flex-1 instead of fixed width for better grid behavior
    small: 'flex-1 max-w-sm', // Use flex-1 instead of fixed width for better grid behavior
  };

  return (
    <div
      className={cn(
        'w-full', // Always full width, let parent grid control sizing
        variantClasses[config.variant],
        'bg-bw border-2 md:border-4 rounded-xl md:rounded-2xl border-primaryBlack shadow-shadow',
        'p-4 md:p-6 lg:p-8 transition-all duration-300 hover:shadow-lg',
        'hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
        config.rotate !== undefined && rotateClasses[config.rotate],
        getAnimationClasses(config.animation),
        config.className
      )}
    >
      <div className="bg-main p-3 md:p-4 w-fit rounded-base mb-4 border border-border">
        {IconComponent && <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-mtext" />}
      </div>
      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-primaryBlack dark:text-white mb-2 md:mb-3 leading-tight">
        {config.title}
      </h3>
      <p className="text-sm sm:text-base md:text-lg font-medium text-mtext dark:text-white leading-relaxed">
        {config.description}
      </p>
    </div>
  );
};

const renderHero = (config: HeroConfig): React.ReactElement => {
  const heightClasses = {
    auto: '',
    screen: 'h-screen',
    half: 'h-[50vh]',
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center',
        config.height ? heightClasses[config.height] : 'h-main mt-nav',
        getAnimationClasses(config.animation),
        config.className
      )}
    >
      {config.backgroundPattern && (
        <div
          className={cn(
            'absolute inset-0',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
            'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
          )}
        />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {config.badges && config.badges.length > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap justify-center">
            {config.badges.map((badge, index) => (
              <Badge
                key={index}
                className="text-[3vw] shadow-shadow md:text-[1vw] !rounded-[40px] px-5 font-bold h-8"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <h1 className="md:text-[6vw] md:leading-[8vw] leading-[14vw] text-[12vw] tracking-wider font-anton px-[5vw] font-extrabold text-primaryBlack dark:text-white">
          {config.title}
        </h1>

        {config.subtitle && (
          <h2 className="md:text-[1.5vw] text-[4vw] mt-[3vh] font-medium px-[5vw] text-primaryBlack dark:text-white">
            {config.subtitle}
          </h2>
        )}

        {config.buttons && config.buttons.length > 0 && (
          <div className="flex gap-4 mt-8 flex-wrap justify-center">
            {config.buttons.map((button, index) => (
              <ComponentRenderer
                key={index}
                config={{
                  ...button,
                  className: cn(
                    'md:text-[1.2vw] text-[5vw] !rounded-[40px] font-bold h-14',
                    button.className
                  ),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const renderSection = (config: SectionConfig): React.ReactElement => (
  <section
    className={cn(
      'py-8 md:py-12 lg:py-16 xl:py-20',
      getBackgroundClasses(config.background),
      getPaddingClasses(config.padding),
      getAnimationClasses(config.animation),
      config.className
    )}
  >
    {(config.title || config.subtitle) && (
      <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4">
        {config.title && (
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-anton text-primaryBlack dark:text-white mb-4">
            {config.title}
          </h2>
        )}
        {config.subtitle && (
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-mtext dark:text-white max-w-3xl mx-auto leading-relaxed">
            {config.subtitle}
          </p>
        )}
      </div>
    )}

    <div className="space-y-6 md:space-y-8 lg:space-y-12">
      {config.children.map((child, index) => (
        <ComponentRenderer key={`${config.id}-${index}`} config={child} />
      ))}
    </div>
  </section>
);

const renderSpacer = (config: SpacerConfig): React.ReactElement => {
  const heightClasses = {
    xs: 'h-2',
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-16',
    xl: 'h-24',
    '2xl': 'h-32',
  };

  return (
    <div
      className={cn(
        heightClasses[config.height],
        getAnimationClasses(config.animation),
        config.className
      )}
    />
  );
};

const renderSeparator = (config: SeparatorConfig): React.ReactElement => {
  const orientationClass = config.orientation === 'vertical' ? 'h-full w-px' : 'w-full h-px';
  const thicknessClasses = {
    thin: config.orientation === 'vertical' ? 'w-px' : 'h-px',
    medium: config.orientation === 'vertical' ? 'w-0.5' : 'h-0.5',
    thick: config.orientation === 'vertical' ? 'w-1' : 'h-1',
  };

  const colorClasses = {
    default: 'bg-border',
    main: 'bg-main',
    muted: 'bg-mtext',
  };

  return (
    <Separator
      className={cn(
        orientationClass,
        config.thickness && thicknessClasses[config.thickness],
        config.color && colorClasses[config.color],
        getAnimationClasses(config.animation),
        config.className
      )}
      orientation={config.orientation}
    />
  );
};

// Main component renderer
export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  config,
  className: _className,
}) => {
  switch (config.type) {
    case 'container':
      return renderContainer(config);
    case 'grid':
      return renderGrid(config);
    case 'flex':
      return renderFlex(config);
    case 'heading':
      return renderHeading(config);
    case 'text':
      return renderText(config);
    case 'markdown':
      return renderMarkdown(config);
    case 'image':
      return renderImage(config);
    case 'button':
      return renderButton(config);
    case 'badge':
      return renderBadge(config);
    case 'card':
      return renderCard(config);
    case 'accordion':
      return renderAccordion(config);
    case 'tabs':
      return renderTabs(config);
    case 'featureBox':
      return renderFeatureBox(config);
    case 'hero':
      return renderHero(config);
    case 'section':
      return renderSection(config);
    case 'spacer':
      return renderSpacer(config);
    case 'separator':
      return renderSeparator(config);
    default:
      console.warn(`Unknown component type: ${(config as { type: string }).type}`);
      return null;
  }
};
