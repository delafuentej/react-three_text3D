import react from '@vitejs/plugin-react';
import { transformWithEsbuild } from 'vite';
import restart from 'vite-plugin-restart';
import compression from 'vite-plugin-compression';

export default {
    root: 'src/',
    publicDir: '../public/',
    plugins:
    [
        // Restart server on static/public file change
        restart({ restart: [ '../public/**', ] }),

        // React support
        react(),

        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code, id)
            {
                if (!id.match(/src\/.*\.js$/))
                    return null

                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            },
        },
        [compression({ algorithm: 'brotliCompress' })]
    ],
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
    
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  if (id.includes('three')) return 'three';
                  if (id.includes('react')) return 'react';
                  if (id.includes('lodash')) return 'lodash';
                  return 'vendor'; // Otras librerías en un chunk común
                }
              }
            }
          },
          minify: 'terser',
          terserOptions: {
            compress: {
              drop_console: true, // Elimina console.log en producción
              drop_debugger: true,
            }
          },
         
    },
  
}