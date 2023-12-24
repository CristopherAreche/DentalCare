/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-pattern": "url('/client/src/assets/dentista.avif')",
      },
      screens: {
        xs: "390px",
      },
      colors: {
        background: {
          100: "#0e264b",
          200: "#223A60",
          300: "#f4f9ff",
        },
        text: {
          100: "#e0e4e8",
          200: "#0e264b",
          300: "#0e264b",
          400: "#767c83",
        },
        icon: {
          100: "#277dfe",
          200: "#e7f2fe",
        },

        primary: "#EB9934",
        secondary: {
          100: "#001220",
          150: "#f89e30",
          200: "#D49824",
          300: "#D46B24",
          400: "#F65F2A",
        },
        button: {
          100: "#844F0E",
        },
        table: {
          100: "#D9D9D9",
          200: "#B1B1B1",
        },
        boxShadow: {
          custom: "11px 7px 4px 0px rgba(255,255,255,0.17)",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
