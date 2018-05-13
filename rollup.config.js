import coffee2 from 'rollup-plugin-coffee2';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.coffee',
  output: [{
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'named'
  }, {
    file: 'dist/index.js',
    format: 'es'
  }],
  external: ['component-register', 'shady-css-parser', 'html-parse-string'],
  plugins: [
    coffee2(),
    nodeResolve({ extensions: ['.js', '.coffee'] })
  ]
};