'use client';

import { useEffect, useRef, useState } from 'react';

interface DynamicSidebarProps {
  children: React.ReactNode;
}

export function DynamicSidebar({ children }: DynamicSidebarProps): React.JSX.Element {
  const [topOffset, setTopOffset] = useState(0);
  const [isPositioned, setIsPositioned] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateOffset = (): void => {
      // First try to find the cover image container
      const coverImageContainer = document.querySelector('[data-cover-image]');

      if (coverImageContainer) {
        // Get the sidebar's natural grid position
        if (sidebarRef.current) {
          const sidebarRect = sidebarRef.current.getBoundingClientRect();
          const sidebarScrollTop = window.scrollY || document.documentElement.scrollTop;
          const sidebarNaturalTop = sidebarRect.top + sidebarScrollTop;

          // Get cover image position
          const coverRect = coverImageContainer.getBoundingClientRect();
          const coverScrollTop = window.scrollY || document.documentElement.scrollTop;
          const coverTop = coverRect.top + coverScrollTop;

          // Calculate the relative difference
          const offset = coverTop - sidebarNaturalTop;
          setTopOffset(Math.max(0, offset)); // Don't go negative
          setIsPositioned(true);
        }
      } else {
        // Fallback: position after the meta section if no cover image
        const metaSection = document.querySelector('[data-meta-section]');
        if (metaSection && sidebarRef.current) {
          const sidebarRect = sidebarRef.current.getBoundingClientRect();
          const sidebarScrollTop = window.scrollY || document.documentElement.scrollTop;
          const sidebarNaturalTop = sidebarRect.top + sidebarScrollTop;

          const metaRect = metaSection.getBoundingClientRect();
          const metaScrollTop = window.scrollY || document.documentElement.scrollTop;
          const metaBottom = metaRect.top + metaScrollTop + metaSection.clientHeight;

          const offset = metaBottom - sidebarNaturalTop + 32;
          setTopOffset(Math.max(0, offset));
          setIsPositioned(true);
        } else {
          // Final fallback - no offset
          setTopOffset(0);
          setIsPositioned(true);
        }
      }
    };

    // Small delay to ensure DOM is fully rendered and positioned
    const timer = setTimeout(calculateOffset, 150);
    window.addEventListener('resize', calculateOffset);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateOffset);
    };
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`lg:sticky lg:self-start lg:h-fit lg:top-[100px] transition-opacity duration-300 ${
        isPositioned ? 'opacity-100' : 'opacity-0'
      }`} // navbar (~70px) + 30px, only transition opacity
      style={{
        marginTop: `${topOffset}px`, // Initial positioning offset from document top
      }}
    >
      {children}
    </aside>
  );
}
