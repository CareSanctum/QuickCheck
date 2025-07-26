import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "App.{tsx,jsx,ts,js}",
    "index.{tsx,jsx,ts,js}",
    "components/**/*.{tsx,jsx,ts,js}"
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
          background: 'rgb(var(--background)/<alpha-value>)',
          foreground: 'rgb(var(--foreground)/<alpha-value>)',
          card: 'rgb(var(--card)/<alpha-value>)',
          cardForeground: 'rgb(var(--card-foreground)/<alpha-value>)',
          popover: 'rgb(var(--popover)/<alpha-value>)',
          popoverForeground: 'rgb(var(--popover-foreground)/<alpha-value>)',
          primary: 'rgb(var(--primary)/<alpha-value>)',
          primaryForeground: 'rgb(var(--primary-foreground)/<alpha-value>)',
          secondary: 'rgb(var(--secondary)/<alpha-value>)',
          secondaryForeground: 'rgb(var(--secondary-foreground)/<alpha-value>)',
          muted: 'rgb(var(--muted)/<alpha-value>)',
          mutedForeground: 'rgb(var(--muted-foreground)/<alpha-value>)',
          accent: 'rgb(var(--accent)/<alpha-value>)',
          accentForeground: 'rgb(var(--accent-foreground)/<alpha-value>)',
          destructive: 'rgb(var(--destructive)/<alpha-value>)',
          destructiveForeground: 'rgb(var(--destructive-foreground)/<alpha-value>)',
          border: 'rgb(var(--border)/<alpha-value>)',
          input: 'rgb(var(--input)/<alpha-value>)',
          ring: 'rgb(var(--ring)/<alpha-value>)',
          chart1: 'rgb(var(--chart-1)/<alpha-value>)',
          chart2: 'rgb(var(--chart-2)/<alpha-value>)',
          chart3: 'rgb(var(--chart-3)/<alpha-value>)',
          chart4: 'rgb(var(--chart-4)/<alpha-value>)',
          chart5: 'rgb(var(--chart-5)/<alpha-value>)',
          sidebar: 'rgb(var(--sidebar)/<alpha-value>)',
          sidebarForeground: 'rgb(var(--sidebar-foreground)/<alpha-value>)',
          sidebarPrimary: 'rgb(var(--sidebar-primary)/<alpha-value>)',
          sidebarPrimaryForeground: 'rgb(var(--sidebar-primary-foreground)/<alpha-value>)',
          sidebarAccent: 'rgb(var(--sidebar-accent)/<alpha-value>)',
          sidebarAccentForeground: 'rgb(var(--sidebar-accent-foreground)/<alpha-value>)',
          sidebarBorder: 'rgb(var(--sidebar-border)/<alpha-value>)',
          sidebarRing: 'rgb(var(--sidebar-ring)/<alpha-value>)',
          
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
