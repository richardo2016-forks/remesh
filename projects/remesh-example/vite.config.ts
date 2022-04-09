import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { resolve } from 'path'

import fg from 'fast-glob'

const entries = fg
  .sync('./**/*.html', {
    cwd: __dirname,
    ignore: ['./node_modules/**', './dist/**'],
  })
  .map((entry) => resolve(__dirname, entry))


// https://vitejs.dev/config/
export default defineConfig({
  base: '/remesh/dist/',
  plugins: [reactRefresh(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      remesh: resolve(__dirname, '../../packages/remesh/src'),
      'remesh-react': resolve(__dirname, '../../packages/remesh-react/src'),
      'remesh-debugger-helper': resolve(__dirname, '../../packages/remesh-debugger-helper/src'),
      'remesh-redux-devtools': resolve(__dirname, '../../packages/remesh-redux-devtools/src'),
      'remesh-logger': resolve(__dirname, '../../packages/remesh-logger/src'),
    },
  },
  build: {
    sourcemap: true,
    outDir: resolve(__dirname, '../../dist'),
    rollupOptions: {
      input: entries,
    },
  },
})
