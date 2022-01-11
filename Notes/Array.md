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

* Brute force:
when you get 0 then we change all values except 0 from that col and row to -1 and then just change the -1 to 0 by traversing the matrix. TC: O(N*M)*(N+M) SC: O(1)

* Code below has TC: O(N*M)*(N+M) SC: O(M+N)
```
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
* Optimized 
  - Take two dummy array: one size of columns and other size of row
  - Then we traverse the array and if encounter 0 we mark that index of dummy column and dummy row array to 0, Then we traverse the array again and chek the indexes if at that particular index it shows 0 at any of the dummy array its 0 otherwise the number that is.
  - TC: O(NM) SC: O(N+M) [due to dummy array]

* Optimizing SC to O(1)
  - Take the first row and col to be dummy row and col 
  - we take one col0 variable that would give us the value for the (0,0) index as it comes in both the array.
  - if there is zero in any one of the 1st row or col col0 = 0 

  - TC: O(NM) SC: O(1)
  - Checkout the code :
```
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
* Brute Force: 
    - In c++ we have a next_permutation function which can be used.
    - We calculate all the permutations and then return the index of the required permutation
* Optimized Approach
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
    
