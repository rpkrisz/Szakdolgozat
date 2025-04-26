const mode = (array: number[]) => {
  const frequencyMap: number[] = [];
  let maxFrequency = 0;
  const modes = [];

  for (const num of array) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    if (frequencyMap[num] > maxFrequency) {
      maxFrequency = frequencyMap[num];
    }
  }

  for (const num in frequencyMap) {
    if (frequencyMap[num] === maxFrequency) {
      modes.push(Number(num));
    }
  }

  //If every number only appears once, there is no mode.
  if (modes.length === Object.keys(frequencyMap).length) {
    return "No mode";
  }

  return modes.join(",");
};
export default mode;
