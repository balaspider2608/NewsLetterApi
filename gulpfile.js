var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

//set the default environment
gulp.task('env:dev', (done) => {
    process.env.NODE_ENV = 'development';
    done();
});

gulp.task('eslint', () => {
    var assets = _.union(
        defaultAssets.server.allJS,
        defaultAssets.server.gulpConfig,
        defaultAssets.server.models,
        defaultAssets.server.routes
    );
    return gulp.src(assets)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

//all the muiltple linting
// gulp.task('lint', gulp.series('eslint'), (done) => {
//     done();
// });

//watch file changes


//nodemon task
gulp.task('nodemon', () => {
    return plugins.nodemon({
        script: 'server.js',
        ext: 'js',
        verbose: true,
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    }).on('restart', () => {
        console.log('restrating');
    });
});

gulp.task('default', gulp.series('env:dev', 'nodemon') , () => {
    console.log(process.env.NODE_ENV);
});

