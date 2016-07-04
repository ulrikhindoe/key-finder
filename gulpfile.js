// Gulp Dependencies
var gulp = require('gulp')
var rename = require('gulp-rename')
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')

// Build Dependencies
var browserify = require('browserify')
var babelify = require('babelify')
var env = require('gulp-env')

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs')

function swallowError (error) {
  gutil.log(error.toString())
  if (error.codeFrame) {
    console.log(error.codeFrame)
  }
  this.emit('end')
}

gulp.task('browserify-client', [], function () {
  env({
    vars: {
      // BROWSERIFYSHIM_DIAGNOSTICS: 1
    }
  })
  gulp.src(['MIDI.js/examples/soundfont/**/*']).pipe(gulp.dest('public/midi/soundfont'))
  gulp.src(['client/index.html']).pipe(gulp.dest('public'))
  return browserify('./client/index.js', {insertGlobals: true, transform: babelify})
    .bundle()
    .on('error', swallowError)
    .pipe(source('car-finder.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/javascripts'))
})

gulp.task('browserify-test', [], function () {
  return browserify('./test/client/index.js', {insertGlobals: true, transform: babelify})
    .bundle()
    .on('error', swallowError)
    .pipe(source('client-test.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('test', ['browserify-test'], function () {
  return gulp.src('test/client/index.html')
    .pipe(mochaPhantomjs())
})

gulp.task('watch', function () {
  gulp.watch('client/**/*.js', ['browserify-client', 'test'])
  gulp.watch('test/client/**/*.js', ['test'])
})
