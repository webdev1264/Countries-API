export const firstCharCap = (str: string) => {
  return str.replace(/\b./g, (c) => c.toUpperCase());
};
