import glob from 'glob';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import nunjucks from 'gulp-nunjucks';
import rimraf from 'rimraf';

function clean() {
	return glob('./www/*.{html,jpg,svg}', {}, function(er, files) {
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

const build = gulp.series(clean, compileNunjucks, compressImages);

export {
	build
}