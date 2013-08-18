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

    grunt.registerTask('install', ['install-sencha-cmd', 'install-sencha-sdk']);

    grunt.registerTask('install-sencha-cmd', function() {
        var done = this.async();
        var tpl = function(template, data) {
            return grunt.template.process(template, {data: data});
        };

        var version = '3.1.2.342';
        var workingDir = '/tmp';
        var installerPath = tpl('<%= dir %>/SenchaCmd-<%= version %>-linux-x64.run', {dir: workingDir, version: version});
        var zipPath = installerPath + '.zip';

        grunt.util.async.series({
            download: function(callback) {
                grunt.log.subhead('downloading installer...');

                if (grunt.file.exists(zipPath)) {
                    grunt.log.writeln('installer already downloaded, skipping download process...');

                    callback();
                } else {
                    var installerUrl = tpl('http://cdn.sencha.com/cmd/<%= version %>/SenchaCmd-<%= version %>-linux-x64.run.zip', {version: version});

                    grunt.log.writeln('downloading from %s', installerUrl.underline);

                    downloadFile(installerUrl, zipPath, callback);
                }
            },

            extract: function(callback) {
                grunt.log.subhead('extracting...');

                grunt.util.spawn({
                    cmd: 'unzip',
                    args: ['-o', installerPath, '-d', workingDir]
                }, callback);
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
            }
        }, done);
    });

    grunt.registerTask('install-sencha-sdk', function() {
        var done = this.async();
        var tpl = function(template, data) {
            return grunt.template.process(template, {data: data});
        };

        var version = '2.2.1';
        var workingDir = '/tmp';
        var sdkPath = tpl('<%= dir %>/touch-<%= version %>', {dir: workingDir, version: version});
        var zipPath = tpl('<%= dir %>/sencha-touch-<%= version %>-gpl.zip', {dir: workingDir, version: version});
        var appPath = __dirname + '/www';

        grunt.util.async.series({
            download: function(callback) {
                grunt.log.subhead('downloading sencha touch %s...', version);

                if (grunt.file.exists(zipPath)) {
                    grunt.log.writeln('sdk already downloaded, skipping...');

                    callback();
                } else {
                    var sdkUrl = tpl('http://cdn.sencha.com/touch/sencha-touch-<%= version %>-gpl.zip', {version: version});

                    grunt.log.writeln('downloading from %s', sdkUrl.underline);

                    downloadFile(sdkUrl, zipPath, callback);
                }
            },

            extract: function(callback) {
                grunt.log.subhead('extracting...');

                grunt.util.spawn({
                    cmd: 'unzip',
                    args: ['-o', zipPath, '-d', workingDir]
                }, callback);
            },

            generateWorkspace: function(callback) {
                grunt.log.subhead('generating sencha workspace...');

                grunt.util.spawn({
                    cmd: 'sencha',
                    args: ['-sdk', sdkPath, 'generate', 'workspace', appPath]
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

