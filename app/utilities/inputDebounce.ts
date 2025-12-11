import { ChangeEventHandler } from 'react';

export const inputDebounce = (func: Function, delay: number = 1500) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
