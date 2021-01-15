// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
