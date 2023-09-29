import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: 'var(--font-ibm-plex-sans)',
        rowdis: 'var(--font-rowdis)',
        vt: 'var(--font-vt323)'
      },
      colors: {
        primary: {
          100: '#FFF',
          200: '#D9D9D9',
          300: '#454F5B',
          400: '#212B36',
        },
        secondary: {
          100: '#C77F67',
        },
        background: {
          100: '#05172C', // header
          200: '#212B36', // main
        },
        neutral: {
          100: '#737373',
          200: '#EFEFEF',
          300: '#D9D9D9',
          400: '#F4F4F4',
          500: '#F1F1F1',
          600: '#6D7B88',
          700: '#666666',
          800: '#F9F6F5',
          900: '#637381',
        },
        success: {
          100: '#4CAF50',
        },
        warning: {
          100: '#FFB300',
        }
      },
    },
    screens: {
      xs: { min: '0px', max: '576px' },
      sm: { min: '577px', max: '768px' },
      md: { min: '767px', max: '992px' },
      lg: { min: '993px', max: '1200px' },
      xl: { min: '1201px', max: '1600px' },
      '2xl': { min: '1600px' },
    }, 
  },
  plugins: [
  ],
}
export default config
