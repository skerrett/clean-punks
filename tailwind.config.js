module.exports = {
    prefix: '',
    purge: {
        content: [
            './src/**/*.{html,ts}',
        ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        maxWidth: {
            '1140': '1140px',
            '960': '960px',
            '720': '720px',
            '540': '540px',
            '50%': '50%',
          },
          minWidth: {
            '50%': '50%',
          },
          screens: {
            'tablet': '768px',
            // => @media (min-width: 768px) { ... }
            'large-tablet': '992px',
            // => @media (min-width: 992px) { ... }
      
            'laptop': '1200px',
            // => @media (min-width: 1024px) { ... }
      
            'desktop': '1280px',
            // => @media (min-width: 1280px) { ... }
          },
        extend: {},
    },
    variants: {
        extend: {},
    },
};