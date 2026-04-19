/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#faf9f4',
          lowest: '#ffffff',
          low: '#f5f4ef',
          container: '#efeee9',
          high: '#e9e8e3',
          highest: '#e3e3de',
          dim: '#dbdad5',
        },
        ink: {
          DEFAULT: '#1b1c19',
          muted: '#434843',
          outline: '#737973',
          line: '#c3c8c1',
        },
        primary: {
          DEFAULT: '#061b0e',
          container: '#1b3022',
          on: '#ffffff',
          tint: '#4d6453',
          fixed: '#d0e9d4',
          fixedDim: '#b4cdb8',
          sage: '#b4cdb8',
        },
        day: {
          push: '#8b3a3a',
          pull: '#3a5a8b',
          leg: '#4d6453',
          shoulder: '#a06a2c',
        },
        danger: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
          on: '#93000a',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'lg2': '14px',
        'xl2': '20px',
      },
    },
  },
  plugins: [],
};
