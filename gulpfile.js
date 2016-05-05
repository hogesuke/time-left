const gulp = require('gulp');
const typescript = require('gulp-typescript');
const stylus = require('gulp-stylus');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const plumber = require('gulp-plumber');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const env = args.ENV;
const isProduction = env === 'production';

gulp.task('ts', () => {
  const options =  {
    //out: 'main.js'
  };
  gulp.src([
      './src/ts/**/*.ts',
      '!./node_modules/**'
    ])
    .pipe(typescript(options))
    .pipe(gulp.dest('./src/js/**/*.js'));
});

gulp.task('stylus', () => {
  gulp.src(['./src/styl/**/*.styl'])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./www/css'));
});

gulp.task('browserify', ['ts'], () => {
  browserify({ entries: ['./src/js/**/*.js'], debug: !isProduction })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('watch', () => {
  gulp.watch('src/ts/**/*.ts', ['browserify']);
  gulp.watch('src/styl/**/*.styl', ['stylus'])
});

gulp.task('default', ['watch']);