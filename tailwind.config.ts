import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        // Ascenders N&B Design System
>>>>>>> 82bb6ea62b7702b16948f8f6af4ae20723826aae
=======
        // Ascenders N&B Design System
>>>>>>> 82bb6ea62b7702b16948f8f6af4ae20723826aae
        asc: {
          bg: '#0B0B0B',
          surface: '#121212',
          surface2: '#181818',
          border: '#2A2A2A',
          text: '#FDFDFD',
          secondary: '#BDBDBD',
          mute: '#8A8A8A',
          hover: '#1F1F1F',
          active: '#252525',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
<<<<<<< HEAD
<<<<<<< HEAD
      borderRadius: {
        'asc': '10px',
        'asc-lg': '12px',
=======
=======
>>>>>>> 82bb6ea62b7702b16948f8f6af4ae20723826aae
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['28px', '36px'],
      },
      spacing: {
        '18': '72px',
        '68': '272px',
        '70': '280px',
      },
      borderRadius: {
        'asc': '10px',
        'asc-lg': '12px',
      },
      transitionDuration: {
        '120': '120ms',
        '180': '180ms',
      },
      animation: {
        'fade-in': 'fadeIn 180ms ease-out',
        'slide-up': 'slideUp 180ms ease-out',
        'slide-in-right': 'slideInRight 180ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
<<<<<<< HEAD
>>>>>>> 82bb6ea62b7702b16948f8f6af4ae20723826aae
=======
>>>>>>> 82bb6ea62b7702b16948f8f6af4ae20723826aae
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}

export default config
