/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:    '#0C2340',   // Dark Navy
        secondary:  '#F7F8FA',   // Soft Gray
        accentYellow: '#FFC107',
        accentGreen:  '#28A745',
        accentRed:    '#DC3545'
      },
    },
  },
  plugins: [],
};