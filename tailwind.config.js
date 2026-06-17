/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "PingFang SC",
          "Microsoft YaHei",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#171717",
        muted: "#6C6A63",
        paper: "#F7F4EB",
        line: "#E2DCCE",
        accent: "#E95239",
        gold: "#D4A937",
        mint: "#76B8A2",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(28, 24, 18, 0.12)",
      },
    },
  },
  plugins: [],
};
