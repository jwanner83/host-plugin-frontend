import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [
    react(),
    topLevelAwait(),
    federation({
      name: 'host-app',
      remotes: {
        remote: 'http://localhost:3001/api/plugins/@required/injection-0.0.1/remote-entry.js',
      },
      shared: ['react','react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
