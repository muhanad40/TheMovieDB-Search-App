let webpackConfig = require('./gulpfile').config.webpack

webpackConfig.devtool = 'inline-source-map'
webpackConfig.externals = {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
}

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'sinon'],
        files: [
            './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
            './src/js/tests/**/*.test.js'
        ],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        preprocessors: {
            './src/js/tests/**/*.test.js': ['webpack', 'sourcemap']
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    })
}