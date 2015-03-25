var numbers = require('../../lib/numbersToTIWords');
var assert = require("assert")
var fs = require('fs');
var PATH = require('path');
var should = require('should');

describe('Numbers to TI Words', function(){
	describe('#getAllCombinations()', function(){
		it('should get all combinations without error', function(done){
			var input = '228';
			numbers.getAllCombinations(input.split(''), function(err, combinations){
				should(err).be.exactly(null);
				done();
			});
		});
		it('should get second level arrays that match input dimensions', function(done){
			var input = '228';
			numbers.getAllCombinations(input.split(''), function(err, combinations){
				combinations.should.be.Array;
				(combinations.length).should.be.above(0);
				(combinations[0]).should.be.String;
				(input.length).should.be.exactly(combinations[0].length);
				done();
			});
		});
		it('should ignore numbers that do not have mapped letters', function(done){
			var input = '2281';
			numbers.getAllCombinations(input.split(''), function(err, combinations){
				should(err).be.exactly(null);
				(combinations.length).should.be.above(0);
				(input.replace(/1/g,'').length).should.be.exactly(combinations[0].length);
				done();
			});
		})
	});
	describe('#getAllWords()', function(){
		var words;
		var err;
		before(function(done){
			var mockData = require('./mocks/word-combinations');
			numbers.getAllWords(mockData, function(_err, _words){
				words = _words;
				err = _err;
				done();
			});
		});
		it('should not have an error', function(done) {
			should(err).be.exactly(null);
			done();
		});
		it('should find cat in mock', function(done){
				var cat = words.filter(function(word){
					return word === 'CAT';
				});

				should(cat).not.be.exactly(null);

				done();

		});
	});
});

