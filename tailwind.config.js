/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#07080e',
          card: '#0d0f19',
          cardHover: '#141726',
          border: '#1f2438',
          borderGlow: '#ff6b0033',
          orange: {
            DEFAULT: '#ff6b00',
            glow: '#ff8800',
            light: '#ffa033',
            bright: '#ff4500',
            muted: '#ff6b001a',
            subtle: '#ff6b0033',
          },
          stardust: '#a0a7c4',
          subtext: '#8a92b2'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 107, 0, 0.2)' },
          '50%': { boxShadow: '0 0 35px rgba(255, 136, 0, 0.5)' },
        }
      },
      boxShadow: {
        'cosmic-orange': '0 0 25px -5px rgba(255, 107, 0, 0.4), 0 0 10px -5px rgba(255, 136, 0, 0.2)',
        'cosmic-glow': '0 0 40px -10px rgba(255, 107, 0, 0.3)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
