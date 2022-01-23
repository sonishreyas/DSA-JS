/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = (x, n) => {
	let nn = n;
	let ans = 1;
	if (nn < 0) nn = -n;
	while (nn) {
		if (nn % 2) {
			ans *= x;
			nn--;
		} else {
			x *= x;
			nn /= 2;
		}
	}
	if (n < 0) ans = 1 / ans;
	return ans;
};
