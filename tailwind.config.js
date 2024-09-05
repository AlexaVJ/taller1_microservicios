/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "flip-down": {
          "0%": {
            transform: "translate3d(0, -100%, 0) rotateY(-180deg)",
          },
          "50%": {
            transform: "rotateY(-90deg)",
          },
          "100%": {
            transform: "translate3d(0, 0, 0) rotateY(0deg)",
          }
        }
      },
      animation: {
        flipDown:'flip-down 1s ease 0.25s 1'
      }
    }
  },
  plugins: [],
}

