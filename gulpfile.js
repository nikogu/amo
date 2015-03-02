var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src('src/amo.js').
        pipe(uglify()).
        pipe(rename('amo.js')).
        pipe(gulp.dest('build'));
});
