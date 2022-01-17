/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = (nums1, m, nums2, n) => {
	let gap = Math.ceil((m + n) / 2);
	let i;
	let j;
	while (gap > 0) {
		i = 0;
		j = gap;
		while (j < n + m) {
			if (j < m && nums1[i] > nums1[j]) {
				[nums1[i], nums1[j]] = [nums1[j], nums1[i]];
			} else if (j >= m && i < m && nums1[i] > nums2[j - m]) {
				[nums1[i], nums2[j - m]] = [nums2[j - m], nums1[i]];
			} else if (j >= m && i >= m && nums2[i - m] > nums2[j - m]) {
				[nums2[i - m], nums2[j - m]] = [nums2[j - m], nums2[i - m]];
			}
			j += 1;
			i += 1;
		}
		if (gap === 1) gap = 0;
		else gap = Math.ceil(gap / 2);
	}
	for (let i = 0; i < n; i++) {
		nums1[m + i] = nums2[i];
	}
	return nums1;
};
