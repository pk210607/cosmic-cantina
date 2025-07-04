/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sf': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'segoe': ['Segoe UI', 'system-ui', 'sans-serif'],
      },
      colors: {
        'ios': {
          blue: '#007AFF',
          green: '#34C759',
          orange: '#FF9500',
          red: '#FF3B30',
          purple: '#5856D6',
          pink: '#FF2D92',
          yellow: '#FFCC00',
          gray: '#8E8E93',
        },
        'vista': {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.05)',
          dark: 'rgba(0, 0, 0, 0.3)',
          border: 'rgba(255, 255, 255, 0.2)',
        }
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      animation: {
        'float-complex': 'floatComplex 10s ease-in-out infinite',
        'cosmic-shift': 'cosmicShift 4s ease-in-out infinite',
        'background-shift': 'backgroundShift 25s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        floatComplex: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) translateX(8px) rotate(2deg)' },
          '50%': { transform: 'translateY(-8px) translateX(-8px) rotate(-2deg)' },
          '75%': { transform: 'translateY(-20px) translateX(5px) rotate(1deg)' },
        },
        cosmicShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        backgroundShift: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1) rotate(180deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 122, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 122, 255, 0.6)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'ios-blue': '0 0 20px rgba(0, 122, 255, 0.4), 0 0 40px rgba(0, 122, 255, 0.2)',
        'ios-green': '0 0 20px rgba(52, 199, 89, 0.4), 0 0 40px rgba(52, 199, 89, 0.2)',
        'ios-orange': '0 0 20px rgba(255, 149, 0, 0.4), 0 0 40px rgba(255, 149, 0, 0.2)',
      },
    },
  },
  plugins: [],
};