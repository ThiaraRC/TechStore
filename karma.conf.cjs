module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: [{ pattern: 'src/**/*.spec.jsx', watched: false }],
    preprocessors: { 'src/**/*.spec.jsx': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: false,
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [['istanbul', { exclude: ['**/*.spec.jsx', 'src/test/**'] }]],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpe?g|svg|mp4)$/, type: 'asset/resource' },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'] },
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  })
}