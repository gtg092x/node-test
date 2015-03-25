var numbers = require('../../lib/numbersToTIWords');

var tests = module.exports = {
	tiTest: function () {
		var input = '228';
		console.log('input', input.split(''));
		numbers.getAllCombinations(input.split(''), console.log);
	},
	wordTest: function () {
		var input = [
			'AAU',
			'AAV',
			'ABT',
			'ABU',
			'ABV',
			'ACT',
			'ACU',
			'ACV',
			'BAT',
			'BAU',
			'BAV',
			'BBT',
			'BBU',
			'BBV',
			'BCT',
			'BCU',
			'BCV',
			'CAT',
			'CAU',
			'CAV',
			'CBT',
			'CBU',
			'CBV',
			'CCT',
			'CCU',
			'CCV'
		];
		numbers.getAllWords(input, console.log);
	}
}

tests.wordTest();