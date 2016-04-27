const gulp = require('gulp');
const typescript = require('gulp-typescript');

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

gulp.task('watch', () => {
  gulp.watch('src/ts/**/*.ts', ['ts']);
});

gulp.task('default', ['watch']);