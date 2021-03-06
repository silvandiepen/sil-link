// rollup.config.js
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify-es'
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss';
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.js',
  output: {
    name: 'link',
    exports: 'named'
  },
  external: ['Vue'],
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    scss({    
      output: 'dist/button.css',    
      failOnError: true
    }),
    buble()
  ],
  
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify())
}

export default config
