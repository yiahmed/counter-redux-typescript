module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      theme: {
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
        'floatAnimation': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'flash-green': 'flash-green 5s',
        'flash-red': 'flash-red 5s',
        'float': 'floatAnimation 3s infinite ease-in-out',
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
