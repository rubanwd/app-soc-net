var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require("gulp-rename");
var minifyCSS = require('gulp-minify-css');

var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

var Ractive = require('ractive');
var tap = require('gulp-tap');

gulp.task('css', function() {
 	gulp.src('./frontend/less/styles.less')
 	.pipe(less({
 		paths: [ path.join(__dirname, 'less', 'includes') ]
 	}))
 	.pipe(gulp.dest('./static/css'))
 	.pipe(minifyCSS({keepBreaks:true}))
 	.pipe(rename({suffix: '.min'}))
 	.pipe(gulp.dest('./static/css'));
});

gulp.task('js', function() {
 	gulp.src('./frontend/js/app.js')
 	.pipe(browserify())
 	.pipe(gulp.dest('./static/js'))
 	.pipe(uglify())
 	.pipe(rename({suffix: '.min'}))
 	.pipe(gulp.dest('./static/js'))
});


gulp.task('templates', function() {
 	gulp.src('./frontend/tpl/**/*.html')
 	.pipe(tap(function(file, t) {
 		var precompiled = Ractive.parse(file.contents.toString());
 		precompiled = JSON.stringify(precompiled);
 		file.contents = new Buffer('module.exports = ' + precompiled);
 	}))
 	.pipe(rename(function(path) {
 		path.extname = '.js';
 	}))
 	.pipe(gulp.dest('./frontend/tpl'))
});

gulp.task('watchers', function() {
 	gulp.watch('less/**/*.less', ['css']);
 	gulp.watch('js/**/*', ['js']);
});

gulp.task('default', ['css', 'js', 'templates', 'watchers']);