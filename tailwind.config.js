/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#00FF66',
        gold: '#FFD700',
        brand: {
          dark: '#020617',
          card: 'rgba(255, 255, 255, 0.05)',
          green: '#00FF66',
          gold: '#FFD700',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(#1e293b 1px, transparent 1px)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
      boxShadow: {
        'neon-green': '0 0 25px rgba(0, 255, 102, 0.35)',
        'neon-gold': '0 0 25px rgba(255, 215, 0, 0.35)',
        'glass-card': '0 20px 50px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

