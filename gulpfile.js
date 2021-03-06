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
var imagemin = require('gulp-imagemin');
var logger = require('gulp-logger');
// var babel = require('gulp-babel');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;

function clear() {
  return del('assets/*');
}

function Less(){
  return gulp.src(['./src/less/style.less', './src/less/adaptive.less'])
    .pipe(sourcemaps.init())
	  .pipe(less())
	  .pipe(autoprefixer(['cover 99.5%']))
	  .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({ suffix: '.min', prefix : '' }))
	  .pipe(gulpif(isDev,sourcemaps.write()))
	  .pipe(gulp.dest( './assets/css/' ))
}

function critical(){
  return gulp.src(['./src/less/config.less', './src/css/critical/*.css'])
    .pipe(sourcemaps.init())
	  .pipe(less())
	  .pipe(autoprefixer(['cover 99.5%']))
	  .pipe(cleanCSS({
      level: 2
    }))
    .pipe(concat('critical.css'))
    .pipe(rename({ suffix: '.min', prefix : '' }))
	  .pipe(gulpif(isDev,sourcemaps.write()))
	  .pipe(gulp.dest( './assets/css/' ))
}

function styles_vend(){
  return gulp.src(['./src/css/vendors/*.css', './src/css/styles.css'])
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
    .pipe(gulp.dest('./assets/css'))
}

function scripts_vend(){
  return gulp.src(['./src/js/vendors_js/jquery-3.4.1.min.js', './src/js/vendors_js/**/*.js'])
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(concat('scripts_vend.min.js'))
      .pipe(gulpif(isProd,uglify())) // Mifify js (opt.)
      .pipe(gulpif(isDev,sourcemaps.write()))
      .pipe(gulp.dest('./assets/js'))
}

function custom_scripts(){
  return gulp.src('./src/js/script.js')
      .pipe(gulpif(isDev, sourcemaps.init()))
      // .pipe(babel({
      //   presets: ['@babel/env']
      // }))
      .pipe(concat('custom_script.min.js'))
      .pipe(uglify()) // Mifify js (opt.)
      .pipe(gulpif(isDev,sourcemaps.write()))
      .pipe(gulp.dest('./assets/js'))
}

function img_optimize(){
  return gulp.src('./src/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(webp())
    .pipe(gulp.dest('./assets/img'))
}

function img(){
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./assets/img'))
}

function fonts(){
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./assets/fonts'))
}

function Pug(){
  return gulp.src(['!./src/pug/includes/**/*.pug', './src/pug/**/*.pug'])
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('./'))
}

function watch(){
  gulp.watch('./src/less/*.less', Less);
  gulp.watch('./src/js/script.js', custom_scripts);
  gulp.watch('./src/pug/**/*.pug').on('change', function(file){
    if(!file.includes('/includes/')){
      return gulp.src([file])
        .pipe(logger({
          before: 'Starting Pug...',
          after: 'Pug complete!',
          extname: '.pug',
          showChange: true
        }))
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('./'))
    }
  });
  gulp.watch('./src/fonts/**/*', fonts);
  gulp.watch('./src/img/**/*', img);
}

var build = gulp.series(clear, gulp.parallel(Less, critical, scripts_vend, custom_scripts, img, styles_vend, fonts, Pug));


gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('production', img_optimize);