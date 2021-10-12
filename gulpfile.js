var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var webp = require('gulp-webp');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;

function clear() {
  return del('build/*');
}

function Less(){
  return gulp.src('./src/less/style.less')
    .pipe(sourcemaps.init())
	  .pipe(less())
	  .pipe(rename({ suffix: '.min', prefix : '' }))
	  .pipe(autoprefixer(['cover 99.5%']))
	  .pipe(cleanCSS({
      level: 2
    }))
	  .pipe(gulpif(isDev,sourcemaps.write()))
	  .pipe(gulp.dest( './build/css/' ))
}

function styles_vend(){
  return gulp.src(['./src/css/vendors/normalize.css', './src/css/vendors/*.css', './src/css/styles.css'])
    .pipe(sourcemaps.init())
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(concat('vendor.css'))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(isDev,sourcemaps.write()))
    .pipe(gulp.dest('./build/css'))
}

function scripts_vend(){
  return gulp.src(['./src/js/vendors_js/jquery-3.4.1.min.js', './src/js/vendors_js/**/*.js'])
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(concat('scripts_vend.min.js'))
      .pipe(gulpif(isProd,uglify())) // Mifify js (opt.)
      .pipe(gulpif(isDev,sourcemaps.write()))
      .pipe(gulp.dest('./build/js'))
}
function custom_scripts(){
  return gulp.src('./src/js/script.js')
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(concat('custom_script.min.js'))
      .pipe(gulpif(isProd,uglify())) // Mifify js (opt.)
      .pipe(gulpif(isDev,sourcemaps.write()))
      .pipe(gulp.dest('./build/js'))
}

function img(){
  return gulp.src('./src/img/**/*')
    .pipe(webp())
    .pipe(gulp.dest('./build/img'))
}

function fonts(){
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'))
}

function Pug(){
  return gulp.src(['./src/pug/**/*.pug', '!./src/pug/includes/**/*.pug'])
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('./'))
}

function watch(){
  gulp.watch('./src/less/*.less', Less);
  gulp.watch('./src/js/script.js', custom_scripts);
  gulp.watch('./src/pug/**/*.pug', Pug);
  gulp.watch('./*.html');
  gulp.watch('./src/fonts/**/*', fonts);
  gulp.watch('./src/img/**/*', img);
}

var build = gulp.series(clear, gulp.parallel(Less, scripts_vend, custom_scripts, img, styles_vend, fonts, Pug));

gulp.task('build', build);
gulp.task('watch', gulp.series(build,watch));