var gulp        =  require('gulp'),
	pug 		=  require('gulp-pug'),
	sass        =  require('gulp-sass'),
    browserSync =  require('browser-sync').create(),
    concat      =  require('gulp-concat'),
    cleanCSS    =  require('gulp-clean-css'),
    connect     =  require('gulp-connect'),
    uglify      =  require('gulp-uglify');

// Pug in HTML
gulp.task('pug', function(){
    return gulp.src('src/theme/pages/*.pug')
	    .pipe(pug({
	    	pretty:true
	    }))
		.pipe(gulp.dest('build'))
	    .pipe(browserSync.stream());
});

// Sass in Css
gulp.task('sass', function(){
    return gulp.src('build/css/*.sass')
	    .pipe(sass())
	    .pipe(gulp.dest('./build/css'))
	    .pipe(browserSync.stream());
});

// Оптимизация стилей
gulp.task('styles', function() {
    return gulp.src(['src/css/bootstrap.css','src/css/jquery.fancybox.css','src/css/nice-select.css','src/css/slick.css'])
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./build/dist/'))
        .pipe(connect.reload());
});

// Оптимизация скриптов
gulp.task('scripts', function() {
    return gulp.src(['src/js/jquery.min.js','src/js/jquery.fancybox.min.js','src/js/jquery.nice-select.min.js','src/js/slick.min.js'])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./build/dist/'));
});

// Инициализация Browser sync и прослушка файлов
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: "./build"  
    });
    gulp.watch(['build/css/*.sass'], gulp.series('sass'));
    gulp.watch(['src/theme/pages/*.pug'], gulp.series('pug'));
    gulp.watch(['src/theme/components/*.pug'], gulp.series('pug'));
}));

// Дефолтние таски
gulp.task('default', gulp.parallel('pug', 'sass', 'serve', 'styles', 'scripts'));