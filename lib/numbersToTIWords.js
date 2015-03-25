var fs = require('fs');
var PATH = require('path');
var lazy = require('lazy');

var LETTER_MAPPING = {
	'1': '', // punctuation
	'2': 'ABC',
	'3': 'DEF',
	'4': 'GHI',
	'5': 'JKL',
	'6': 'MNO',
	'7': 'PQRS',
	'8': 'TUV',
	'9': 'WXYZ'
}

module.exports = {
	getAllCombinations: function(numberArr, cb){

		// number array is tokenized input
		numberArr = numberArr.filter(function(num){
			// remove any entry that doesn't have a mapping
			return LETTER_MAPPING[num];
		});

		// if we don't have values, exit
		if(!numberArr || !numberArr.length){
			return cb();
		}

		// if we have only one value, just return single entry
		if(numberArr.length === 1){
			return cb(null,LETTER_MAPPING[numberArr[0]].split(''));
		}

		// solution is recursive use of combinationStep
		var combinationStep = function(numberArr, ix) {

			// result is specific to recurse scope
			var result = [];

			// recursion exit condition
			if(ix >= numberArr.length){
				return null;
			}

			// mapping key
			var leadingNumber = numberArr[ix];
			var mapping = LETTER_MAPPING[leadingNumber];

			// tokenized letter mapping
			mapping.split('').forEach(function (char) {

				// recursing and adding results to result
				var recursed = combinationStep(numberArr, ix+1);
				if(recursed) {
					if(typeof(recursed) === 'object'){
						recursed.forEach(function(subset){
							result.push([char].concat(subset));
						});
					}else{
						// if previous recusion is not array, just add string value
						// (happens two steps prior to final recursion)
						result.push([char].concat(recursed));
					}


				}else{
					// (happens one step prior to final recursion)
					result.push(char);
				}
			});

			return result;

		};

		// initial call of recursive method
		var final = combinationStep(numberArr,0);

		// no longer need tokenized arrays of chars
		cb(null, final.map(function(chars){
			return chars.join('');
		}));


	},
	getAllWords: function(allCombinations, cb){
		var result = {};
		var filePath = PATH.join(__dirname, '../docs/words.txt');

		// use a stream so we don't have massive buffers
		var readStream = fs.createReadStream(filePath);

		// lazy library uses generator pattern with streams
		new lazy(readStream).lines.forEach(function(line) {
			// match case for simplicity's sake
			var word = line.toString().toUpperCase();
			// iterate all combinations per word - could lead to O problems
			// better this approach because buffer for combinations is smaller than word dictionary
			allCombinations.forEach(function(possibleWord){
				if(possibleWord === word){
					result[word] = true;
				}
			});
		});
		// end of stream means generator is exhausted
		readStream.on('end', function(){
			cb(null,Object.keys(result));
		});
	}
}