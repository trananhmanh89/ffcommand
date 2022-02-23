import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx'
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

export default defineConfig(() => {
    return {
        plugins: [
            vueJsx(),
            mkcert(),
        ],

        root: './src',

        build: {
            // output dir for production build
            outDir: path.resolve('./dist'),
            emptyOutDir: true,

            // emit manifest so PHP can find the hashed files
            manifest: true,

            // our entry
            rollupOptions: {
                input: './src/main.jsx',
                output: {
                    entryFileNames: `js/[name].js`,
                    chunkFileNames: `js/[name].js`,
                    assetFileNames: `[ext]/[name].[ext]`
                }
            }
        },
        server: {
            https: true,
            cors: true,
            strictPort: true,
            port: 8888,
            hmr: {
                host: 'localhost',
                protocol: 'wss'
            }
        },
    }
})
