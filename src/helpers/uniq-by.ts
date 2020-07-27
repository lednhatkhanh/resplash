export const uniqBy = <T>(arr: T[], by: keyof T) => {
  const keysSet = new Set();
  const uniqueArray: T[] = [];
  arr.forEach((item) => {
    if (!keysSet.has(item[by])) {
      keysSet.add(item[by]);
      uniqueArray.push(item);
    }
  });
  return uniqueArray;
};
