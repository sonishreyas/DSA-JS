# Math Questions

### Set Matrix Zeros

#### Ques: Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

```
Example 1:
Input: nums = [3,2,3]
Output: 3
```

```
Example 2:
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

#### Solution:

- Brute Force

  - Traverse the array with nested lop and compare the frequency of all the elements.
  - TC: O(n^2)
  - SC: O(1)

- Better

  - Use map or dict to have a freq stored and return max.
  - TC: O(n)
  - SC: O(n)

- Moore’s Voting Algorithm (Optimized)
  - Intuition: The question clearly states that the nums array has a majority element. Since it has a majority element we can say definitely the count is more than N/2.
  - Majority element count = N/2 + x;
  - Minority/Other elements = N/2 – x;
  - Where x is the number of times it occurs after reaching the minimum value N/2.
  - Now, we can say that count of minority elements and majority element are equal upto certain point of time in the array. So when we traverse through the array we try to keep track of the count of elements and which element we are tracking. Since the majority element appears more than N/2 times, we can say that at some point in array traversal we find the majority element.
  - Initialize 2 variables:
  - Count – for tracking the count of element
  - Element – for which element we are counting
  - Traverse through nums array.
  - If Count is 0 then initialize the current traversing integer of array as Element
  - If the traversing integer of array and Element are same increase Count by 1
  - If they are different decrease Count by 1
  - The integer present in Element is the result we are expecting

```jsx
const majorityElement = (nums) => {
	let count = 0;
	let element = 0;
	for (let i = 0; i < nums.length; i++) {
		if (count === 0) {
			element = nums[i];
		}
		if (nums[i] === element) {
			count++;
		} else {
			count--;
		}
	}
	return element;
};
```
