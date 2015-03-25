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

		numberArr = numberArr.filter(function(num){
			return LETTER_MAPPING[num];
		});

		if(!numberArr || !numberArr.length){
			return cb();
		}

		if(numberArr.length === 1){
			return cb(null,LETTER_MAPPING[numberArr[0]].split(''));
		}

		var combinationStep = function(numberArr, ix) {

			var result = [];

			if(ix >= numberArr.length){
				return null;
			}

			var leadingNumber = numberArr[ix];

			var mapping = LETTER_MAPPING[leadingNumber];


			mapping.split('').forEach(function (char) {
				var recursed = combinationStep(numberArr, ix+1);
				if(recursed) {
					if(typeof(recursed) === 'object'){
						recursed.forEach(function(subset){
							result.push([char].concat(subset));
						});
					}else{
						result.push([char].concat(recursed));
					}


				}else{
					result.push(char);
				}
			});

			return result;

		};

		var final = combinationStep(numberArr,0);

		cb(null, final.map(function(chars){
			return chars.join('');
		}));


	},
	getAllWords: function(allCombinations, cb){
		var result = {};
		var filePath = PATH.join(__dirname, '../docs/words.txt');

		var readStream = fs.createReadStream(filePath);

		new lazy(readStream).lines.forEach(function(l) {
			var word = l.toString().toUpperCase();
			allCombinations.forEach(function(possibleWord){
				if(possibleWord === word){
					result[word] = true;
				}
			});
		});
		readStream.on('end', function(){
			cb(null,Object.keys(result));
		});
	}
}