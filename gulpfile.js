let webpack = require('webpack-stream'),
    path    = require('path'),
    gulp    = require('gulp')

let input = {
    'js': path.join('.', 'src', 'js', 'app.js')
}

let output = {
    'js': path.join('.', 'assets', 'js')
}

let config = {
    webpack: {
        output: {
            filename: 'app.js'
        },
        module: {
            loaders: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        },
        resolve: {
            extensions: ["", ".es5", ".js"]
        }
    }
}

gulp.task('js', () => {
    return gulp.src(input.js)
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest(output.js));
})

gulp.task('watch:js', () => {
    return gulp.watch(input.js, ['js'])
})

module.exports = {
    config
}