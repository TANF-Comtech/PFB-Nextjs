/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    colors: {
      'white': '#ffffff',
      'black': 'rgb(26,26,26)',
      'darkestGray': '#404040',
      'darkGray': '#4D4D4F',
      'gray': '#a0a0a0',
      'mediumGray': 'rgb(216,216,216)',
      'lightGray': '#8A8A8D',
      'lightestGray': 'rgb(230,230,230)',
      'red': '#D23823',
      'redAccent': '#D0021B',
      'blue': '#3E9FDC',
      'blueAccent': '#2076ac',
      'midnightBlue': '#002C40',
      'blueBright': '#00A2DF',
      'yellow': '#FFDC00',
      // new colors for v9
      'transparent': 'transparent',
      'pure-white': '#ffffff',
      'pure-black': '#000000',
      'darkest-blue': '#02273c',
      'cardGray': '#eeeeee',
      'gold': '#ffba00',
    },
    screens: {
      bm: '320px',
      ty: '380px',
      xs: '480px',
      sm: '768px',
      md: '980px',
      lg: '1200px',
      xl: '1600px',
    },
    fontFamily: {
      dharma: "'dharma-gothic-e', Arial, Helvetica, sans-serif",
      montserrat: "'montserrat', Arial, Helvetica, sans-serif",
    },
    extend: {
      boxShadow: {
        basic:
          '0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,.025)',
        button: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
      },
      height: {
        panel: 'calc(100vh - 9rem)',
      },
      maxHeight: {
        panel: 'calc(100vh - 9rem)',
      },
      minHeight: {
        panel: 'calc(100vh - 9rem)',
      },
      zIndex: {
        '-10': '-10',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addComponents }) {
      const newComponents = {
        '.pfb-gradient': {
          background: `radial-gradient(circle 800px at 95% 80%, rgba(68, 158, 217, 1), rgba(5, 15, 50, 0.583)),
                            radial-gradient( circle 400px at 5% 100%, rgba(207, 56, 42, 0.65), rgba(37, 6, 6, 0.5));`,
        },
      };
      addComponents(newComponents);
    },
  ],
};
