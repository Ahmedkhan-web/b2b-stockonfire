/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          // Modern professional palette
          primary: '#2563EB', // Professional Blue
          primaryDark: '#1D4ED8',
          primaryLight: '#60A5FA',
          accent: '#F59E0B', // Modern Amber for CTAs
          accentDark: '#D97706',
          accentLight: '#FCD34D',
          success: '#10B981', // Professional Green
          warning: '#F59E0B',
          danger: '#EF4444',
          // Neutrals
          navy: '#0F172A',
          navyLight: '#1E293B',
          navyMuted: '#334155',
          border: '#E2E8F0',
          darkBorder: '#1E293B',
          grayBg: '#F7F3EC',
          cardBg: '#FFFFFF',
          text: '#0F172A',
          textLight: '#64748B',
          textMuted: '#94A3B8',
        },
        // Hero palette – matches reference (cream bg, red CTA, dark text)
        hero: {
          bg: '#F7F3EC',        // warm cream/off-white
          bgDark: '#EDE8E2',    // slightly darker cream for accents
          red: '#C8181E',       // primary red
          redDark: '#A81216',   // hover red
          redLight: '#FCE8E9',  // light red tint
          dark: '#111111',      // near-black text
          muted: '#555555',     // body text
          border: '#D9D2CA',    // warm border
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'premium': '0 10px 40px -15px rgba(15, 23, 42, 0.12), 0 4px 20px -5px rgba(15, 23, 42, 0.06)',
        'floating': '0 25px 50px -12px rgba(15, 23, 42, 0.20)',
        'card-hover': '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.08)',
        'modal': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-up-d1': 'slideUp 0.6s 0.1s ease-out forwards',
        'slide-up-d2': 'slideUp 0.6s 0.2s ease-out forwards',
        'slide-up-d3': 'slideUp 0.6s 0.3s ease-out forwards',
        'slide-up-d4': 'slideUp 0.6s 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
