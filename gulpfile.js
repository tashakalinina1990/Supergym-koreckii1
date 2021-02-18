"use strict";

const gulp = require("gulp");
const sourcemap = require("gulp-sourcemaps");
const webp = require("gulp-webp");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const svgstore = require("gulp-svgstore");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");

// Clean
const clean = () => {
  return del("build/");
}
exports.clean = clean;

// Copy
const copy = () => {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    '!source/img/sprite/*.svg',
  ], {
    base: "source"
  })
      .pipe(gulp.dest("build"));
}
exports.copy = copy;

// Images min
const images = () => {
  return gulp.src("build/img/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({quality: 89, progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
}
exports.images = images;

// From png, jpg to webp
const webpConv = () => {
  return gulp.src("build/img/*.{png,jpg}")
    .pipe(webp({quality: 89}))
    .pipe(gulp.dest("build/img"));
}
exports.webp = webpConv;

// CSS
const css = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}
exports.css = css;

// JS main
const jsMain = () => {
  return gulp.src("source/js/main/*.js")
      .pipe(concat("main.js"))
      .pipe(gulp.dest("build/js"))
      .pipe(browserSync.stream());
}
exports.jsMain = jsMain;

// JS vendor
const jsVendor = () => {
  return gulp.src("source/js/vendor/*.js")
      .pipe(concat("vendor.js"))
      .pipe(gulp.dest("build/js"))
      .pipe(browserSync.stream());
}
exports.jsVendor = jsVendor;

// HTML
const html = () => {
  return gulp.src("source/*.html")
      .pipe(posthtml([
        include()
      ]))
      .pipe(gulp.dest("build"));
}
exports.html = html;

// Server
const server = (done) => {
  browserSync.init({
    server: {baseDir: "build"},
    cors: true,
    open: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

// Reload
const reload = (done) => {
  browserSync.reload();
  done();
}
exports.reload = reload;

// SVG sprite
const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite.svg'))
      .pipe(gulp.dest('build/img/sprite'));
}
exports.sprite = sprite;

// Watcher
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(css))
  gulp.watch("source/*.html", gulp.series(html, reload))
  gulp.watch("source/img/icon-*.svg", gulp.series(sprite, html, reload))
  gulp.watch("source/js/**/*.js", gulp.series(jsVendor, jsMain, reload));
}
exports.watcher = watcher;

const build = gulp.series(clean, copy, images, webpConv, sprite, css, jsVendor, jsMain, html);
exports.build = build;
exports.start = gulp.series(
  build, server, watcher
);
