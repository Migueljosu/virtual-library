/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Inclui todos os arquivos React na pasta src
  ],
  theme: {
    extend: {
      colors: {
        'wood-brown': '#6E4B3A', // Castanho de madeira
        'light-brown': '#8D6E63', // Castanho claro
        'dark-brown': '#4E342E', // Castanho escuro
        'beige': '#D7CCC8', // Bege (mais claro)
        'chestnut': '#7B3F00', // Castanho de castanha
        'cinnamon': '#9E6A3B', // Canela
        'caramel': '#A9745B', // Caramelo
        'saddle-brown': '#8B4513', // Castanho sela
        'hazel': '#8E7C4E', // Castanho avelã
        'mocha': '#3E2723', // Mocha (castanho escuro com toque de vermelho)
        'coffee': '#4B2E1D', // Café (castanho escuro)
        'tan': '#D2B48C', // Castanho amarelado (bege)
        'white': '#FFFFFF', // Branco
        'black': '#000000', // Preto
      },

    }, // Customizações futuras
    
  },
  plugins: [],
};
