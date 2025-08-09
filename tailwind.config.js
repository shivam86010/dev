/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core Theme Colors
        primary: {
          DEFAULT: "var(--color-primary)", // terminal-green-400
          foreground: "var(--color-primary-foreground)", // terminal-black
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // deep-space-navy
          foreground: "var(--color-secondary-foreground)", // text-primary
        },
        accent: {
          DEFAULT: "var(--color-accent)", // cyan-400
          foreground: "var(--color-accent-foreground)", // terminal-black
        },

        // Background & Surface
        background: "var(--color-background)", // terminal-black
        foreground: "var(--color-foreground)", // text-primary
        card: {
          DEFAULT: "var(--color-card)", // surface-dark
          foreground: "var(--color-card-foreground)", // text-primary
        },
        popover: {
          DEFAULT: "var(--color-popover)", // surface-dark
          foreground: "var(--color-popover-foreground)", // text-primary
        },

        // Muted & Subtle
        muted: {
          DEFAULT: "var(--color-muted)", // text-secondary
          foreground: "var(--color-muted-foreground)", // text-primary
        },

        // Form Elements
        border: "var(--color-border)", // border-gray
        input: "var(--color-input)", // surface-dark
        ring: "var(--color-ring)", // terminal-green-400

        // Status Colors
        success: {
          DEFAULT: "var(--color-success)", // success-green
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-warning
          foreground: "var(--color-warning-foreground)", // terminal-black
        },
        error: {
          DEFAULT: "var(--color-error)", // error-red
          foreground: "var(--color-error-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // error-red
          foreground: "var(--color-destructive-foreground)", // white
        },

        // Terminal Specific Colors
        "terminal-green": "var(--color-terminal-green)", // terminal-green-400
        "terminal-cyan": "var(--color-terminal-cyan)", // cyan-400
        "terminal-amber": "var(--color-terminal-amber)", // amber-warning
        "deep-space": "var(--color-deep-space)", // deep-space-navy
        "github-dark": "var(--color-github-dark)", // github-dark
        "text-primary": "var(--color-text-primary)", // text-primary
        "text-secondary": "var(--color-text-secondary)", // text-secondary
        "github-green": "var(--color-github-green)", // github-green
      },

      fontFamily: {
        terminal: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
        code: ["Fira Code", "JetBrains Mono", "Consolas", "monospace"],
        command: ["Space Mono", "JetBrains Mono", "monospace"],
        system: ["Source Code Pro", "JetBrains Mono", "monospace"],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },

      fontSize: {
        "terminal-xs": [
          "0.75rem",
          { lineHeight: "1rem", letterSpacing: "0.05em" },
        ],
        "terminal-sm": [
          "0.875rem",
          { lineHeight: "1.25rem", letterSpacing: "0.025em" },
        ],
        "terminal-base": [
          "1rem",
          { lineHeight: "1.5rem", letterSpacing: "0.025em" },
        ],
        "terminal-lg": [
          "1.125rem",
          { lineHeight: "1.75rem", letterSpacing: "0.025em" },
        ],
        "terminal-xl": [
          "1.25rem",
          { lineHeight: "1.75rem", letterSpacing: "0.025em" },
        ],
      },

      spacing: {
        terminal: "0.5rem",
        "terminal-lg": "1rem",
        "terminal-xl": "1.5rem",
      },

      borderRadius: {
        terminal: "2px",
      },

      boxShadow: {
        terminal: "0 4px 12px rgba(0, 0, 0, 0.4)",
        "terminal-modal": "0 8px 24px rgba(0, 0, 0, 0.6)",
        "terminal-glow": "0 0 10px rgba(0, 255, 65, 0.3)",
        "terminal-glow-cyan": "0 0 10px rgba(0, 255, 255, 0.3)",
        "terminal-glow-strong": "0 0 20px rgba(0, 255, 65, 0.4)",
      },

      animation: {
        blink: "blink 1s infinite",
        typing: "typing 2s steps(20, end), blink 1s infinite",
        "terminal-fade-in": "fadeIn 0.3s ease-out",
        "terminal-slide-up": "slideUp 0.3s ease-out",
      },

      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },

      backdropBlur: {
        terminal: "8px",
      },

      screens: {
        "terminal-sm": "640px",
        "terminal-md": "768px",
        "terminal-lg": "1024px",
        "terminal-xl": "1280px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
