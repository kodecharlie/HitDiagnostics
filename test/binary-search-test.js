const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const BinarySearch = require('../BinarySearch.js');
const testFun = function(x) { return x; }

before(function() {
    if (process.env.NODE_ENV != "test") {
        this.skip();
    }
    
    console.log("Running tests for BinarySearch.");
});

describe('Testing the binary search', function() {
    if (process.env.NODE_ENV != "test") {
        this.skip();
    }

    let ar = [4,5,6,7,8,9];

    it('Should return index of 0 if ALL array elements are greater than 0.', function() {
        let idx0 = BinarySearch.find(ar, testFun, 0);
        expect(idx0).equals(0);
    });

    it('Should return -1 since ALL array elements are less than 10.', function() {
        let idx10 = BinarySearch.find(ar, testFun, 10);
        expect(idx10).equals(-1);
    });

    it('Should return 1.', function() {
        let idx1 = BinarySearch.find(ar, testFun, 4.5);
        expect(idx1).equals(1);
    });

    it('Should return 5.', function() {
        let idx5 = BinarySearch.find(ar, testFun, 8.5);
        expect(idx5).equals(5);
    });
});
