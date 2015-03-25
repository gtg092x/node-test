// server is a cached singleton
var server = require('../managers/server');
var wordController = require('../controllers/words');

module.exports = function(cb){

    // one route - controllers follow the restify/express API
    server.get('/api/wordCombinations',wordController.combinations);

    cb();
}