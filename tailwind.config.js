/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/*.tsx", "./src/components/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#AB85E0",
          600: "#A666FF",
          700: "#8961DD",
          900: "#7340DD",
        },
        neutral: {
          50: "#F5F5F5",
          100: "#D9D9D9",
          150: "#B3B3B3",
          200: "808080",
          300: "#5C5C5C",
          400: "#474747",
          500: "#3B3B3B",
          600: "#262626",
          800: "#212121",
          850: "#1C1C1C",
          875: "#0F0F0F",
          900: "#080708",
        },
        danger: {
          100: "#FE5F55",
          600: "#FE4034",
          900: "#B81E14",
        },
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      transitionDuration: {
        xs: "100ms",
        sm: "120ms",
      },
    },
  },
  plugins: [],
};
