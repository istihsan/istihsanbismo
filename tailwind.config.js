/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        oxblood: "var(--color-oxblood)",
      },
      fontFamily: {
        sans: [
          "Schibsted Grotesk",
          "Arial",
          "Helvetica Neue",
          "Helvetica",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        small: ["var(--text-small)", { lineHeight: "1.45" }],
      },
      transitionDuration: {
        dossier: "var(--duration-dossier)",
      },
    },
  },
  plugins: [],
};
