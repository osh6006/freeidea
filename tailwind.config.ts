import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

import { COLOR_SYSTEM } from './src/constants/tailwind/color-system';
import { FONT_SYSTEM } from './src/constants/tailwind/font-system';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx, js,jsx}',
    './src/**/*.{ts,tsx, js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      screens: {
        'main-desktop': '1200px',
        'main-semi-mobile': '500px',
        'pc-screen': '1366px',
      },
      backgroundImage: {
        'gradient-1-main':
          'linear-gradient(278deg, #EB537F 20.55%, #EF7F9F 99.11%, rgba(239, 127, 159, 0.00) 99.12%)',
        'gradient-image':
          'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5))',
        'gradient-image-banner':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent 50%, transparent 50%, rgba(0, 0, 0, 0.5))',
        'gradient-image-bottom-banner':
          'linear-gradient(to bottom, transparent, hsla(0, 0%, 0%, 0.2)',
      },
      boxShadow: {
        'main-header-shadow': '0 4px 15px rgba(0, 0, 0, 0.06)',
        'main-request-shadow': '0px 8px 20px 0px rgba(228, 99, 135, 0.20)',
      },
      colors: COLOR_SYSTEM,
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        montserrat: ['var(--font-montserrat)'],
      },
      letterSpacing: {
        base: '-0.28px',
        md: '-0.32px',
      },
      lineHeight: {
        base: '150%',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.85)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'zoom-out': 'zoom-out 0.1s ease-out',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    function ({
      addUtilities,
      theme,
    }: {
      addUtilities: PluginAPI['addUtilities'];
      theme: PluginAPI['theme'];
    }) {
      const utilities = {
        '.force-text-disabled': {
          '& *': {
            color: theme('colors.slate.300') + ' !important',
          },
        },
      };
      addUtilities({ ...FONT_SYSTEM, ...utilities });
    },
  ],
} satisfies Config;

export default config;
