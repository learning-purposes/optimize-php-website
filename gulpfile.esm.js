import glob from 'glob';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import rename from 'gulp-rename';
import nunjucks from 'gulp-nunjucks';
import rimraf from 'rimraf';
import sass from 'gulp-sass';

function clean() {
	return glob('./www/*.{html,jpg,svg,webP,css}', {}, function(er, files) {
		for(let file in files) {
			rimraf(files[file], () => {});
		}
	})
}

function compileNunjucks() {
	return gulp.src('src/*.html')
	.pipe(nunjucks.compile())
	.pipe(gulp.dest('www'));
}

function compressImages() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin([
		imagemin.mozjpeg({quality:75, progressive: true}),
	]))
	.pipe(gulp.dest('www/img'))
}

function createWebP() {
	return gulp.src("www/img/**/*")
	.pipe(imagemin([
		imageminWebp()
	]))
	.pipe(rename(function (path) {
		path.extname = ".webp";
	}))
	.pipe(gulp.dest('www/img'));
}

function compileSass() {
	return gulp.src('./src/scss/main.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./www/'))
}

const build = gulp.series(clean, compileNunjucks, compressImages, createWebP, compileSass);

export {
	build
}