var gulp = require("gulp");
var scss = require("gulp-sass");
var browserSync = require('browser-sync');

gulp.task("default", async function () {
    console.log("This is default task...");
}); 

gulp.task('browser-sync', function (cb) {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify:false
    });
    cb();
});

gulp.task("compile", function (cb) {
    gulp.src("app/scss/**/*.scss").pipe(scss())
        .pipe(gulp.dest("app/css")).pipe(browserSync.reload({ stream: true }));
    cb();
});

gulp.task("watch", async function() {
    await gulp.series('compile', 'browser-sync')();
    console.log("--->");
    gulp.watch("app/scss/**/*.scss", gulp.series("compile"));
    //gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/*.html', async () => {
        await browserSync.reload();
        console.log("Reloaded!")
    });
});