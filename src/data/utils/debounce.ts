import { EventProp } from "../../Components/types/interfaces";

export const debounce = (callback: (e: EventProp) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: [EventProp]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
