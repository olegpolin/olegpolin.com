/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {    
          "primary": "#343232",

          "secondary": "#00326b",

          "accent": "#efa500",

          "neutral": "#272626",

          "base-100": "##0F0E18",

          "base-content": "#ededed",

          "info": "#0000ff",

          "success": "#008000",

          "warning": "#ffff00",

          "error": "#ff0000",
        },
      },
    ],
  },
}
