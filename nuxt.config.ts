import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    head: {
      title: 'Productivity',
    },
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'shadcn-nuxt',
  ],
})
