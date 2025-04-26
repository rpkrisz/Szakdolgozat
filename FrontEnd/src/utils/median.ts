const median = (array: number[]) => {
  const sorted = array.sort((a, b) => a - b);
  const middle = Math.floor(array.length / 2);
  if (array.length % 2 === 0) {
    return (sorted[middle] + sorted[middle + 1]) / 2;
  } else {
    return sorted[middle];
  }
};

export default median;
