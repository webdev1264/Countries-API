export const firstCharCap = (str) => {
  return str.replace(/\b./g, (c) => c.toUpperCase());
};
