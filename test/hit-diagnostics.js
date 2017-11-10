const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const HitDiagnostics = require('../HitDiagnostics.js');
const testFun = function(x) { return x; }

const TEST_PROCESS = "UNIT_TEST";
const ALT_PROCESS = "ALT_TEST";

const FIVE_SECONDS = 5*1000;
const THIRTY_SECONDS = 30*1000;

before(function() {
    if (process.env.NODE_ENV != "test") {
        this.skip();
    }
    
    console.log("Running tests for HitDiagnostics.");
});

describe('Testing HitDiagnostics', function() {
    if (process.env.NODE_ENV != "test") {
        this.skip();
    }

    it('Should return 0 count when there are no hits logged.', function() {
        let hitLog = HitDiagnostics.getHitLog(TEST_PROCESS, THIRTY_SECONDS);
        expect(hitLog.numHits).equals(0);
    });

    it('Should return 1 after 1 hit.', function() {
        HitDiagnostics.logHit(TEST_PROCESS);
        let hitLog = HitDiagnostics.getHitLog(TEST_PROCESS, THIRTY_SECONDS);
        expect(hitLog.numHits).equals(1);
    });

    it('Should return 2 after 2 hits.', function() {
        HitDiagnostics.logHit(TEST_PROCESS);
        let hitLog = HitDiagnostics.getHitLog(TEST_PROCESS, THIRTY_SECONDS);
        expect(hitLog.numHits).equals(2);
    });

    it('Should still return 2 after logging hits to alternate process.', function() {
        for (let i = 0; i < 5; ++i) {
            HitDiagnostics.logHit(ALT_PROCESS);
        }

        let hitLog = HitDiagnostics.getHitLog(TEST_PROCESS, THIRTY_SECONDS);
        expect(hitLog.numHits).equals(2);
    });

    it('Should return 0 after 5 seconds, and with a duration of 5 seconds.', function(done) {
        setTimeout(function() {
            let hitLog = HitDiagnostics.getHitLog(TEST_PROCESS, FIVE_SECONDS);
            expect(hitLog.numHits).equals(0);
            done();
        }, 5000);
    });
});
