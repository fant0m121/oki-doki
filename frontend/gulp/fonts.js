'use strict';

var path = require('path');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var entries = config.entries;
  var dest = path.join(taskTarget, dirs.fonts.replace(/^_/, ''));

  gulp.task('fonts', function () {
    gulp.src(path.join(dirs.source, dirs.fonts, entries.font))
      .pipe(plugins.plumber())
      .pipe(plugins.rename(function(path) {
        path.dirname = path.dirname.replace(dirs.source, '').replace('_', '');
      }))
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream());
  });
};
