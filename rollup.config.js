import typescript from 'rollup-plugin-typescript2';
// import uglify from 'rollup-plugin-uglify';
const pkg = require('./package.json');
const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];

export default {
  entry: 'src/index.ts',
  globals: {
    angular: 'angular',
    'angular-ts-decorators': 'angular-ts-decorators',
    tslib: 'tslib'
  },
  external,
  plugins: [
    typescript({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true
    }),
    // uglify()
  ],
  targets: [
    {
      dest: 'dist/' + pkg.main,
      format: 'umd',
      exports: 'named',
      moduleName: pkg.name,
      sourceMap: true
    },
    {
      dest: 'dist/' + pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
};
