import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [{
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'named'
  }, {
    file: 'dist/index.js',
    format: 'es'
  }],
  external: ['component-register', 'shady-css-parser-es'],
  plugins: [
    nodeResolve({ extensions: ['.js'] })
  ]
};