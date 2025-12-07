/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-red": "rgb(var(--primary-red) / <alpha-value>)",
        "secondary-green": "rgb(var(--secondary-green) / <alpha-value>)",
        "gold": "rgb(var(--gold) / <alpha-value>)",
        "snow-white": "rgb(var(--snow-white) / <alpha-value>)",
      },
      backgroundImage: {
        "christmas-pattern":
          "radial-gradient(circle at top left, rgba(255, 255, 255, 0.2) 1px, transparent 0) 0 0 / 25px 25px, linear-gradient(180deg, #C53A3A 0%, #a02020 100%)",
      },
      // Визначення ключових кадрів для анімацій
      keyframes: {
        flicker: {
          "0%": {
            // Початковий кадр (був "0% 100%")
            boxShadow: "0 0 5px #fff, 0 0 10px #ff0, 0 0 15px #ff6",
            opacity: 1,
          },
          "50%": {
            boxShadow: "0 0 2px #fff, 0 0 4px #ff0, 0 0 6px #ff6",
            opacity: 0.8,
          },
          "100%": {
            // Кінцевий кадр
            boxShadow: "0 0 5px #fff, 0 0 10px #ff0, 0 0 15px #ff6",
            opacity: 1,
          },
        },
      },
      // Додавання анімацій
      animation: {
        flicker: "flicker 1s infinite alternate",
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     // ... ваші шляхи
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // // ✅ Додаємо наші змінні в тему Tailwind
//         primary: "rgb(var(--primary-red) / <alpha-value>)",
//         secondary: "rgb(var(--secondary-green) / <alpha-value>)",
//         gold: "rgb(var(--gold) / <alpha-value>)",
//         snow: "rgb(var(--snow-white) / <alpha-value>)",
//         textDark: "rgb(var(--text-dark) / <alpha-value>)",

//         // Використання для фонів та тексту
//         background: "rgb(var(--bg-color) / <alpha-value>)",
//         text: "rgb(var(--txt-color-main) / <alpha-value>)",
//       },
//       // Ви можете розширити інші властивості подібним чином (наприклад, шрифт, тіні)
//       // fontSize: {
//       //   'custom-h1': 'var(--font-size-h1)',
//       // }
//     },
//   },
//   plugins: [],
// };
