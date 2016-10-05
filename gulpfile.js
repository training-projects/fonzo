// Variables with all technologies.
// ----------------------------------------------------------------------
var gulp					= require('gulp'),
		concatcss			= require('gulp-concat-css'),
		concatjs			= require('gulp-concat-js'),
		copy					= require('gulp-contrib-copy'),
		cssmin				= require('gulp-cssmin'),
		imagemin			= require('gulp-imagemin'),
		htmlmin				= require('gulp-htmlmin'),
		postcss				= require('gulp-postcss'),
		sourcemaps		= require('gulp-sourcemaps'),
		stylus				= require('gulp-stylus'),
		uglify				= require('gulp-uglify'),
		watch					= require('gulp-watch'),
		autoprefixer	= require('autoprefixer'),
		browsersync		= require('browser-sync'),
		lost					= require('lost');

// Constants with all directories and files path.
// ----------------------------------------------------------------------

var src_path = {
	jquery		: 'bower_components/jquery/dist/jquery.min.js',
	normalize	: 'bower_components/normalize-css/normalize.css',
	all				: 'src/**/*',
	stylus		: 'src/**/*.styl',
	css				: 'src/**/*.css',
	html			: 'src/**/*.html',
	js				: 'src/**/*.js',
	img				: 'src/**/*'
};

var dist_path = {
	dist			: 'dist/',
	html			: 'dist/',
	css				: 'dist/assets/css/',
	js				: 'dist/assets/scripts/',
	img				: 'dist/assets/images/'
};

// Clean
// ----------------------------------------------------------------------
	gulp.task('cleanAll', function(){
		return gulp.src(dist_path.dist, {read: false})
			.pipe(clean({force: true}));
	});

// Copy
// ----------------------------------------------------------------------
	gulp.task('copyJS', function(){
		gulp.src([src_path.jquery])
			.pipe(copy())
			.pipe(gulp.dest('src/assets/scripts/'))
			.pipe(gulp.dest(dist_path.js));
	});

	gulp.task('copyCSS', function(){
		gulp.src([src_path.normalize])
			.pipe(copy())
			.pipe(gulp.dest('src/assets/css/'))
			.pipe(gulp.dest(dist_path.css));
	});

// Stylus
// ----------------------------------------------------------------------
	gulp.task('compileStylus', function () {
		return gulp.src(src_path.stylus)
			.pipe(sourcemaps.init())
			.pipe(stylus({
				compress: true
			}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(dist_path.dist));
	});

// HTML minify
// ----------------------------------------------------------------------
	gulp.task('minifyhtml', function() {
		return gulp.src(src_path.html)
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest(dist_path.html));
	});

// CSS minify
// ----------------------------------------------------------------------

// CSS minify
// ----------------------------------------------------------------------

// CSS minify
// ----------------------------------------------------------------------

// CSS minify
// ----------------------------------------------------------------------



// var paths = {
//   cssSource: 'src/css/',
//   cssDestination: 'dist/css/'
// };

// gulp.task('styles', function() {
//   return gulp.src(src_path.css)
//     .pipe(sourcemaps.init())
//     .pipe(postcss([
//       lost(),
//       autoprefixer()
//     ]))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest(paths.cssDestination));
// });

// gulp.watch(dist_path.css, ['styles']);

// gulp.task('clean', ['cleanAll']);
// gulp.task('copy', ['copyAll', 'copyJS', 'copyCSS']);
gulp.task('copy', 		['copyJS', 'copyCSS']);
gulp.task('styl', 		['compileStylus']);
gulp.task('min-html', ['minifyhtml']);
gulp.task('default', 	['min-html','styl']);