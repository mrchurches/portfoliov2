/** @type {import('tailwindcss').Config} */
module.exports = {
  // src/pages and src/components do not exist in this project.
  content: ["./src/app/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Semantic surfaces and text. Every pair below clears WCAG AA (4.5:1)
        // over the surfaces it is used on, with one exception: fg-subtle on
        // surface-chip measures 3.82:1, so fg-subtle stays off chips.
        surface: {
          DEFAULT: "#111827",
          raised: "#1c2640",
          chip: "#2c3852",
        },
        fg: {
          DEFAULT: "#cbd5e1",
          strong: "#f1f5f9",
          muted: "#a8b3c5",
          subtle: "#8794aa",
        },
        accent: {
          DEFAULT: "#fbbf24",
          hover: "#fcd34d",
        },
      },
      fontSize: {
        // Body ramp is deliberately tight (~1.12) so running text and its
        // captions sit close together. Display ramp is a clean 1.2 from lg.
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.55" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.45" }],
        xl: ["1.35rem", { lineHeight: "1.3" }],
        "2xl": ["1.62rem", { lineHeight: "1.25" }],
        "3xl": ["1.944rem", { lineHeight: "1.15" }],
        "4xl": ["2.333rem", { lineHeight: "1.1" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
