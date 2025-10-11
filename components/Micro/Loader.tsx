'use client';

import type { JSX } from 'react';

import { cn } from '@/lib/utils';

import LottiePlayer from './LottiePlayer';

export interface LoaderProps {
  /** Title text to display below the loader */
  title?: string;
  /** Description text to display below the title */
  description?: string;
  /** Path to the Lottie animation file */
  lottiePath?: string;
  /** Size of the Lottie animation */
  size?: number;
  /** Custom className for the container */
  className?: string;
  /** Custom className for the Lottie animation */
  lottieClassName?: string;
  /** Animation speed (default: 1) */
  speed?: number;
  /** Whether to autoplay the animation (default: true) */
  autoplay?: boolean;
  /** Whether to loop the animation (default: true) */
  loop?: boolean;
  /** Show the loader component */
  show?: boolean;
  /** Custom content to display instead of title/description */
  children?: React.ReactNode;
}

const Loader = ({
  title = 'Loading...',
  description,
  lottiePath = '/Loading.lottie',
  size = 200,
  className,
  lottieClassName,
  speed = 1,
  autoplay = true,
  loop = true,
  show = true,
  children,
}: LoaderProps): JSX.Element | null => {
  if (!show) return null;

  return (
    <div className={cn('h-main flex flex-col items-center justify-center', className)}>
      <LottiePlayer
        autoplay={autoplay}
        className={cn('-mt-[10vh]', lottieClassName)}
        height={size}
        loop={loop}
        speed={speed}
        src={lottiePath}
        width={size}
      />
      {children || (
        <div className="text-center mt-4">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          {description && <p className="text-gray-400 mb-4 mt-2">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default Loader;
