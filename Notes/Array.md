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

### Kadane???s Algorithm

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

### Sort an array of 0???s 1???s 2???s

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
  - Intuition: Since in this case there are only 3 distinct values in the array so it???s easy to maintain the count of all, Like the count of 0, 1, and 2. This can be followed by overwriting the array based on the frequency(count) of the values.
  - Take 3 variables to maintain the count of 0, 1 and 2.
  - Travel the array once and increment the corresponding counting variables( let???s consider count_0 = a, count_1 = b, count_2 = c )
  - In 2nd traversal of array, we will now over write the first ???a??? indices / positions in array with ???0???, the next ???b??? with ???1??? and the remaining ???c??? with ???2???.
  - Time Complexity: O(N) + O(N)
  - Space Complexity: O(1)
- Approach 3 (Optimized): 3-Pointer approach

  - This problem is a variation of the popular Dutch National flag algorithm
  - Intuition: In this approach, we will be using 3 pointers named low, mid, and high. We will be using these 3 pointers to move around the values. The primary goal here is to move 0s to the left and 2s to the right of the array and at the same time all the 1s shall be in the middle region of the array and hence the array will be sorted.
  - Initialize the 3 pointers such that low and mid will point to 0th index and high pointer will point to last index
    ```
    int low = arr[0]
    int mid = arr[0]
    int high = arr[n ??? 1]
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
  high???;
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

#

### Best Time to Buy and Sell Stock

#### Ques: You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

```
Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

```
Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

#### Solution:

- Brute Force
  - Starting from 1st index and check the max of each element from i+1 to n-1.
  - take the diff of the max and the element at ith position and continue till i<n;
  - TC: O(n^2)
  - SC: O(1)

```jsx
const maxProfit = (prices) => {
  let n = prices.length;
  let maxx = 0;
  let m = 0;
  for (let i = 0; i < n - 1; i++) {
    m = getMax(prices, i + 1, n - 1);
    if (m >= prices[i]) {
      maxx = Math.max(maxx, m - prices[i]);
    }
  }
  return maxx;
};

const getMax = (prices, i, j) => {
  let m = prices[i];
  for (let k = i + 1; k <= j; k++) {
    m = Math.max(m, prices[k]);
  }
  return m;
};
```

- Optimized Approach
  - Intuition: We will linearly travel the array. We can maintain a minimum from the starting of the array and compare it with every element of the array, if it is greater than the minimum then take the difference and maintain it in max, otherwise update the minimum.
  - Create a variable maxPro and mark it as 0.
  - Create a variable minPrice and mark it as max_value.
  - Run a for loop from 0 to n.
  - Update the minPrice at if it greater than current element of the array
  - Take the difference of the minPrice with the current element of the array and compare and maintain it in maxPro.
  - Return the maxPro.
  - Time complexity: O(n)
  - Space Complexity: O(1)

```jsx
const maxProfit = (prices) => {
  let min_price = Math.max(...prices);
  let max_profit = 0;
  for (let i = 0; i < prices.length; i++) {
    min_price = Math.min(min_price, prices[i]);
    max_profit = Math.max(max_profit, prices[i] - min_price);
  }
  return max_profit;
};
```

#

### Rotate Matrix

#### Ques: You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

```
Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

```
Example 2:
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

#### Solution:

- Brute force
  - Take another dummy matrix of n\*n, and then take the first row of the matrix and put it in the last column of the dummy matrix, take the second row of the matrix, and put it in the second last column of the matrix and so.
  - Time Complexity: O(N\*N) to linearly iterate and put it into some other matrix.
  - Space Complexity: O(N\*N) to copy it into some other matrix.

```jsx
#include<bits/stdc++.h>

using namespace std;
vector < vector < int >> rotate(vector < vector < int >> & matrix) {
  int n = matrix.size();
  vector < vector < int >> rotated(n, vector < int > (n, 0));
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      rotated[j][n - i - 1] = matrix[i][j];
    }
  }
  return rotated;
}

int main() {
  vector < vector < int >> arr;
  arr =  {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
  vector < vector < int >> rotated = rotate(arr);
  cout << "Rotated Image" << endl;
  for (int i = 0; i < rotated.size(); i++) {
    for (int j = 0; j < rotated[0].size(); j++) {
      cout << rotated[i][j] << " ";
    }
    cout << "\n";
  }

}
```

- Optimized Approach
  - Intuition: By observation, we see that the first column of the original matrix is the reverse of the first row of the rotated matrix, so that???s why we transpose the matrix and then reverse each row, and since we are making changes in the matrix itself space complexity gets reduced to O(1).
  - Step1: Transpose of the matrix. (transposing means changing columns to rows and rows to columns)
  - Step2: Reverse each row of the matrix.

```jsx
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
```

#

### Merge Overlapping Subintervals

#### Ques: Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

```
Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
```

```
Example 2:
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

#### Solution:

- Brute Force
  - First check whether the array is sorted or not.If not sort the array.
  - Now linearly iterate over the array and then check for all of its next intervals whether they are overlapping with the interval at the current index.
  - Take a new data structure and insert the overlapped interval.
  - If while iterating if the interval lies in the interval present in the data structure simply continue and move to the next interval.
  - Time Complexity: O(NlogN)+O(N*N). O(NlogN) for sorting the array, and O(N*N) because we are checking to the right for each index which is a nested loop.
  - Space Complexity: O(N), as we are using a separate data structure.

```jsx
#include<bits/stdc++.h>

using namespace std;
vector < pair < int, int >> merge(vector < pair < int, int >> & arr) {

  int n = arr.size();
  sort(arr.begin(), arr.end());
  vector < pair < int, int >> ans;

  for (int i = 0; i < n; i++) {
    int start = arr[i].first, end = arr[i].second;

    //since the intervals already lies
    //in the data structure present we continue
    if (!ans.empty()) {
      if (start <= ans.back().second) {
        continue;
      }
    }

    for (int j = i + 1; j < n; j++) {
      if (arr[j].first <= end) {
        end = arr[j].second;
      }
    }

    ans.push_back({
      start,
      end
    });
  }

  return ans;
}

int main() {
  vector < pair < int, int >> arr;
  arr = {{1,3},{2,4},{2,6},{8,9},{8,10},{9,11},{15,18},{16,17}};
  vector < pair < int, int >> ans = merge(arr);

  cout << "Merged Overlapping Intervals are " << endl;

  for (auto it: ans) {
    cout << it.first << " " << it.second << "\n";
  }
}
```

- Optimized Approach

  - sort the array based on the first element of the 2d array. = interval.sort((a,b)=>a[0]-b[0])
  - Traverse the array and check if current right is greater than next left. If yes then assign interval[i+1][1] = Math.max(intervals[i + 1][1], intervals[i][1]).
  - intervals[i + 1][0] = intervals[i][0]; because we have sorted the array.
  - now since we have merged interval[0] with interval[1] so we can slice the first element.
  - Time Complexity: O(NlogN) + O(N). O(NlogN) for sorting and O(N) for traversing through the array.
  - Space Complexity: O(1) to return the answer of the merged intervals.
  - JS code

```jsx
const merge = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0]);
  console.log(intervals);
  let i = 0;
  while (i < intervals.length - 1) {
    if (intervals[i][1] >= intervals[i + 1][0]) {
      intervals[i + 1][1] = Math.max(intervals[i + 1][1], intervals[i][1]);
      intervals[i + 1][0] = intervals[i][0];
      intervals.splice(i, 1);
    } else {
      i += 1;
    }
  }
  return intervals;
};
```

#

### Merge two sorted Arrays without extra space

#### Ques: You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.
The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

```
Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
```

```
Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
```

#### Solution:

- Brute Force

  - Intuition: We can use a new array of size n+m and put all elements of arr1 and arr2 in it, and sort it. After sorting it, but all the elements in arr1 and arr2.
  - Make an arr3 of size n+m.
  - Put elements arr1 and arr2 in arr3.
  - Sort the arr3.
  - Now first fill the arr1 and then fill remaining elements in arr2.
  - Time complexity: O(n\*log(n))+O(n)+O(n)
  - Space Complexity: O(n)

- Without using space

  - Intuition: We can think of Iterating in arr1 and whenever we encounter an element that is greater than the first element of arr2, just swap it. Now rearrange the arr2 in a sorted manner, after completion of the loop we will get elements of both the arrays in non-decreasing order.
  - Use a for loop in arr1.
  - Whenever we get any element in arr1 which is greater than the first element of arr2,swap it.
  - Rearrange arr2.
  - Repeat the process.
  - Time complexity: O(n\*m)
  - Space Complexity: O(1)

- Gap method-
  - Initially take the gap as (m+n)/2;
  - Take as a pointer1 = 0 and pointer2 = gap.
  - Run a oop from pointer1 & pointer2 to m+n and whenever arr[pointer2]<arr[pointer1], just swap those.
  - After completion of the loop reduce the gap as gap=gap/2.
  - Repeat the process until gap>0.
  - Time complexity: O(logn)
  - Space Complexity: O(1)

```jsx
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
```

#

### Find the duplicate in an array of N+1 integers.

#### Ques: You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
There is only one repeated number in nums, return this repeated number.
You must solve the problem without modifying the array nums and uses only constant extra space.

```
Example 1:
Input: nums = [1,3,4,2,2]
Output: 2
```

```
Example 2:
Input: nums = [3,1,3,4,2]
Output: 3
```

#### Solution:

- Using sorting

  - Sort the array. After that, if there is any duplicate number they will be adjacent.So we simply have to check if arr[i]==arr[i+1] and if it is true,arr[i] is the duplicate number.
  - Time Complexity:O(Nlogn + N) : NlogN for sorting the array and O(N) for traversing through the array and checking if adjacent elements are equal or not. But this will distort the array.
  - Space Complexity:O(1)

- Using frequency array

  - Take a frequency array of size N+1 and initialize it to 0. Now traverse through the array and if the frequency of the element is 0 increase it by 1, else if the frequency is not 0 then that element is the required answer.
  - Time Complexity: O(N), as we are traversing through the array only once.
  - Space Complexity: O(N), as we are using extra space for frequency array.

- Linked List cycle method(Optimized Approach)
  - Intution
    - Since there is a duplicate number, we can always say that cycle will be formed.
    - We form a cycle, we start with index 0 and next vertice will be nums[0] and then the next vertice will be nums[nums[0]].
  - Algo
    - The slow pointer moves by one step and the fast pointer moves by 2 steps and there exists a cycle so the first collision is bound to happen.
    - Let???s assume the distance between the first element and the first collision is a. So slow pointer has traveled a distance while fast(since moving 2 steps at a time) has traveled 2a distance. For slow and a fast pointer to collide 2a-a=a should be multiple of the length of cycle, Now we place a fast pointer to start. Assume the distance between the start and duplicate to be x. So now the distance between slow and duplicate shows also be x, as seen from the diagram, and so now fast and slow pointer both should move by one step.
  - Time complexity: O(N). Since we traversed through the array only once.
  - Space complexity: O(1).

```jsx
const findDuplicate = (nums) => {
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow != fast);

  fast = nums[0];
  while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
};
```

#

### Repeat and Missing Number Array.

#### Ques: You are given a read only array of n integers from 1 to n.

Each integer appears exactly once except A which appears twice and B which is missing.
Return A and B.
Note: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
Note that in your output A should precede B.

```
Example:
Input:[3 1 2 5 3]
Output:[3, 4]
A = 3, B = 4
```

#### Solution:

- Using Count Sort
  - Since the numbers are from 1 to N in the array arr[]
  - Take a substitute array of size N+1 and initalize it with 0.
  - Traverse the given array and increase the value of substitute[arr[i]] by one .
  - Then again traverse the substitute array starting from index 1 to N.
  - If you find any index value greater than 1 that is repeating element A.
  - If you find any index value = 0 then that is the missing element B.
  - TC: O(N)
  - SC: O(N)

```jsx
function(A){
  let d = {};
  let a=-1;
  let b=-1;
  for(let i=1 ; i< A.length+1 ; i++)
      d[i] = 0;
  for(let i = 0 ; i<A.length ; i++)   {
      d[A[i]] += 1
  }
  for(let i=1 ; i< A.length+1 ; i++) {
      if(d[i] === 2)  {
          a = i;
      }
      if(d[i] === 0)   {
          b = i;
      }
      if(a!=-1 && b!=-1)  {
          break;
      }
  }
  return [a,b]
}
```

- Maths (Optimized)
  - The idea is to convert the given problem into mathematical equations. Since we have two variables where one is missing and one is repeating, can we form two linear equations and then solve for the values of these two variables using the equations?
  - Assume the missing number to be X and the repeating one to be Y.
  - Now since the numbers are from 1 to N in the array arr[]. Let???s calculate sum of all integers from 1 to N and sum of squares of all integers from 1 to N.

```
Sum of all elements from 1 to N:  S = N*(N+1)/2 ---- equation 1
```

```
Sum of squares of all elements from 1 to N:  P = N(N+1)(2N+1)/6. ----- equation 2
```

- Similarly, find the sum of all elements of the array and sum of squares of all elements of the array respectively.

```
s1 = Sum of all elements of the array. ?????? equation 3
P1 = Sum of squares of all elements of the array. ????????? equation 4
```

- Now, if we subtract the sum of all elements of array from sum of all elements from 1 to N, that should give us the value for (X ??? Y).

```
(X-Y) = s ??? s1 = s???

Similarily,

X^2 ??? Y^2 = P ??? P1 = P???

or, (X + Y)(X ??? Y) = P???

or, (X + Y)*s??? = P???

or, X + Y = P???/s???
```

- we have the two equations we needed:

```
(X ??? Y) = s???
(X + Y) = P???/s???
```

- We can use the two equations to solve and find values for X and Y respectively.
- Note: here s and P can be large so take long long int data type.
- TC: O(N)
- SC: O(1)

```jsx
function(A){
    let n = A.length;
    let x = 0; //missingNumber
    let y = 0; //repeatedNumber
    let S = n*(n+1)/2;
    let P = n*(n+1)*(2*n + 1)/6;
    for(let i = 0 ; i< n; i++)  {
        S -= A[i];
        P -= Math.pow(A[i],2);
    }
    x= parseInt((S + parseInt(P/S))/2);
    y = x - S;
    return [y,x]
  }
};
```

- Xor (Best Approach)
  - Let x and y be the desired output elements.
  - Calculate the XOR of all the array elements.
  - xor1 = arr[0]^arr[1]^arr[2]???..arr[n-1]
  - XOR the result with all numbers from 1 to n
  - xor1 = xor1^1^2^???..^n
  - xor1 will have the result as (x^y), as others would get canceled. Since we are doing XOR, we know xor of 1 and 0, is only 1, so all the set bits in xor1, means that the index bit is only set at x or y.
  - So we can take any set bit, in code we have taken the rightmost set bit, and iterate over, and divide the numbers into two hypothetical buckets.
  - If we check for numbers with that particular index bit set, we will get a set of numbers that belongs to the first bucket, also we will get another set of numbers belonging to the second bucket.
  - The first bucket will be containing either x or y, similarly, the second bucket will also be containing either of x and y.
  - XOR of all elements in the first bucket will give X or Y, and XOR of all elements of the second bucket will give either X or Y, since there will be double instances of every number in each bucket except the X or Y.
  - We just need to iterate again to check which one is X, and which one is y. Can be simply checked by linear iterations. For better understanding, you can check the video explanation.
  - TC: O(N)
  - SC: O(1)

```jsx
function(A) {
  let xor1;
  let set_bit_no;
  let i;
  let x = 0; // missingNumber
  let y = 0; // repeatedNumber
  let n = A.length;

  xor1 = A[0];
  for(let i = 1 ; i < n ; i++)    {
      xor1 = xor1^A[i]
  }

  for(let i = 1 ; i<n+1; i++) {
      xor1 = xor1 ^ i
  }

  set_bit_no = xor1 & ~(xor1 - 1);
  for(let i=0; i< n; i++) {
      if(A[i] & set_bit_no)
          x = x^A[i];
      else
          y = y^A[i];
  }

  for(let i =1 ; i<n+1; i++)  {
      if(i&set_bit_no)
          x = x^i
      else
          y = y^i
  }
  let x_count = 0;
  for(let i=0 ; i< n ; i++)   {
      if(A[i] === x)  {
          x_count+=1;
          break;
      }
  }
  if(x_count === 0)  {
      return [y,x];
  }
  return [x,y];
}
```

#

### Count Inversion.

#### Ques: For a given integer array/list 'ARR' of size 'N', find the total number of 'Inversions' that may exist.

An inversion is defined for a pair of integers in the array/list when the following two conditions are met.
A pair ('ARR[i]', 'ARR[j]') is said to be an inversion when:

1. 'ARR[i] > 'ARR[j]'
2. 'i' < 'j'
   Where 'i' and 'j' denote the indices ranging from [0, 'N').

```
Sample Input 1 :
3
3 2 1
Sample Output 1 :
3
Explanation Of Sample Output 1:
We have a total of 3 pairs which satisfy the condition of inversion. (3, 2), (2, 1) and (3, 1).
```

```
Sample Input 2 :
5
2 5 1 3 4
Sample Output 2 :
4
```

#### Solution:

- Brute Force

  - Run a nested loop and con=mpare all the elements that satisfy the condition given and it will give the count.
  - TC: O(n^2)
  - SC: O(1)

- Optimized Approach (Merge Sort)
  - Merge Sort is used for optimize approach.
  - Only change is when we merge we find left[i] > right[j] then we can sat the right side element is less then all the elements on the left. so we add len(left) - 1 in the count inversion.
  - TC: O(nlogn) ; Merge Sort algorithm
  - SC: O(n)

```jsx
def Merge(l,r, A):
  countInversion = 0
  ln = len(l)
  rn = len(r)
  i = 0
  j = 0
  k = 0
  while i<ln and j<rn:
      if(l[i] <= r[j]):
          A[k] = l[i]
          k += 1
          i += 1
      elif(l[i] > r[j]):
          countInversion = countInversion + ln - i
          A[k] = r[j]
          k += 1
          j += 1
  while(i < ln):
      A[k] = l[i]
      k += 1
      i += 1
  while(j < rn):
      A[k] = r[j]
      k += 1
      j += 1
  return countInversion

def mergeSort(A):
  countInversion = 0
  n = len(A)
  if n < 2:
    return countInversion
  mid = int(n/2)
  left = []
  right = []
  for i in range(mid):
      left.append(A[i])
  for j in range(mid,n):
      right.append(A[j])
  countInversion+=mergeSort(left)
  countInversion+=mergeSort(right)
  countInversion+=Merge(left,right,A)
  return countInversion

def getInversions(A, n):
	return mergeSort(A)

def takeInput() :
  n = int(input())
  arr = list(map(int, input().strip().split(" ")))
  return arr, n

A, n = takeInput()
print(getInversions(A, n))
```

#

### Search a 2D Matrix.

#### Ques: Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.

```
Example 1:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

```
Example 2:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

#### Solution:

- Brute Force

  - Traverse through all the elements of the array and check for target value.
  - TC: O(m\*n)
  - SC: O(1)

- [Efficient] ??? Binary search

  - As it is clearly mentioned that the given matrix will be row-wise and column-wise sorted, we can see that the elements in the matrix will be in a monotonically increasing order. So we can apply binary search to search the matrix. Consider the 2D matrix as a 1D matrix having indices from 0 to (m*n)-1 and apply binary search. Below the available image is the visual representation of the indices of 3*4 matrix.
    i) Initially have a low index as the first index of the considered 1D matrix(i.e: 0) and high index as the last index of the considered 1D matrix(i.e: (m\*n)-1).

  ```
  int low = 0;
  int  high = (m*n)-1;
  ```

  ii) Now apply binary search. Run a while loop with the condition low<=high. Get the middle index as (low+high)/2.We can get the element at middle index using matrix[middle/m][middle%m].

  ```
  while(low<=high)
      int middle = (low+high)/2;
  ```

  iii) If the element present at the middle index is greater than the target, then it is obvious that the target element will not exist beyond the middle index. So shrink the search space by updating the high index to middle-1.

  ```
  if(matrix[middle/m][middle%m]<target)
      high = middle-1;
  ```

  iv) If the middle index element is lesser than the target, shrink the search space by updating the low index to middle+1.

  ```
  if(matrix[middle/m][middle%m]>target)
      low = middle+1;
  ```

  v) If the middle index element is equal to the target integer, return true.

  ```
  if(matrix[middle/m][middle%m]==target)
      return true;
  ```

  vi) Once the loop terminates we can directly return false as we did not find the target element.

```jsx
class Solution {
public:
  bool searchMatrix(vector<vector<int>>& matrix, int target) {
      int lo = 0;
      if(!matrix.size()) return false;
      int hi = (matrix.size() * matrix[0].size()) - 1;

      while(lo <= hi) {
          int mid = (lo + (hi - lo) / 2);
          if(matrix[mid/matrix[0].size()][mid % matrix[0].size()] == target) {
              return true;
          }
          if(matrix[mid/matrix[0].size()][mid % matrix[0].size()] < target) {
              lo = mid + 1;
          }
          else {
              hi = mid - 1;
          }
      }
      return false;
  }
};
```

- Optimized:
  - Traverse the array and compare all the 0th index of each row and check if target >= mat[i][0] and target < mat[i+1][0]. If yes then index = i.
  - Now traverse that row and check for target if present return true else false.
  - TC: O(n) + O(m)
  - SP: O(1)

```jsx
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
```
