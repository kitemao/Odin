module.exports = function (grunt) {
    grunt.registerTask('server', [
        'concurrent:server',
        'connect:server',
        //'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jshint:test',
        'karma:test'
    ]);

    grunt.registerTask('test:travis', [
        'jshint:test',
        'karma:travis'
    ]);

    grunt.registerTask('build:staging', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'uglify',
        // 'cssmin', // Uncomment this line if using none-sass style
        // 'requirejs:dist', // Uncomment this line if using RequireJS in your project
        'rev',
        'copy:compass',
        'imagemin',
        'usemin',
        'htmlmin',
        'cdn:staging',
        'compress:gzip',
        'aws_s3:staging'
    ]);

    grunt.registerTask('build:production', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'uglify',
        // 'cssmin', // Uncomment this line if using none-sass style
        // 'requirejs:dist', // Uncomment this line if using RequireJS in your project
        'rev',
        'copy:compass',
        'imagemin',
        'usemin',
        'htmlmin',
        'cdn:dist',
        'compress:gzip',
        'aws_s3:production'
    ]);

    grunt.registerTask(['update'], [
        'bump-only:patch',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:minor'], [
        'bump-only:minor',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:major'], [
        'bump-only:major',
        'changelog',
        'bump-commit'
    ]);
};
