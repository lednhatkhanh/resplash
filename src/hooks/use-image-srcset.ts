export const useImageSrcset = (rawUrl: string, sizes: number[]) => {
  return sizes.map((size) => `${rawUrl}&auto=format&q=60&fit=crop&w=${size} ${size}w`).join(', ');
};
