module.exports = {
    compass: {
        options: {
            sassDir: '<%= paths.app %>/admin/compass/sass',
            imagesDir: '<%= paths.app %>/admin/compass/images',
            fontsDir: '<%= paths.app %>/admin/images/fonts',
            relativeAssets: true
        },
        dist: {
            options: {
                cssDir: '<%= paths.dist %>/stylesheets',
                generatedImagesDir: '<%= paths.tmp %>/images',
                httpGeneratedImagesPath: '/images/',
                outputStyle: 'compressed',
                environment: 'production',
                relativeAssets: false
            }
        },
        server: {
            options: {
                cssDir: '<%= paths.tmp %>/stylesheets',
                generatedImagesDir: '<%= paths.tmp %>/images',
                debugInfo: true,
                environment: 'development'
            }
        }
    }
};
