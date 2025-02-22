import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (id.endsWith('.md')) {
          return {
            code: `export default ${JSON.stringify(code)}`,
            map: null
          }
        }
      }
    }
  ],
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    include: ['js-yaml']
  },
  build: {
    commonjsOptions: {
      include: [/gray-matter/, /node_modules/]
    }
  }
})
