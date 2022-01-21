/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = (matrix, target) => {
  let index = -1;
  let m = matrix[0].length;
  let n = matrix.length;
  if (target < matrix[0][0] || target > matrix[n - 1][m - 1]) {
    return false;
  }
  for (let i = 0; i < n - 1; i++) {
    if (matrix[i][0] <= target && matrix[i + 1][0] > target) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    index = n - 1;
  }
  for (let i = 0; i < m; i++) {
    if (target === matrix[index][i]) {
      return true;
    }
  }
  return false;
};
