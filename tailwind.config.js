import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "App.{tsx,jsx,ts,js}",
    "index.{tsx,jsx,ts,js}",
    "components/**/*.{tsx,jsx,ts,js}",
    "./src/**/*.{tsx,jsx,ts,js}"
  ],
  presets: [require('nativewind/preset')],
  safelist: [
    // {
    //   pattern:
    //     /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    // },
  ],
  theme: {
    extend: {
      colors: {
        // primary: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: 'var(--card)',
          cardForeground: 'var(--card-foreground)',
          popover: 'var(--popover)',
          popoverForeground: 'var(--popover-foreground)',
          primary: 'var(--primary)',
          primaryForeground: 'var(--primary-foreground)',
          secondary: 'var(--secondary)',
          secondaryForeground: 'var(--secondary-foreground)',
          muted: 'var(--muted)',
          mutedForeground: 'var(--muted-foreground)',
          accent: 'var(--accent)',
          accentForeground: 'var(--accent-foreground)',
          destructive: 'var(--destructive)',
          destructiveForeground: 'var(--destructive-foreground)',
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
          chart1: 'var(--chart-1)',
          chart2: 'var(--chart-2)',
          chart3: 'var(--chart-3)',
          chart4: 'var(--chart-4)',
          chart5: 'var(--chart-5)',
          sidebar: 'var(--sidebar)',
          sidebarForeground: 'var(--sidebar-foreground)',
          sidebarPrimary: 'var(--sidebar-primary)',
          sidebarPrimaryForeground: 'var(--sidebar-primary-foreground)',
          sidebarAccent: 'var(--sidebar-accent)',
          sidebarAccentForeground: 'var(--sidebar-accent-foreground)',
          sidebarBorder: 'var(--sidebar-border)',
          sidebarRing: 'var(--sidebar-ring)',
          
        // },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
      fontWeight: {
        extrablack: '950',
      },
      fontSize: {
        '2xs': '10px',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        'xs': 'calc(var(--radius) - 4px)',
        'sm': 'calc(var(--radius) - 2px)',
        'lg': 'calc(var(--radius) + 2px)',
        'xl': 'calc(var(--radius) + 4px)',
      },
      boxShadow: {
        'hard-1': '-2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-2': '0px 3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-3': '2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-4': '0px -3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-5': '0px 2px 10px 0px rgba(38, 38, 38, 0.10)',
        'soft-1': '0px 0px 10px rgba(38, 38, 38, 0.1)',
        'soft-2': '0px 0px 20px rgba(38, 38, 38, 0.2)',
        'soft-3': '0px 0px 30px rgba(38, 38, 38, 0.1)',
        'soft-4': '0px 0px 40px rgba(38, 38, 38, 0.1)',
      },
    },
  },
  plugins: [gluestackPlugin],
};
