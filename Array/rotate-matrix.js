/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = (matrix) => {
	let rows = matrix.length;
	let columns = matrix[0].length;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < i; j++) {
			[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
		}
	}

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns / 2; j++) {
			[matrix[i][j], matrix[i][columns - 1 - j]] = [
				matrix[i][columns - 1 - j],
				matrix[i][j],
			];
		}
	}
};
