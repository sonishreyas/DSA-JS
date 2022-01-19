const repeatMissing = (A) => {
  let xor1;
  let set_bit_no;
  let i;
  let x = 0; // missingNumber
  let y = 0; // repeatedNumber
  let n = A.length;

  xor1 = A[0];
  for (let i = 1; i < n; i++) {
    xor1 = xor1 ^ A[i];
  }

  for (let i = 1; i < n + 1; i++) {
    xor1 = xor1 ^ i;
  }

  set_bit_no = xor1 & ~(xor1 - 1);
  for (let i = 0; i < n; i++) {
    if (A[i] & set_bit_no) x = x ^ A[i];
    else y = y ^ A[i];
  }

  for (let i = 1; i < n + 1; i++) {
    if (i & set_bit_no) x = x ^ i;
    else y = y ^ i;
  }
  let x_count = 0;
  for (let i = 0; i < n; i++) {
    if (A[i] === x) {
      x_count += 1;
      break;
    }
  }
  if (x_count === 0) {
    return [y, x];
  }
  return [x, y];
};
