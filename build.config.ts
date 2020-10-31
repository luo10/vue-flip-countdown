// vue.config.ts
const pkg = require('./package.json')

export default {
  entry: 'src/entry.ts',
  base: '',
  outDir: 'lib',
  assetsDir: '',
  esbuildTarget: 'es2015',
  rollupOutputOptions: {
    entryFileNames: `${pkg.name.split('/')[1]}.js`
  },
  define: {
    VITE_LIB_VERSION: pkg.version
  }
}
