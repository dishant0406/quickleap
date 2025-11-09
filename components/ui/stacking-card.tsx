'use client';
import { forwardRef, useRef } from 'react';

import { ReactLenis } from 'lenis/react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './button';

import type { MotionValue } from 'motion/react';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  navigationLink?: string;
  color?: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  navigationLink?: string;
  color?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  navigationLink,
  color,
  progress,
  range,
  targetScale,
}: CardProps): React.JSX.Element => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Use project color theme based on index if no color provided
  const cardColors = [
    'bg-main', // yellow
    'bg-bw', // white/secondary black
    'bg-bg', // beige
  ];

  const bgColor = color || cardColors[i % cardColors.length];

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 px-[5vw]"
    >
      <motion.div
        className={cn(
          'flex flex-col md:flex-row relative origin-top',
          'w-full md:w-[85vw] lg:w-[75vw]',
          'min-h-[70vh] md:min-h-[55vh] lg:min-h-[50vh]',
          'md:h-[55vh] lg:h-[50vh]',
          'rounded-base border-4 border-border shadow-shadow',
          'p-[4vw] md:p-[3vw] lg:p-[2vw]',
          bgColor
        )}
        style={{
          scale,
          top: `calc(-5vh + ${i * 2.5}vh)`,
        }}
      >
        <div className="flex flex-col md:flex-row h-full w-full gap-[4vw] md:gap-[2vw]">
          {/* Content Section */}
          <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center">
            <h2
              className="font-heading text-text text-center md:text-left mb-[2vh]"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)' }}
            >
              {title}
            </h2>
            <p
              className="font-base text-text leading-relaxed mb-[2vh]"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
            >
              {description}
            </p>
            <div className="flex items-center gap-[1vw] mt-auto">
              {navigationLink ? (
                <Link href={navigationLink}>
                  <Button
                    className="px-[2vw] py-[1vh]"
                    size="sm"
                    style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                    variant="default"
                  >
                    Learn more
                    <ArrowRight
                      style={{
                        width: 'clamp(12px, 1.2vw, 16px)',
                        height: 'clamp(12px, 1.2vw, 16px)',
                      }}
                    />
                  </Button>
                </Link>
              ) : (
                <Button
                  className="px-[2vw] py-[1vh]"
                  size="sm"
                  style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                  variant="default"
                >
                  See more
                  <ArrowRight
                    style={{
                      width: 'clamp(12px, 1.2vw, 16px)',
                      height: 'clamp(12px, 1.2vw, 16px)',
                    }}
                  />
                </Button>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative w-full md:w-[55%] lg:w-[60%] h-[40vh] md:h-full rounded-base overflow-hidden border-2 border-border shadow-shadow">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image
                fill
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                src={url}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(({ projects }, _ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <section ref={container}>
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              color={project.color}
              description={project.description}
              i={i}
              navigationLink={project.navigationLink}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              title={project.title}
              url={project.link}
            />
          );
        })}
      </section>
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;
