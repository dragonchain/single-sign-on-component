const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine');
const babel = require('gulp-babel');
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
require('babel-polyfill');


gulp.task('clean', () => del(['dest']));

gulp.task('babel', () => gulp.src('src/**/*.js', { base: './src' })
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      'inline-react-svg',
    ],
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dest/')));

gulp.task('assets', () => gulp.src('src/assets/**/*.svg', { base: './src' })
  .pipe(sourcemaps.init())
  .pipe(svgSprite({
    mode: {
      css: {
        render: {
          css: false,
        },
      },
    },
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dest/assets/')));

gulp.task('eslint', () => gulp.src(['src/**', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('watch', gulp.series('babel', 'eslint', () => gulp.watch(['!node_modules/**', 'src/**', 'spec/**'], gulp.series(['clean', 'babel', 'eslint', 'spec']))));

gulp.task('spec', () => gulp.src('./dist/**/*[Ss]pec.js')
  .pipe(jasmine()));

gulp.task('default', gulp.series(['babel', 'eslint', 'spec', 'watch']));
gulp.task('build', gulp.series(['babel']));
