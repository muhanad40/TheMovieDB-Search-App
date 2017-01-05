let webpack = require('webpack-stream'),
    path    = require('path'),
    gulp    = require('gulp')

let input = {
    'js': path.join('.', 'src', 'js')
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
        }
    }
}

gulp.task('js', () => {
    return gulp.src(path.join(input.js, 'app.js'))
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest(output.js));
})