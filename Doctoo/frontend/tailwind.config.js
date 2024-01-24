/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      spacing: {
        128: '32rem',
      },
      brightness: {
        2000: '20',
      },
      content: {
        tick: 'url("/src/icons/tick.svg")',
      },
      gridTemplateColumns: {
        dashboard: '200px minmax(900px, 1fr) 100px',
      },
    },
    colors: {
      transparent: 'transparent',
      inherit: 'inherit',
      bg: '#F1F6F9',
      white: '#FFFFFF',
      black: {
        DEFAULT: '#202020',
        1: '#202323',
        2: '#454F50',
      },
      grey: {
        DEFAULT: '#BCC3CE',
        1: '#707D7E',
        2: '#899596',
        3: '#AFBCBD',
        4: '#CAD7D9',
        5: '#E5EBEC',
        6: '#343A3F',
        7: '#4C5767',
        8: '#DBDBDB',
        9: '#E0E5ED',
      },
      main: {
        DEFAULT: '#089BAB',
        dark: '#057D8A',
        medium: '#6BC3CD',
        light: '#D9F0F2',
        1: '#1B9AAA',
      },
      yellow: {
        DEFAULT: '#F2A450',
        medium: '#FFC249',
        light: '#FDF4E7',
      },
      error: {
        DEFAULT: '#ED5252',
        light: '#FCF0ED',
      },
      red: {
        DEFAULT: '#BB1128',
        2: '#F0544F',
      },
      green: {
        DEFAULT: '#64C68D',
        dark: '#35995F',
        medium: '#ACE9C5',
        light: '#EFFAF4',
        2: '#26C485',
      },
      blue: {
        DEFAULT: '#083D77',
        dark: '#052D58',
        hover: '#17569C',
      },
      orange: '#F87060',
      field: '#DBDBDB',
      inactive: '#DAE0E7',
      placeholder: '#BCC3CE',
      background: '#FAFAFA',
      hover: '#17569C',
      'dark-grey': '#4C5767',
      'dark-blue': '#052D58',
    },
    fontFamily: { sans: ["'Inter', sans-serif"], logo: ["'Syncopate', sans-serif"] },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
