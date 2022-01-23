# Math Questions

### Pow(X,n)

#### Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

```
Example 1:
Input: x = 2.00000, n = 10
Output: 1024.00000
```

#### Solution:

- Brute Force

  - Looping from 1 to n and keeping a ans(double) variable. Now every time your loop runs, multiply x with ans. At last, we will return the ans.
  - Now if n is negative we must check if n is negative, if it is negative divide 1 by the end.

- Using Binary Exponentiation (Optimized)
  - Initialize ans as 1.0 and store a duplicate copy of n i.e nn using to avoid overflow
  - Check if nn is a negative number, in that case, make it a positive number.
  - Keep on iterating until nn is greater than zero, now if nn is an odd power then multiply x with ans ans reduce nn by 1. Else multiply x with itself and divide nn by two.
  - Now after the entire binary exponentiation is complete and nn becomes zero, check if n is a negative value we know the answer will be 1 by end.

```jsx
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
```

### Majority Element (>N/2 times)

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
