module.exports = {
    rev: {
        dist: {
            files: {
                src: [
                    '<%= paths.dist %>/javascripts/**/*.js',
                    '<%= paths.dist %>/stylesheets/**/*.css',
                    '<%= paths.dist %>/images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf}'
                ]
            }
        }
    }
};
