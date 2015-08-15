var cluster = require('cluster');//node内置模块，支持多进程多核处理(这儿文件会被运行多次)
var http = require('http');
var https = require('https');
var app = require('./app/app');

var log = require("./util/log");

var port = 3000;

var httpServer = http.createServer(app);
httpServer.listen(port, null, function() {
    log.debug('HTTP server started: http://localhost:' + port);
});
