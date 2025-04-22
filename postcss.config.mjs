import scrollbarHide from "tailwind-scrollbar-hide"

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      plugins: [scrollbarHide],
    },
  },
}
export default config
