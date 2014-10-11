module.exports = {
    htmlmin: {
        options: {
            collapseWhitespace: true
        },
        dist: {
            files: [{
                expand: true,
                cwd: '<%= paths.dist %>',
                src: ['**/*.html'],
                dest: '<%= paths.dist %>'
            }]
        }
    }
};
