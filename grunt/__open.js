module.exports = {
    open: {
        server: {
            path: 'http://127.0.0.1:<%= connect.options.port %>',
            app: 'Google Chrome Canary'
        }
    }
};
