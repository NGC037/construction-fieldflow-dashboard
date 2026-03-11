/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        fieldflow: {
          bg: "var(--ff-bg)",
          surface: "var(--ff-surface)",
          surfaceAlt: "var(--ff-surface-alt)",
          textPrimary: "var(--ff-text-primary)",
          textSecondary: "var(--ff-text-secondary)",
          accentPrimary: "var(--ff-accent-primary)",
          accentSecondary: "var(--ff-accent-secondary)",
          accentSoft: "var(--ff-accent-soft)",
        },
      },
      boxShadow: {
        soft: "0 18px 40px rgba(15, 23, 42, 0.18)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      fontFamily: {
        display: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}