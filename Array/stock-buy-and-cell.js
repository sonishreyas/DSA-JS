/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
  let min_price = Math.max(...prices);
  let max_profit = 0;
  for (let i = 0; i < prices.length; i++) {
    min_price = Math.min(min_price, prices[i]);
    max_profit = Math.max(max_profit, prices[i] - min_price);
  }
  return max_profit;
};
