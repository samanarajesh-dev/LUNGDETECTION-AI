/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        card: "var(--bg-card)",
        hover: "var(--bg-hover)",
        active: "var(--bg-active)",
        input: "var(--bg-input)",
        "border-subtle": "var(--border-subtle)",
        "border-focus": "var(--border-focus)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          accent: "var(--text-accent)",
        },
        brand: {
          blue: "var(--blue)",
          "blue-light": "var(--blue-light)",
          teal: "var(--teal)",
          "teal-light": "var(--teal-light)",
        }
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0D1B2A 0%, #0F3D52 50%, #0E6E6E 100%)',
        'gradient-button': 'linear-gradient(90deg, #1B4F8A, #319795)',
      }
    },
  },
  plugins: [],
}
