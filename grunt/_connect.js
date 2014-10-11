var lrSnippet  = require('connect-livereload')();
var pathConfig = require('./pathConfig');
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // 动态数据构造, 映射到mock文件夹
    var mockConnect = function (req, res, next) {
        // 测试数据，没有ext的暂定为服务器请求
        if (require('path').extname(req.url) === '') {

            var filePath = '../' + pathConfig.mock + req.url.split('?')[0] + '/' + req.method;
            //var fileStr = require('fs').readFileSync( filePath , 'utf-8');

            // 删除数据缓存,以免修改后不更新
            delete require.cache[filePath];

            grunt.log.writeln(filePath);
            // 请求数据文件ç
            var fileJson = require(filePath);

            var fileStr  = JSON.stringify(fileJson);
            //grunt.log.writeln(fileStr);
            //grunt.log.writeln(res.statusCode);
            //grunt.log.writeln(req.method);

            //grunt.log.writeln(req.url);
            //grunt.log.writeln(req.url + ':  ' + fileJson.status);

            res.statusCode = fileJson.status || 200;
            //grunt.log.writeln(fileStr);
            res.end(fileStr);
        }
        else {

            next();
        }
    };

    return {
        connect: {
            options: {
                port: 9999,
                hostname: '0.0.0.0'
            },
            server: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, pathConfig.tmp),
                            mountFolder(connect, pathConfig.app),
                            mockConnect
                        ];
                    }
                }
            }
        }
    };
};
