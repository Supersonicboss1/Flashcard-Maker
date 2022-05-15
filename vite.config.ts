import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  //base: 'https://supersonicboss1.github.io/Flashcard-Maker/',
  plugins: [svelte()]
})
