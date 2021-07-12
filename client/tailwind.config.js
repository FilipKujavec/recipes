module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#6EE7B7',
        secondary: '#A7F3D0',
        tertiary: '#86E6BE',
        bgc: '#FFFFFF'
      },
      fontFamily: {
        ultra: ['Ultra'],
        // sans: ['Sansation']
      },
      zIndex: {
        '-10': '-10'
      },
      transitionProperty: {
        'width': 'width',
        'margin': 'margin'
      },
      margin: {
        '-4/6': '-67%'
      }
    },
  },
};
