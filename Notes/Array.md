# Array Questions

### Set Matrix Zeros

#### Ques: Given an m x n matrix. If an element is 0, set its entire row and column to 0. Do it in-place.

Follow up:

    A straight forward solution using O(mn) space is probably a bad idea.
    A simple improvement uses O(m + n) space, but still not the best solution.
    Could you devise a constant space solution?

Example 1:

Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

#### Solution:

- Brute force:
  when you get 0 then we change all values except 0 from that col and row to -1 and then just change the -1 to 0 by traversing the matrix. TC: O(N*M)*(N+M) SC: O(1)

- Code below has TC: O(N*M)*(N+M) SC: O(M+N)

```jsx
class Solution:
  def getcorr(self,i,j,m,n):
      a = []
      for k in range(m):
          a.append([i,k])
      for k in range(n):
          a.append([k,j])
      return a
  def setZeroes(self, matrix: List[List[int]]) -> None:
      """
      Do not return anything, modify matrix in-place instead.
      """
      l = []
      m = len(matrix[0])
      n = len(matrix)
      for i in range(n):
          for j in range(m):
              if matrix[i][j] == 0:
                  l += self.getcorr(i,j,m,n)
      for i in l:
          matrix[i[0]][i[1]] = 0
      return matrix
```

- Optimized

  - Take two dummy array: one size of columns and other size of row
  - Then we traverse the array and if encounter 0 we mark that index of dummy column and dummy row array to 0, Then we traverse the array again and chek the indexes if at that particular index it shows 0 at any of the dummy array its 0 otherwise the number that is.
  - TC: O(NM) SC: O(N+M) [due to dummy array]

- Optimizing SC to O(1)

  - Take the first row and col to be dummy row and col
  - we take one col0 variable that would give us the value for the (0,0) index as it comes in both the array.
  - if there is zero in any one of the 1st row or col col0 = 0

  - TC: O(NM) SC: O(1)
  - Checkout the code :

```jsx
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = (matrix) => {
  let col0 = 1;
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    if (matrix[i][0] === 0) col0 = 0;
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = matrix[0][j] = 0;
      }
    }
  }

  for (let i = rows - 1; i >= 0; i--) {
    for (let j = cols - 1; j >= 1; j--) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
    if (col0 === 0) matrix[i][0] = 0;
  }
};
```

#

### Pascal Triangle

#### Ques: Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

```
Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

```
Example 2:
Input: numRows = 1
Output: [[1]]
```

- ## Brute Force:
- Optimized Approach
  - create a new array of size numrows.
  - traverse from 0 to numrows-1.
  - Make numbers[i] into new array of size i+1.
  - number[i][0] = number[i][i] = 1 as in pascals triangle 1st and last value is 0.
  - traverse from j=1 till i-1 and the value would be summation of previous two values : number[i][j] = number[i - 1][j] + number[i - 1][j - 1];

```jsx
var generate = function (numRows) {
  let number = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    number[i] = new Array(i + 1);
    number[i][0] = number[i][i] = 1;

    for (let j = 1; j < i; j++) {
      number[i][j] = number[i - 1][j] + number[i - 1][j - 1];
    }
  }
  return number;
};
```

#

### Next Permutation

#### Ques: Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such an arrangement is impossible, it must rearrange it to the lowest possible order (i.e., sorted in ascending order).
The replacement must be in place and use only constant extra memory.

```
Example 1:
Input: nums = [1,2,3]
Output: [1,3,2]
```

```
Example 2:
Input: nums = [3,2,1]
Output: [1,2,3]
```

```
Example 3:
Input: nums = [1,1,5]
Output: [1,5,1]
```

#### Solution:

- Brute Force:
  - In c++ we have a next_permutation function which can be used.
  - We calculate all the permutations and then return the index of the required permutation
- Optimized Approach
  - Traverse the array from back and find an element such that a[i]<a[i+1] and that will be index 1.
  - Again do a traversal from the back and find an index whose values is greater that at index 1, a[index 2] > a[index 1]
  - Swap values at index 1 and index 2.
  - Reverse everything from right of index 1.
  ```
  - EX: 1,3,5,4,2 -> 1,4,2,3,5
  - First step index 1 = 1
  - Second step index 2 = 3
  - Third step swap values so array = 1,4,5,3,2
  - Fourth step reverse everything on right of index 1, so array = 1,4,2,3,5 which is the desired result.
  ```

```jsx
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = (nums) => {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i -= 1;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j -= 1;
    swap(nums, i, j);
  }
  reverse(nums, i + 1, nums.length - 1);
};

const swap = (nums, i, j) => {
  const tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
};

const reverse = (nums, i, j) => {
  while (i < j) {
    swap(nums, i, j);
    i += 1;
    j -= 1;
  }
};
```

#

### Kadane’s Algorithm

#### Ques: Ques: Maximum Subarray - Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

```
Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

#### Solution:

- Brute Force:
  - The brute force approch takes O(N^3) cause we run 3 for loops as below:

```jsx
for i in range(n):
  for j in range(i,n):
      sum=0
      for k in range(i,j):
          sum += a[k]
      maxx = max(sum,maxx)
```

    - If we need to optimize this then remove 3rd loop and then redefine sum before 2nd loop.

```jsx
for i in range(n):
  sum=0
  for j in range(i,n):
      sum += a[j]
      maxx = max(sum,maxx)
```

- Optimized Approach
  - Optimal Solution using Kadane algorithm: TC: O(N), SC: O(1)
  - We will assign sum=0 and maxx = nums[0]
  - Traverse the array and add nums[i] to sum and assign maxx to maximum of sum and maxx.
  - If sum < 0 then make sum = 0 because we won't need them.

```jsx
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
```

#

### Sort an array of 0’s 1’s 2’s

#### Ques: Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
You must solve this problem without using the library's sort function.

```
Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

```
Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]
```

#### Solution:

- Approach-1: Sorting ( even if it is not the expected solution here but it can be considered as one of the approach ). Since the array contains only 3 integers, 0, 1, and 2. Simply sorting the array would arrange the elements in increasing order.
  - Time Complexity: O(N\*logN)
  - Space Complexity: O(1)
- Approach-2: Keeping count of values
  - Intuition: Since in this case there are only 3 distinct values in the array so it’s easy to maintain the count of all, Like the count of 0, 1, and 2. This can be followed by overwriting the array based on the frequency(count) of the values.
  - Take 3 variables to maintain the count of 0, 1 and 2.
  - Travel the array once and increment the corresponding counting variables( let’s consider count_0 = a, count_1 = b, count_2 = c )
  - In 2nd traversal of array, we will now over write the first ‘a’ indices / positions in array with ’0’, the next ‘b’ with ‘1’ and the remaining ‘c’ with ‘2’.
  - Time Complexity: O(N) + O(N)
  - Space Complexity: O(1)
- Approach 3 (Optimized): 3-Pointer approach

  - This problem is a variation of the popular Dutch National flag algorithm
  - Intuition: In this approach, we will be using 3 pointers named low, mid, and high. We will be using these 3 pointers to move around the values. The primary goal here is to move 0s to the left and 2s to the right of the array and at the same time all the 1s shall be in the middle region of the array and hence the array will be sorted.
  - Initialize the 3 pointers such that low and mid will point to 0th index and high pointer will point to last index
    ```
    int low = arr[0]
    int mid = arr[0]
    int high = arr[n – 1]
    ```
  - Now there will 3 different operations / steps based on the value of arr[mid] and will be repeated until mid <= high.

  ```
  arr[mid] == 0:
  swap(arr[low], arr[mid])
  low++, mid++

  arr[mid] == 1:
  mid++

  arr[mid] == 2:
  swap(arr[mid], arr[high])
  high–;
  ```

  - The array formed after these steps will be a sorted array.

```jsx
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = (nums) => {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      swap(nums, mid, low);
      low += 1;
      mid += 1;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      swap(nums, mid, high);
      high--;
    }
  }
};

const swap = (nums, i, j) => {
  let tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
};
```
