module.exports = (config) => {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    customLaunchers: {
      chromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      'node_modules/jquery/dist/jquery.js',
      // 'node_modules/angular/angular.js',
      'src/*.ts',
      'test/*.spec.ts',
    ],
    preprocessors: {
      'src/*.ts': ['karma-typescript', 'coverage'],
      'test/*.spec.ts': ['karma-typescript'],
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      reporters: [
        // { type: 'html', subdir: 'report-html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' }
      ]
    },
    karmaTypescriptConfig: {
      tsconfig: 'test/tsconfig.json',
    },
    colors: true,
    browsers: ['Chrome'],
    logLevel: config.INFO
  });

  if (process.env.TRAVIS) {
    config.browsers = ['chromeTravisCI'];
  }
};
