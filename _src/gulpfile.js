var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlRigger = require('gulp-rigger');

var paths = {
  dev: {
    main: 'app',
    templates: 'app/templates',
    templatesRu: 'app/templates-ru',
    css: 'app/css',
    js: 'app/js',
    bowerComponents: 'app/bower_components',
    images: 'app/images'
  },
  build: {
    main: '..',
    css: '../css',
    js: '../js',
    images: '../images',
    fonts: '../fonts'
  }
};

var filesToConcat = {
  css: [
    paths.dev.bowerComponents + '/html5-boilerplate/dist/css/normalize.css',
    paths.dev.bowerComponents + '/html5-boilerplate/dist/css/main.css',
    paths.dev.bowerComponents + '/bootstrap/dist/css/bootstrap.min.css',
    paths.dev.css + '/vendor/**/*.css',
    paths.dev.css + '/main.css'
  ],
  js: [
    paths.dev.bowerComponents + '/jquery/dist/jquery.min.js',
    paths.dev.bowerComponents + '/bootstrap/dist/js/bootstrap.min.js',
    paths.dev.js + '/vendor/**/*.js',
    paths.dev.js + '/main.js'
  ]
};

gulp.task('html', function() {
  return gulp.src([
    paths.dev.main + '/*.html',
    '!' + paths.dev.main + '/*.ru.html'
  ])
    .pipe(htmlRigger())
    .pipe(gulp.dest(paths.build.main));
});

gulp.task('html-pgsqlblocks', ['html'], function() {
  return gulp.src(paths.build.main + '/pgsqlblocks.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.build.main + '/pgsqlblocks/'));
});

gulp.task('css', function() {
  return gulp.src(filesToConcat.css)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.build.css));
});

gulp.task('js', function() {
  return gulp.src(filesToConcat.js)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.build.js));
});

gulp.task('images', function() {
  return gulp.src(paths.dev.images + '/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.build.images));
});

gulp.task('fonts', function() {
  return gulp.src(paths.dev.bowerComponents + '/bootstrap/dist/fonts/**/*')
    .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('build', [
  'html',
  'html-pgsqlblocks',
  'css',
  'js',
  'images',
  'fonts'
]);
