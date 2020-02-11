const { src, dest, watch, task, parallel, series } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const autoPrefixer = require('gulp-autoprefixer');
const minify = require('gulp-babel-minify');
var babel = require('gulp-babel');

task('scss', () => {
    return src('./app/style/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoPrefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./app/style'))
        .pipe(browserSync.reload({ stream: true }));
});

task('css-libs', () => {
    return src([
        './node_modules/normalize.css/normalize.css'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(dest('./app/style/common'))
        .pipe(browserSync.reload({ stream: true }));
});

task('html', () => {
    return src('app/*.html')
        .pipe(browserSync.reload({ stream: true }));
});

task('script', () => {
    return src('./app/js/*.js')
        .pipe(babel())
        .pipe(minify({
            mangle: {
                keepClassName: true
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./app/js/min_js'))
        .pipe(browserSync.reload({ stream: true }));
});

task('watch', () => {
    watch('./app/style/**/*.scss', parallel('scss'));
    watch('app/*.html', parallel('html'));
    watch('app/js/*.js', parallel('script'));
});

task('export', () => {
    const buildHtml = src('app/**/*.html')
        .pipe(dest('./dist'));

    const buildCss = src('app/style/**/*.css')
        .pipe(dest('./dist/style'));

    const buildJs = src('app/js/min_js/*.js')
        .pipe(dest('./dist/js/min_js'));

    const buildFonts = src('app/fonts/**/*.*')
        .pipe(dest('./dist/fonts'));

    const buildImg = src('app/img/**/*.*')
        .pipe(dest('./dist/img'));
});

task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
});

task('clean', async () => {
    del.sync('dist');
});

task('build', series('clean', 'export'));

task('default', parallel('css-libs', 'scss', 'script', 'browser-sync', 'watch'));
