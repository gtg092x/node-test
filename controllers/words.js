var numbersToTIWords = require('../lib/numbersToTIWords');

var NO_WORDS_MESSAGE = 'No words found';

module.exports = {
	combinations: function(req, res, next){

		var query = req.params.q;
		var simple = req.params.format === 'simple';
		var nanFail;
		var queryArray;

		// 400 err code is bad request
		if(!query){
			return res.send(400, new Error('Please supply the parameter \'q\''));
		}

		// we could check to see if the whole input is NaN, but we do not processes it that way
		// this is more semantically consistent
		nanFail = false;
		queryArray = query.split('');
		queryArray.forEach(function(char){
			if(isNaN(char)){
				nanFail = true;
			}
		});

		// 400 err code is bad request
		if(nanFail){
			return res.send(400, new Error('Parameter \'q\' must be a number or series of numbers.'));
		}

		numbersToTIWords.getAllCombinations(queryArray, function(err, allCombinations){
			// if results are empty, bail
			if(!allCombinations || !allCombinations.length){
				if(simple) {
					res.send(NO_WORDS_MESSAGE);
				}else{
					res.send({ realWords: [], allCombinations:[] });
				}
				next();
				return;
			}

			// simple view is for unity gui
			numbersToTIWords.getAllWords(allCombinations, function(err, words){
				if(simple){
					res.send(words.length ? words.join(', ') : NO_WORDS_MESSAGE);
				}else {
					res.send({realWords: words, allCombinations: allCombinations});
				}
				next();
			});
		});


	}
}