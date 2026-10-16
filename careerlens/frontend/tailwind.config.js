/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FBFBFA',
          subtle: '#F6F6F2',
          muted: '#EFEFEA',
        },
        ink: {
          DEFAULT: '#111418',
          secondary: '#384047',
          tertiary: '#6B737A',
          quaternary: '#9BA3A9',
        },
        stone: {
          hairline: '#E7E7E1',
          surface: '#FFFFFF',
          soft: '#F4F4F0',
        },
        cobalt: {
          50: '#EEF4FF',
          100: '#E0EBFF',
          200: '#C2D6FF',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          900: '#172554',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          600: '#059669',
          700: '#047857',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          600: '#D97706',
          700: '#B45309',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(18, 20, 24, 0.04)',
        'elevated': '0 1px 3px rgba(18, 20, 24, 0.05), 0 8px 24px -4px rgba(18, 20, 24, 0.06)',
        'floating': '0 12px 32px -4px rgba(18, 20, 24, 0.12), 0 4px 12px -2px rgba(18, 20, 24, 0.06)',
        'modal': '0 24px 60px -12px rgba(18, 20, 24, 0.25)',
      },
      borderRadius: {
        'micro': '6px',
        'card': '12px',
        'panel': '16px',
      },
    },
  },
  plugins: [],
}
