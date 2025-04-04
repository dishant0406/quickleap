import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: 'var(--main)',
        overlay: 'var(--overlay)',
        bg: 'var(--bg)',
        bw: 'var(--bw)',
        blank: 'var(--blank)',
        text: 'var(--text)',
        mtext: 'var(--mtext)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        ringOffset: 'var(--ring-offset)',
        primaryBlack: 'var(--primary-black)',
        secondaryBlack: '#212121',
      },
      boxShadow: {
        shadow: 'var(--shadow)',
      },
      fontFamily: {
        anton: 'var(--font-anton)',
      },
      margin: {
        nav: 'var(--nav-height)',
      },
      translate: {
        boxShadowX: '4px',
        boxShadowY: '3px',
        reverseBoxShadowX: '-4px',
        reverseBoxShadowY: '-3px',
      },
      fontWeight: {
        base: '500',
        heading: '800',
      },
      borderRadius: {
        base: '5px',
      },
      height: {
        nav: 'var(--nav-height)',
        main: 'var(--dashboard-height)',
      },
      animation: {
        'smooth-shimmer': 'smooth-shimmer 2.5s infinite',
        marquee: 'marquee 10s linear infinite',
        marquee2: 'marquee2 10s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'smooth-shimmer': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        marquee: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        marquee2: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
