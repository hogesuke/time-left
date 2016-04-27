const gulp = require('gulp');
const typescript = require('gulp-typescript');
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');

gulp.task('ts', () => {
  const options =  {
    //out: 'main.js'
  };
  gulp.src([
      './src/ts/**/*.ts',
      '!./node_modules/**'
    ])
    .pipe(typescript(options))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('stylus', () => {
  gulp.src(['./src/styl/**/*.styl'])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./www/css'));
});

gulp.task('watch', () => {
  gulp.watch('src/ts/**/*.ts', ['ts']);
  gulp.watch('src/styl/**/*.styl', ['stylus'])
});

gulp.task('default', ['watch']);