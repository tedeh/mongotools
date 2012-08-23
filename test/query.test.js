var mocha = require('mocha');
var should = require('should');
var mongotools = require(__dirname + '/../');

describe('mongotools query', function() {

  describe('find', function() {

    it('should match a single field', function() {
      var data = [{_id: 1}, {_id: 2}];
      var result = mongotools(data).find({_id: 2});
      should.exist(result);
      result.should.be.instanceof(Array).and.have.lengthOf(1);
      should.exist(result[0]);
      result[0].should.have.property('_id', 2);
    });

    it('should match several fields', function() {
      var data = [{_id: 1, value: 2, diff: 1}, {_id: 2, value: 2, diff: 2}];
      var result = mongotools(data).find({value: 2, diff: 2});
      should.exist(result);
      result.should.be.instanceof(Array).and.have.lengthOf(1);
      should.exist(result[0]);
      result[0].should.have.property('_id', 2);
    });

    describe('conditional operators', function() {

      var data = [{_id: 1, value: 1}, {_id: 2, value: 2}, {_id: 3, value: 3}, {_id: 4, value: 4}];

      it('should handle $gt', function() {
        var result = mongotools(data).find({value: {$gt: 3}});
        should.exist(result);
        result.should.be.instanceof(Array).and.have.lengthOf(1);
        should.exist(result[0]);
        result[0].should.have.property('_id', 4).and.property('value', 4);
      });

      it('should handle $gte', function() {
        var result = mongotools(data).find({value: {$gt: 4}});
        should.exist(result);
        result.should.be.instanceof(Array).and.have.lengthOf(1);
        should.exist(result[0]);
        result[0].should.have.property('_id', 4).and.property('value', 4);
      });

      it('should handle $lt', function() {
        var result = mongotools(data).find({value: {$lt: 2}});
        should.exist(result);
        result.should.be.instanceof(Array).and.have.lengthOf(1);
        should.exist(result[0]);
        result[0].should.have.property('_id', 1).and.property('value', 1);
      });

      it('should handle $lte', function() {
        var result = mongotools(data).find({value: {$lte: 1}});
        should.exist(result);
        result.should.be.instanceof(Array).and.have.lengthOf(1);
        should.exist(result[0]);
        result[0].should.have.property('_id', 1).and.property('value', 1);
      });

    });

    it('should match with all values $all', function() {
      var data = [{_id: 1, value: [1, 2, 3]}, {_id: 2, value: [2, 3, 4]}];
      var result = mongotools(data).find({value: {$all: [3, 4]}});
      should.exist(result);
      result.should.be.instanceof(Array).and.have.lengthOf(1);
      should.exist(result[0]);
      should.exist(result[0].value);
      result[0].value.should.include(3).and.include(4);
    });

    it('should match any value with $in', function() {
      var data = [{_id: 1, value: [1, 2]}, {_id: 2, value: [2, 3]}, {_id: 3, value: [3, 4]}];
      var result = mongotools(data).find({value: {$in: [1, 3]}});
      should.exist(result);
      result.should.be.instanceof(Array).and.have.lengthOf(3);
    });

    it('should not match any value with $nin', function() {
      var data = [{_id: 1, value: [1, 2]}, {_id: 2, value: [2, 3]}, {_id: 3, value: [3, 4]}];
      var result = mongotools(data).find({value: {$nin: [1, 4]}});
      should.exist(result);
      result.should.be.instanceof(Array).and.have.lengthOf(1);
      should.exist(result[0]);
      should.exist(result[0].value);
      result[0].should.have.property('_id', 1);
      result[0].value.should.be.instanceof(Array).and.not.include(1).and.not.include(4);
    });

    describe('$exists', function() {

      it('should handle values which very obviously exist', function() {
        var data = [{_id: 1, value: 5}];
        var result = mongotools(data).find({value: {$exists: true}});
        should.exist(result);
        result.should.be.instanceof(Array).and.have.lengthOf(1);
        should.exist(result[0]);
        result[0].should.have.property('value', 5);
      });

      it('should find values that are falsy', function() {
        var data = [{_id: 1, value: null}, {_id: 1, value: 5}];
        var result = mongotools(data).find({value: {$exists: true}});
        should.exist(result);
        result.should.be.instanceof(Array).and.have.lengthOf(2);
      });

      it('should not find values that exist', function() {
        var data = [{_id: 1, value: null}, {_id: 1, value: 5}];
        var result = mongotools(data).find({value: {$exists: false}});
        should.exist(result);
        result.should.be.instanceof(Array).and.have.lengthOf(0);
      });

    });

    it('should handle $mod');

    it('should handle $nor');

    it('should handle $ne', function() {
      var data = [{_id: 1, value: 2}, {_id: 2, value: 1}];
      var result = mongotools(data).find({value: {$ne: 2}});
      should.exist(result);
      result.should.be.instanceof(Array).and.have.lengthOf(1);
      should.exist(result[0]);
      result[0].should.have.property('_id', 2).and.property('value', 1);
    });

    it('should handle $size');

    it('should handle values in an array');

    it('should handle $elemMatch');

    describe('$type', function() {

      it('should handle Double (1)');

      it('should handle String (2)');

      it('should handle Object (3)');

      it('should handle Array (4)');

      it('should handle Binary data (5)');

      it('should handle Object id (7)');

      it('should handle Boolean (8)');

      it('should handle Date (9)');

      it('should handle Null (10)');

      it('should handle Regular expression (11)');

      it('should handle JavaScript code (13)');

      it('should handle Symbol (14)');

      it('should handle JavaScript code with scope (15)');

      it('should handle 32-bit integer (16)');

      it('should handle Timestamp (17)');

      it('should handle 64-bit integer (18)');

      //it('should handle Min key (255)');
      
      //it('should handle Max key (127)');

    });

    it('should handle $and');

    it('should handle $or');

    it('should handle regular expressions');

    it('should handle $not');

    it('should handle $where');

  });

});
