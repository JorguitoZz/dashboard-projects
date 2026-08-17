/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Asegúrate de definir aquí tu color 'primary' si lo estás usando
        primary: '#3b82f6', // Ejemplo: un azul, cámbialo por el tuyo
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}