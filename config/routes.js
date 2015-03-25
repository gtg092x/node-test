var server = require('../managers/server');
var wordController = require('../controllers/words');

module.exports = function(cb){

    server.get('/api/wordCombinations',wordController.combinations);

    cb();
}