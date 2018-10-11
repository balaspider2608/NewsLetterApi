var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

//set the default environment
gulp.task('env:dev', (done) => {
    process.env.NODE_ENV = 'development';
    done();
});

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

