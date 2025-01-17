// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Include this if you're using the `app` directory in Next.js
    "./public/**/*.{html,js}", // Include this if you have static HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
