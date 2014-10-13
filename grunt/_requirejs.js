module.exports = {
    requirejs: {
        dist: {
            options: {
                optimize: 'uglify',
                uglify: {
                    toplevel: true,
                    ascii_only: false,
                    beautify: false
                },
                preserveLicenseComments: true,
                useStrict: false,
                wrap: true
            }
        }
    }
};
