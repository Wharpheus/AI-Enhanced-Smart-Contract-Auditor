/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0f172a",
          secondary: "#1e293b",
        },
        primary: {
          DEFAULT: "#3b82f6",
          dark: "#1e40af",
        },
        accent: {
          purple: "#8b5cf6",
          cyan: "#06b6d4",
        },
        surface: {
          DEFAULT: "#111827",
          secondary: "#1f2937",
          tertiary: "#374151",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
        danger: {
          DEFAULT: "#ef4444",
          dark: "#dc2626",
        },
        warning: {
          DEFAULT: "#f59e0b",
          dark: "#ca8a04",
        },
        success: {
          DEFAULT: "#10b981",
          dark: "#059669",
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #3b82f6" },
          "100%": { boxShadow: "0 0 20px #3b82f6, 0 0 30px #3b82f6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
