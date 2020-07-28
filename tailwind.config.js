module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    cursor: ['responsive', 'disabled'],
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'disabled'],
    backgroundOpacity: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [require('@tailwindcss/typography')],
};
