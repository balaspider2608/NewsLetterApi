// var gulp = require('gulp'),
//     nodemon = require('gulp-nodemon'),
//     env = require('gulp-env');

// gulp.task('default', () => {
//     nodemon({
//         script: 'app.js',
//         ext: 'js',
//         env: {
//             PORT: 8000
//         },
//         ignore: ['./node_modules/**']
//     }).on('restart', () => {
//         console.log('restarting');
//     });
// });

var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

//set the default environment
gulp.task('env:dev', () => {
    process.env.NODE_ENV = 'development'
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

gulp.task('default', (done) => {
    runSequence('env:dev', 'nodemon', done)
});

