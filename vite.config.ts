/// <reference types="vitest" />
/// <reference types="vite/client" />
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), reactRefresh()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/tests/test-setup.ts',
        css: true,

    },
    server: {
        host: '127.0.0.1',
        port: 5173
    }
})
