var restify = require('restify');
var server = restify.createServer()

server.use(restify.queryParser());

module.exports = server;
