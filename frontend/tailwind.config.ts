import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1D4ED8',
          soft: '#EFF6FF',
        },
        accent: {
          main: '#F59E0B',
          tech: '#06B6D4',
        },
        app: {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          dark: '#020617',
        },
        domain: {
          ee: '#1D4ED8',
          iot: '#06B6D4',
          data: '#F59E0B',
          backend: '#1D4ED8',
          ml: '#06B6D4',
          qa: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.06)',
        card: '0 16px 40px rgba(15, 23, 42, 0.08)',
        deep: '0 24px 60px rgba(15, 23, 42, 0.12), 0 8px 20px rgba(15, 23, 42, 0.06)',
        elevated: '0 32px 80px rgba(15, 23, 42, 0.16), 0 12px 30px rgba(15, 23, 42, 0.08)',
        navbar: '0 8px 24px rgba(15, 23, 42, 0.05)',
        'navbar-scrolled': '0 8px 32px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)',
        'glow-blue': '0 0 30px rgba(29, 78, 216, 0.2), 0 0 60px rgba(29, 78, 216, 0.1)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.2), 0 0 60px rgba(6, 182, 212, 0.1)',
        'glow-amber': '0 0 30px rgba(245, 158, 11, 0.2), 0 0 60px rgba(245, 158, 11, 0.1)',
        'glow-blue-lg': '0 0 40px rgba(29, 78, 216, 0.25), 0 0 80px rgba(29, 78, 216, 0.12), 0 4px 20px rgba(29, 78, 216, 0.15)',
        'glow-cyan-lg': '0 0 40px rgba(6, 182, 212, 0.25), 0 0 80px rgba(6, 182, 212, 0.12)',
        'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 0 20px rgba(29, 78, 216, 0.05)',
      },
      borderRadius: {
        card: '1.5rem',
        panel: '1.75rem',
      },
      keyframes: {
        'grid-flow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '24px 24px' },
        },
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-glow': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '0.15' },
          '50%': { transform: 'translateY(-10px) scale(1.05)', opacity: '0.25' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'slide-up-stagger': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'scroll-indicator': {
          '0%, 100%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0.5', transform: 'translateY(8px)' },
        },
        'typewriter-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'hero-text-reveal': {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'parallax-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'card-shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'grid-flow': 'grid-flow 24s linear infinite',
        'float-subtle': 'float-subtle 6s ease-in-out infinite',
        'float-glow': 'float-glow 12s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-up-stagger': 'slide-up-stagger 0.6s ease-out both',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scroll-indicator': 'scroll-indicator 2s ease-in-out infinite',
        'typewriter-blink': 'typewriter-blink 1s step-end infinite',
        'hero-text-reveal': 'hero-text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'parallax-slow': 'parallax-slow 20s ease-in-out infinite',
        'card-shine': 'card-shine 1.5s ease-in-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(29, 78, 216, 0.06) 0%, rgba(6, 182, 212, 0.04) 50%, rgba(245, 158, 11, 0.03) 100%)',
      },
    },
  },
  plugins: [],
}
