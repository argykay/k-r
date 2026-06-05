/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{ts,tsx,css}'],
  safelist: [
    'font-cardo',
    'font-cursive',
    {
      pattern:
        /^(text|tracking)-(header-[1-5]|paragraph-[1-3]|caption|button|link|cursive-(title|time|section))(-desktop)?$/,
    },
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        // Figma: Color/*
        white: '#FFFFFF',
        black: '#000000',
        stone: '#7D7662',
        'off-white': '#EEEEEB',
        cream: '#E1DBCB',
        'moss-green': '#7C8E5F',
        'blood-orange': '#B26F42',
        burgundy: '#3F0013',
        'butter-yellow': '#FFE288',
        // Figma: Background/*
        background: {
          'off-white': '#EEEEEB',
          stone: '#7D7662',
          cream: '#E1DBCB',
          white: '#FFFFFF',
          'moss-green': '#7C8E5F',
        },
        // Figma: Accent/*
        accent: {
          1: '#49463E',
        },
      },
      fontFamily: {
        cardo: ['Cardo', 'Georgia', 'serif'],
        serif: ['Cardo', 'Georgia', 'serif'],
        cursive: ['Homemade Apple', 'cursive'],
      },
      /*
       * Responsive type scale (mobile-first).
       * Default = below md (< 768px). *-desktop = Figma values at md+.
       * (Suffix is -desktop, not -md — Tailwind treats -md in class names as the breakpoint.)
       * Min size on mobile: 16px. Adjust sizes in the pairs below.
       *
       * | Style        | Mobile | md+ (desktop) |
       * |--------------|--------|---------------|
       * | header-1     | 56px   | 112px         |
       * | header-2     | 32px   | 32px          |
       * | header-3     | 28px   | 26px          |
       * | header-4     | 24px   | 26px          |
       * | header-5     | 20px   | 20px          |
       * | paragraph-1  | 20px   | 24px          |
       * | paragraph-2  | 18px   | 20px          |
       * | paragraph-3  | 16px   | 18px          |
       * | caption      | 16px   | 14px          |
       * | button       | 16px   | 14px          |
       * | link         | 16px   | 14px          |
       */
      fontSize: {
        'header-1': ['56px', '1.17'],
        'header-1-desktop': ['112px', '1.17'],
        'header-2': ['32px', '1.2'],
        'header-2-desktop': ['32px', '1.2'],
        'header-3': ['28px', '1.2'],
        'header-3-desktop': ['26px', '1.2'],
        'header-4': ['24px', '1.1'],
        'header-4-desktop': ['26px', '1.1'],
        'header-5': ['20px', '1.2'],
        'header-5-desktop': ['20px', '1.2'],
        'paragraph-1': ['20px', '1.2'],
        'paragraph-1-desktop': ['24px', '1.2'],
        'paragraph-2': ['18px', '1.2'],
        'paragraph-2-desktop': ['20px', '1.2'],
        'paragraph-3': ['16px', '1.2'],
        'paragraph-3-desktop': ['18px', '1.2'],
        caption: ['16px', '1.2'],
        'caption-desktop': ['14px', '1.2'],
        button: ['16px', '1.1'],
        'button-desktop': ['14px', '1.1'],
        link: ['16px', '1.2'],
        'link-desktop': ['14px', '1.2'],
        /* Cursive accent scale (Homemade Apple) — separate from Cardo typography */
        'cursive-section': ['32px', '1.15'],
        'cursive-section-desktop': ['40px', '1.15'],
        'cursive-title': ['28px', '1.2'],
        'cursive-title-desktop': ['32px', '1.2'],
        'cursive-time': ['22px', '1.2'],
        'cursive-time-desktop': ['26px', '1.2'],
      },
      keyframes: {
        'timeline-dash': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-14' },
        },
      },
      animation: {
        'timeline-dash': 'timeline-dash 2.8s linear infinite',
      },
      letterSpacing: {
        'header-1': '-1.68px',
        'header-1-desktop': '-3.36px',
        'header-4': '-0.72px',
        'header-4-desktop': '-0.78px',
        'header-5': '-0.2px',
        'header-5-desktop': '-0.2px',
        'paragraph-2': '-0.18px',
        'paragraph-2-desktop': '-0.2px',
        'paragraph-3': '-0.16px',
        'paragraph-3-desktop': '-0.18px',
        caption: '1px',
        'caption-desktop': '1.2px',
        button: '1.2px',
        'button-desktop': '1.3px',
        link: '1px',
        'link-desktop': '1.2px',
        'cursive-section': '0',
        'cursive-section-desktop': '0',
        'cursive-title': '0',
        'cursive-title-desktop': '0',
        'cursive-time': '0',
        'cursive-time-desktop': '0',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
