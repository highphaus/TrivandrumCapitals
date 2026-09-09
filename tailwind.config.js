/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          dark: "#032245",
          blue: "#1D719C",
          orange: "#E84103",
          yellow: "#FBA643",
          cream: "#FDF7D6",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        'court-pattern': "radial-gradient(circle at center, rgba(232, 65, 3, 0.08) 0%, transparent 70%)",
        'gradient-dark': "linear-gradient(180deg, #032245 0%, #021730 100%)",
      },
      clipPath: {
        'angled-br': 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
        'angled-tl': 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)',
      }
    },
  },
  plugins: [],
};
