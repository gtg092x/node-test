var numbersToTIWords = require('../lib/numbersToTIWords');

module.exports = {
	combinations: function(req, res, next){

		var query = req.params.q;
		var simple = req.params.format === 'simple';
		var nanFail;
		var queryEntries;


		if(!query){
			return res.send(400, new Error('Please supply the parameter \'q\''));
		}

		nanFail = false;
		queryEntries = query.split('');
		queryEntries.forEach(function(char){
			if(isNaN(char)){
				nanFail = true;
			}
		});

		if(nanFail){
			return res.send(400, new Error('Parameter \'q\' must be a number or series of numbers.'));
		}

		numbersToTIWords.getAllCombinations(queryEntries, function(err, allCombinations){
			if(!allCombinations || !allCombinations.length){
				res.send({ realWords: [], allCombinations:[] });
				next();
				return;
			}
			numbersToTIWords.getAllWords(allCombinations, function(err, words){
				if(simple){
					res.send(words.length ? words.join(', ') : 'No words found');
				}else {
					res.send({realWords: words, allCombinations: allCombinations});
				}
				next();
			});
		});


	}
}