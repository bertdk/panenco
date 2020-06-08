import babel from 'rollup-plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';
import packageJson from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
    },
    {
      file: packageJson.module,
      format: 'esm',
    },
  ],
  plugins: [
    babel({
      presets: [['@babel/preset-env', { targets: { node: '8.3' } }]],
      comments: false,
    }),
    autoExternal(),
  ],
};
