module.exports = {
    ngAnnotate: {
        options: {
            add: true,
            remove: true,
            singleQuotes: true,
        },
        dist: {
            files: {
                'a.js': ['a.js'],
                'c.js': ['b.js'],
                'f.js': ['d.js', 'e.js'],
            },
        }
    }
};
