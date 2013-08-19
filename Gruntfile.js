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
        },
        downloadDir: '/tmp',
        sencha: {
            cmd: {
                version: '3.1.2.342',
                path: '<%= downloadDir %>/SenchaCmd-<%= sencha.cmd.version %>-linux-x64.run',
                zipPath: '<%= sencha.cmd.path %>.zip',
                url: 'http://cdn.sencha.com/cmd/<%= sencha.cmd.version %>/SenchaCmd-<%= sencha.cmd.version %>-linux-x64.run.zip'
            },
            sdk: {
                version: '2.2.1',
                path: '<%= downloadDir %>/touch-<%= sencha.sdk.version %>',
                zipPath: '<%= downloadDir %>/sencha-touch-<%= sencha.sdk.version %>-gpl.zip',
                url: 'http://cdn.sencha.com/touch/sencha-touch-<%= sencha.sdk.version %>-gpl.zip'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent']);

    grunt.registerTask('install', ['install-sencha-cmd', 'install-sencha-sdk']);

    grunt.registerTask('install-sencha-cmd', function() {
        var done = this.async();
        var opt = grunt.config('sencha.cmd');

        grunt.util.async.series({
            download: function(callback) {
                grunt.log.subhead('downloading installer...');

                if (grunt.file.exists(opt.zipPath)) {
                    grunt.log.writeln('installer already downloaded, skipping download process...');

                    callback();
                } else {
                    grunt.log.writeln('downloading from %s', opt.url.underline);

                    downloadFile(opt.url, opt.zipPath, callback);
                }
            },

            extract: function(callback) {
                grunt.log.subhead('extracting...');

                grunt.util.spawn({
                    cmd: 'unzip',
                    args: ['-o', opt.zipPath, '-d', grunt.config('downloadDir')]
                }, callback);
            },

            makeExecutable: function(callback) {
                grunt.log.subhead('making executable...');

                grunt.util.spawn({
                    cmd: 'chmod',
                    args: ['+x', opt.path]
                }, callback);
            },

            execute: function(callback) {
                grunt.log.subhead('executing...');

                grunt.util.spawn({
                    cmd: opt.path,
                    args: ['--mode', 'unattended']
                }, callback);
            }
        }, done);
    });

    grunt.registerTask('install-sencha-sdk', function() {
        var done = this.async();
        var opt = grunt.config('sencha.sdk');

        grunt.util.async.series({
            download: function(callback) {
                grunt.log.subhead('downloading sencha touch %s...', opt.version);

                if (grunt.file.exists(opt.zipPath)) {
                    grunt.log.writeln('sdk already downloaded, skipping...');

                    callback();
                } else {
                    grunt.log.writeln('downloading from %s', opt.url.underline);

                    downloadFile(opt.url, opt.zipPath, callback);
                }
            },

            extract: function(callback) {
                grunt.log.subhead('extracting...');

                grunt.util.spawn({
                    cmd: 'unzip',
                    args: ['-o', opt.zipPath, '-d', grunt.config('downloadDir')]
                }, callback);
            },

            generateWorkspace: function(callback) {
                grunt.log.subhead('generating sencha workspace...');

                grunt.util.spawn({
                    cmd: 'sencha',
                    args: ['-sdk', opt.path, 'generate', 'workspace', __dirname + '/www']
                }, callback);
            }
        }, done);
    });
};

/**
 * download helper
*/
var ProgressBar = require('progress');
var http = require('http');
var fs = require('fs');

function downloadFile(url, filePath, callback) {
    var file = fs.createWriteStream(filePath);

    http.get(url, function(res) {
        res.pipe(file);

        var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: parseInt(res.headers['content-length'], 10)
        });

        res.on('data', function(chunk) {
            bar.tick(chunk.length);
        });

        res.on('end', callback);
    });
}

