/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: { container: false, preflight: false },
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
      }
    }
  },
  plugins: []
}
