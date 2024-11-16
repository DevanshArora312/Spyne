
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'justAbovexl' : '1030px',
      'lg': '1024px',
      'xl': '1280px',
      'justAboveMd' : '770px',
      'sm' : '640px',	
      'md' : '768px',	
      '2xl' : '1563px',	
    },
  },
  plugins: [],
}