/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = (nums) => {
  let sum = 0;
  let maxx = nums[0];
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    maxx = Math.max(sum, maxx);
    if (sum < 0) {
      sum = 0;
    }
  }
  return maxx;
};
