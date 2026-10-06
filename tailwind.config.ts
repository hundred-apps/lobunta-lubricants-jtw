import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        /* Merah korporat: warna utama website. */
        brand: {
          50: '#fdf3f3',
          100: '#fbe4e4',
          200: '#f8cccc',
          300: '#f2a6a6',
          400: '#e77470',
          500: '#d8433f',
          600: '#c31217',
          700: '#a50e14',
          800: '#8c1015',
          900: '#781317',
          950: '#430609'
        },
        /* Netral gelap untuk tombol sekunder dan aksen. */
        accent: {
          400: '#8b95a5',
          500: '#1f2937',
          600: '#0f172a'
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#475569',
          mute: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora var', 'Sora', 'Inter var', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        container: '80rem'
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.15)'
      }
    }
  },
  plugins: []
}