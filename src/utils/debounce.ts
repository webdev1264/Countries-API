import React from "react";

export const debounce = (
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: [React.ChangeEvent<HTMLInputElement>]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
