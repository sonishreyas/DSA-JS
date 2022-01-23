/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = (nums) => {
    let count = 0;
    let element = 0;
    for(let i = 0 ; i < nums.length ; i++)  {
        if(count === 0) {
            element = nums[i];
        } 
        if(nums[i] === element)  {
            count++;
        } else  {
            count--;
        }
    }
    return element;
};