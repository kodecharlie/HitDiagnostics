// HitDiagnostics.js

const BadProcessException = require('./BadProcessException.js'),
      BadDurationException = require('./BadDurationException.js'),
      BinarySearch = require('./BinarySearch.js');

const processHitTimes = {};
const FIVE_MINUTES = 5 * 60 * 1000; // 5m in milliseconds.

// @param process names the process for which we are logging diagnostic data.
exports.logHit = function(process) {
    let now = Date.now();

    if (processHitTimes[process] == null) {
        processHitTimes[process] = new Array();
    }

    // Expunge old timestamps, if any.
    let old = now - FIVE_MINUTES;
    let curProcess = processHitTimes[process];

    let removeCount = 0;
    for (let i = 0; i < curProcess.length; ++i) {
        let curTs = curProcess[i];
        if (curTs < old) {
            ++removeCount;
        } else {
            break;
        }
    }
    curProcess.splice(0, removeCount);

    curProcess.push(now);
}

// @param process names the process for which we are querying diagnostic data.
// @param duration is the window of time, from now, over which we are querying
// diagnostic data for the named process; duration should be in units of milliseconds.
// Note that duration is capped at 5 minutes.
// @return a JSON object that names the process and the number of hits logged
// over the specified duration.
exports.getHitLog = function(process, duration) {
    if (processHitTimes[process] == null) {
        // No hits as yet logged. Just return 0.
        return { process: process, numHits: 0 };
    }

    if (duration > FIVE_MINUTES || duration <= 0) {
        throw BadDurationException(duration);
    }

    let curProcess = processHitTimes[process];
    let now = Date.now();
    let then = now - duration;
    let numProcessHits = 0;

    // Binary search hit log for smallest element that is still larger than THEN.
    let tsFun = function(x) { return x; }
    let smallestIdx = BinarySearch.find(curProcess, tsFun, then);
    if (smallestIdx >= 0) {
        numProcessHits = curProcess.length - smallestIdx;
    }

    return { process: process, numHits: numProcessHits };
}
