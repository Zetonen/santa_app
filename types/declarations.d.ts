// declarations.d.ts

// Це вказує TypeScript, що будь-який імпорт, 
// який закінчується на '.css', є модулем.
declare module '*.css' {
  // Ви можете залишити його порожнім, оскільки це імпорт з побічним ефектом (side effect).
  // Next.js PostCSS/Webpack обробляє фактичний CSS.
}

// Якщо ви також імпортуєте інші файли (наприклад, зображення)
declare module '*.svg' {
  const content: any;
  export default content;
}
