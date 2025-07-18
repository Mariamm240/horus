import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Horus Brand Colors (Tailwind v4.1 compatible)
        horus: {
          purple: "#B892D5",
          gray: "#9C989F", 
          white: "#FFFFFF",
          pink: "#E29AEE",
          dark: "#1E1E1E",
          // Extended palette
          primary: "#B892D5",
          secondary: "#9C989F",
          accent: "#E29AEE",
        },
        // Modern semantic colors for Tailwind v4.1
        primary: {
          50: "#faf7ff",
          100: "#f3edff", 
          200: "#e9deff",
          300: "#d5c2ff",
          400: "#bb96ff",
          500: "#B892D5", // Main brand color
          600: "#9d6bc7",
          700: "#8650b3",
          800: "#704296",
          900: "#5c377a",
          950: "#3e1f52",
          DEFAULT: "#B892D5",
          foreground: "#FFFFFF",
        },
        secondary: {
          50: "#f9f9fa",
          100: "#f1f1f3",
          200: "#e4e4e8",
          300: "#d0d0d6",
          400: "#b5b5be",
          500: "#9C989F", // Secondary brand color
          600: "#8a8591",
          700: "#747085",
          800: "#615e6f",
          900: "#50505a",
          950: "#323238",
          DEFAULT: "#9C989F",
          foreground: "#FFFFFF",
        },
        accent: {
          50: "#fef7ff",
          100: "#fcebff",
          200: "#f9d6ff", 
          300: "#f5b3ff",
          400: "#ef7eff",
          500: "#E29AEE", // Accent brand color
          600: "#d958e8",
          700: "#c23fd4",
          800: "#a034b0",
          900: "#84298f",
          950: "#5a106b",
          DEFAULT: "#E29AEE",
          foreground: "#1E1E1E",
        },
        // Neutral grays for modern design
        gray: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1", 
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9", 
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Modern utility colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b", 
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        "gradient-horus": "linear-gradient(135deg, #B892D5 0%, #E29AEE 100%)",
        "gradient-horus-soft": "linear-gradient(135deg, #B892D5/10 0%, #E29AEE/10 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        'horus': '0 10px 25px -3px rgba(184, 146, 213, 0.1), 0 4px 6px -2px rgba(184, 146, 213, 0.05)',
        'horus-lg': '0 25px 50px -12px rgba(184, 146, 213, 0.25), 0 25px 50px -12px rgba(226, 154, 238, 0.15)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 3s ease-in-out infinite',
        'pulse-scale': 'pulse-scale 0.5s ease-in-out',
        ripple: 'ripple 0.6s linear',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
    },
  },
  plugins: [
    // Add @tailwindcss/typography if needed
  ],
};

export default config;
