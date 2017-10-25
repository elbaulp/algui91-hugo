var env         = require('minimist')(process.argv.slice(2)),
    gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    stylus      = require('gulp-stylus'),
    jeet        = require('jeet'),
    rupture     = require('rupture'),
    koutoSwiss  = require('kouto-swiss'),
    prefixer    = require('autoprefixer-stylus'),
    imagemin    = require('gulp-imagemin'),
    newer       = require('gulp-newer'),
    rename      = require('gulp-rename'),
    htmlmin     = require('gulp-htmlmin')
    purify      = require('gulp-purifycss');

/**
 * Stylus task
 */
gulp.task('stylus', function(){
    gulp.src('src/styl/main.styl')
    .pipe(plumber())
    .pipe(stylus({
      use:[koutoSwiss(), prefixer(), jeet(), rupture()],
      compress: true
    }))
    //.pipe(purify(['_site/**/*.js', '_site/**/*.html'], options = {info:true, rejected:true, minify:true}))
    .pipe(rename('stylesheet.css'))
    .pipe(gulp.dest('layouts/partials/'));
});

/**
 * HTML minify
 */
gulp.task('minify-html', () => {
    return gulp.src('public/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            useShortDoctype: true,
            ignorePath: '/js/mj',
            processScripts: ['application/ld+json','application/json']
        }))
        .pipe(gulp.dest('./public'))
})

/**
 * Imagemin Task
 */
gulp.task('imagemin', function() {
  return gulp.src('static/img/**/*.{jpg,png,gif}')
    //.pipe(newer('static/img/'))
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
    .pipe(gulp.dest('static/img/'));
});

/**
 * Clean Css task
 */
gulp.task('unused-css', function() {
  return gulp.src('_includes/css/main.css')
        .pipe(purify(['_site/**/*.js', '_site/**/*.html'], options = {info:true, rejected:true, minify:true}))
    .pipe(gulp.dest('_includes/css/main.clean.css'));
});

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['stylus']);
