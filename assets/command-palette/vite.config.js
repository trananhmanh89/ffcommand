import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
    return {
        plugins: [vue()],
        // config
        root: './src',

        base: mode === 'dev' ? '/' : '/plugins/system/command/assets/command-palette/dist/',

        build: {
            // output dir for production build
            outDir: path.resolve('./dist'),
            emptyOutDir: true,

            // emit manifest so PHP can find the hashed files
            manifest: true,

            // our entry
            rollupOptions: {
                input: './src/main.js',
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
            port: 3000,
            hmr: {
                host: 'localhost',
                protocol: 'wss'
            }
        },
    }
})
