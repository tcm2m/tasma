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

    grunt.registerTask('install-sencha-cmd', function() {
        var done = this.async();
        var tpl = function(template, data) {
            return grunt.template.process(template, {data: data});
        };

        var version = '3.1.2.342';
        var installerPath = tpl('<%= path %>/SenchaCmd-<%= version %>-linux-x64.run', {path: __dirname, version: version});
        var zipPath = installerPath + '.zip';

        grunt.util.async.series({
            download: function(callback) {
                grunt.log.subhead('downloading installer...');

                if (grunt.file.exists(zipPath)) {
                    grunt.log.writeln('installer already downloaded, skipping download process...');

                    callback();
                } else {
                    var ProgressBar = require('progress');
                    var http = require('http');
                    var fs = require('fs');
                    var file = fs.createWriteStream(zipPath);
                    var installerUrl = tpl('http://cdn.sencha.com/cmd/<%= version %>/SenchaCmd-<%= version %>-linux-x64.run.zip', {version: version});

                    grunt.log.writeln('downloading from %s', installerUrl.underline);

                    http.get(installerUrl, function(res) {
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
            },

            unzip: function(callback) {
                grunt.log.subhead('unzipping...');

                if (grunt.file.exists(installerPath)) {
                    grunt.log.writeln('installer already unzipped, skipping unzip process...');

                    callback();
                } else {
                    grunt.util.spawn({
                        cmd: 'unzip',
                        args: ['-o', installerPath]
                    }, callback);
                }
            },

            makeExecutable: function(callback) {
                grunt.log.subhead('making executable...');

                grunt.util.spawn({
                    cmd: 'chmod',
                    args: ['+x', installerPath]
                }, callback);
            },

            execute: function(callback) {
                grunt.log.subhead('executing...');

                grunt.util.spawn({
                    cmd: installerPath,
                    args: ['--mode', 'unattended']
                }, callback);
            },

            clean: function(callback) {
                grunt.log.subhead('cleaning up...');

                grunt.util.spawn({
                    cmd: 'rm',
                    args: ['-rf', zipPath, installerPath]
                }, callback);
            }
        }, done);
    });
};