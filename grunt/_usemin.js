module.exports = {
    useminPrepare: {
        html: ['<%= paths.app %>/**/*.html'],
        options: {
            dest: '<%= paths.dist %>'
        }
    },
    usemin: {
        html: ['<%= paths.dist %>/**/*.html'],
        css: ['<%= paths.dist %>/stylesheets/**/*.css'],
        options: {
            dirs: ['<%= paths.dist %>'],
            assetsDirs: ['<%= paths.dist %>']
        }
    }
};
