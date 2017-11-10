// BinarySearch.js

exports.find = function BinarySearch(a, f, c) {
	if (f(a[0]) > c) return 0;
	if (f(a[a.length - 1]) <= c) return -1;
	var lo = 0;
	var hi = a.length - 1;
	while (lo < hi) {
		var mid = Math.trunc(lo + (hi - lo) / 2);
		if (f(a[mid]) > c) hi = mid;
		else lo = mid + 1;
	}
	return hi;
}
