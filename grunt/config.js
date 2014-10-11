module.exports = function (grunt) {
    var _          = grunt.util._;
    var fs         = require('fs');
    var pathConfig = require('./pathConfig');

    var configOpts = {};

    // load outside config blocks
    _.each(fs.readdirSync('grunt'), function(filePath) {
        if (filePath.indexOf('_') === 0 && filePath.indexOf('__') === -1) {
            var fileCtn = require('./' + filePath);

            if (typeof fileCtn === 'function') {
                fileCtn = fileCtn(grunt);
            }

            _.extend(configOpts, fileCtn);
        }
    });

    // config constant
    _.extend(configOpts, {
        paths: pathConfig
    });

    grunt.initConfig(configOpts);
};
