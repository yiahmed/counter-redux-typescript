module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'flash-green': {
          '0%, 30%, 70%, 100%': { color: 'black' },
          '40%, 60%': { color: 'green' },
        },
        'flash-red': {
          '0%, 30%, 70%, 100%': { color: 'black' },
          '40%, 60%': { color: 'red' },
        },
      },
      animation: {
        'flash-green': 'flash-green 5s',
        'flash-red': 'flash-red 5s',
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [],
};
