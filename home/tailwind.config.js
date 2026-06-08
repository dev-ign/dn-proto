/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#E12920',
        'red-cta': '#E41B25',
        'red-deep': '#B5140E',
        ink: '#111111',
        'ink-2': '#333333',
        gray: '#8C8C8C',
        'gray-2': '#B3B3B3',
        border: '#E6E6E6',
        'border-soft': '#EFEFEF',
        surface: '#FAFAFA',
        'surface-2': '#F4F4F4',
        'hero-bg': '#090909',
        'dark-bg': '#0A0909',
        'footer-bg': '#111111',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        body: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        lg: '20px',
        md: '14px',
        sm: '10px',
      },
    },
  },
  plugins: [],
}
