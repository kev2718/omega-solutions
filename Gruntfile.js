module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // all bower components get into vendor css and js files, separate js and css
        bower_concat: {
            libjs: {
                options: {
                    separator: ';\n/*Next lib*/\n'
                },
                dest: {
                    js: 'dist/js/libs.js'
                },
                mainFiles: {
                  'MDBootstrap': ['js/mdb.js']
                },
                dependencies: {
				  'bootstrap': ['jquery', 'popper.js'],
				  'MDBootstrap': ['jquery', 'popper.js', 'bootstrap']
				}
            },
            libcss: {
                options: {
                    separator: ';\n/*Next lib*/\n'
                },
                dest: {
                    css: 'dist/css/libs.css'
                },
                mainFiles: {
                    'bootstrap': ['dist/css/bootstrap.css'],
                    'MDBootstrap': 'css/mdb.css'
                },
                dependencies: {
				  'MDBootstrap': 'bootstrap'
				}
            }
        },
        // vendor.js files get minified
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true
            },
            build: {
                src: 'dist/js/libs.js',
                dest: 'dist/js/libs.min.js'
            }
        },
        // vendor.css file get minified
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // load every bower install framework in one vendor.js and vendor.css and minified them
    grunt.registerTask('default', ['bower_concat:libjs', 'bower_concat:libcss', 'uglify', 'cssmin']);
};
