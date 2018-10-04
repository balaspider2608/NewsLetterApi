var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    env = require('gulp-env');

gulp.task('default', () => {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    }).on('restart', () => {
        console.log('restarting');
    });
});