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
      borderRadius: {
        'asc': '10px',
        'asc-lg': '12px',
      },
    },
  },
  plugins: [],
}

export default config
