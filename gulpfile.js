// Variables with all technologies.
// ----------------------------------------------------------------------
var gulp					= require('gulp'),
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
		browsersync		= require('browser-sync').create(),
		lost					= require('lost'),
		poststylus		= require('poststylus');

// Constants with all directories and files path.
// ----------------------------------------------------------------------
var src_path = {
	jquery		: 'bower_components/jquery/dist/jquery.min.js',
	normalize	: 'bower_components/normalize-css/normalize.css',
	stylus		: 'src/assets/css/**/*.styl',
	html			: 'src/**/*.html',
	js				: 'src/assets/scripts/*.js',
	img				: 'src/assets/images/*'
};

var dist_path = {
	index			: 'dist',
	html			: 'dist/',
	css				: 'dist/assets/css/',
	js				: 'dist/assets/scripts/',
	img				: 'dist/assets/images/'
};

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
			.pipe(cssmin())
			.pipe(gulp.dest(dist_path.css));
	});

// Imagemin
// ----------------------------------------------------------------------
	gulp.task('minifyimg', function() {
		gulp.src(src_path.img)
			.pipe(imagemin())
			.pipe(gulp.dest(dist_path.img))
	});

// Stylus with lost
// ----------------------------------------------------------------------
	gulp.task('stylus_css', function () {
		gulp.src(src_path.stylus)
			.pipe(stylus({
				use: [
					poststylus(['autoprefixer', 'lost'])
				]
			}))
			.pipe(gulp.dest(dist_path.css));
	});

// HTML minify
// ----------------------------------------------------------------------
	gulp.task('minifyhtml', function() {
		gulp.src(src_path.html)
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest(dist_path.html))
			.pipe(browsersync.stream());
	});

// JS Uglify
// ----------------------------------------------------------------------
	gulp.task('minifyjs', function() {
		gulp.src(src_path.js)
			.pipe(uglify())
			.pipe(gulp.dest(dist_path.js));
	});

// Watch
// ----------------------------------------------------------------------
	gulp.task('watch', function(){
		gulp.watch(src_path.html,			['minifyhtml']);
		gulp.watch(src_path.js,				['minifyjs']);
		gulp.watch(src_path.img,			['minifyimg']);
		gulp.watch(src_path.stylus,		['stylus_css']);
	});

// Browser Sync
// ----------------------------------------------------------------------
	gulp.task('browser-sync', ['stylus_css'], function() {
		browsersync.init({
			server: dist_path.index
		});

		gulp.watch(dist_path.stylus, ['stylus_css']);
		gulp.watch(dist_path.html).on('chanche', browsersync.reload);
	});

gulp.task('copy', ['copyJS', 'copyCSS']);
gulp.task('lost-stylus', ['stylus_css']);
gulp.task('default', ['watch', 'minifyimg', 'minifyhtml', 'minifyjs', 'browser-sync']);

