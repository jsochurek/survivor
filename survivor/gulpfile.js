"use strict"
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ts = require('gulp-typescript');
var notify = require('gulp-notify');
var browserify = require("browserify");
var tsify = require('tsify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// tsProject over all functions
let tsProject = ts.createProject('tsconfig.json', {rootDir: "", outDir: "build"});
// src files for the project
let srcFiles = [
  'src/**/*.tsx',
  'src/**/*.ts'
];

// gulp task to build typescript files into build
gulp.task('default', ['build']);
// gulp taks to watch the build and reouput when changed
gulp.task('watch', ['build'], createGulpWatch(srcFiles, ['build']));
/**
 * Runs all the needed build scripts to copy and compile into build/
 */
 gulp.task('build', ['tsbuild']);
/**
 * Builds the ts project with tsconfig.json and outputs to build
 */
gulp.task('tsbuild', function(){
  let options = {
    onLast: true,
    message: "Build Finished!"
  };
  // get the project source and pipe it to gulp-typescript
  // include sourcemaps when react-native doesn't suck
  // https://github.com/ivogabe/gulp-typescript#source-maps
  // let tsResult = tsProject.src()
  let tsResult = gulp.src(srcFiles, {base: "src"})
    .pipe(sourcemaps.init()) // generate sourcemaps
    .pipe(tsProject()).js
    .pipe(sourcemaps.write('.')) // append sourcemap to each file
    .pipe(gulp.dest('build'))
    .pipe(notify(options));
  return tsResult;
});
function createGulpWatch(sources, tasks){
  return function() {
    var watcher = gulp.watch(sources, tasks);
    watcher.on('change', function(event){
      gutil.log('File ' + event.path + ' was ' + event.type);
    });
  };
}


/**
 *  Bundle the JS in the Html folder
 */

gulp.task('bundleHtml', function(){
  let bundler = createTsBrowserify();
  return bundleHtml(bundler);
});
function createTsBrowserify(){
  return browserify({
    entries: ['./html/ts/index.ts'],
    extensions: ['.ts'],
    debug: true,
    fullPaths : true,
    cache : {}, // <---- here is important things for optimization
    packageCache : {} // <----  and here
  })
  .plugin(tsify, { typescript: require('ntypescript')})
  .transform(babelify, {extensions: ['.ts']});
}
function bundleHtml(bundler){
  return bundler.bundle()
  .on('error', function (error) { gutil.log(error.toString()); })
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('html/build/', {base: './html/build'}));
}

/**
 *  Move the Html Directory to the Build Folders for release mode
 */

gulp.task('moveHtml', function(){
  let htmlSrcs = [
    'html/index.html',
    'html/build/**',
    'html/css/**',
    'html/images/**',
    'html/libs/**',
    'html/js/**'
  ];
  return gulp.src(htmlSrcs, { base: './' })
    .pipe(gulp.dest('android/app/src/main/assets'));
});


/** tests */
let testFiles = [
  'src/**/*.tsx',
  'src/**/*.ts',
  '__tests__/**/**/*.tsx',
  '__tests__/**/**/*.ts',
];
let options = {
  onLast: true,
  message: "Test Build Finished!"
};
gulp.task('testWatch', ['test'], createGulpWatch(testFiles, ['test']));
gulp.task('test', function() {
  return gulp.src(testFiles)
    .pipe(tsProject()).js
    .pipe(gulp.dest('__tests__/build'))
    .pipe(notify(options))
});