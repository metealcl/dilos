/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%,100%': { boxShadow: '0 0 20px rgba(244,114,182,0.5),0 0 40px rgba(244,114,182,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(167,139,250,0.8),0 0 80px rgba(167,139,250,0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        scanline: {
          '0%': { top: '-5%' },
          '100%': { top: '105%' },
        },
      },
    },
  },
  plugins: [],
}
