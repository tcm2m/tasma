module.exports = function(grunt) {
    grunt.initConfig({
        concurrent: {
            target: {
                tasks: ['watch', 'connect'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        watch: {
            css: {
                files: 'www/resources/sass/*.scss',
                tasks: ['compass']
            }
        },
        compass: {
            dev: {
                options: {
                    config: 'www/resources/sass/config.rb'
                }
            }
        },
        connect: {
            server: {
                options: {
                    base: 'www',
                    hostname: '*',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent']);
};