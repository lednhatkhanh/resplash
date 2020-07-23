import React from 'react';

export const useCycledIndex = (upperLimit: number) => {
  const [index, setIndex] = React.useState(0);

  const increase = () => {
    setIndex((currentIndex) => (currentIndex + 1) % upperLimit);
  };

  const decrease = () => {
    setIndex((currentIndex) => (currentIndex === 0 ? upperLimit - 1 : currentIndex - 1));
  };

  return { index, increase, decrease, setIndex };
};
