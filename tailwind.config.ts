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
        dark: {
          bg: '#000000',
          surface: '#0a0a0a',
          hover: '#1a1a1a',
          border: '#2a2a2a',
          text: '#ffffff',
          muted: '#a0a0a0',
        },
        accent: {
          primary: '#ffffff',
          secondary: '#e0e0e0',
          success: '#ffffff',
          warning: '#ffffff',
          error: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}

export default config
