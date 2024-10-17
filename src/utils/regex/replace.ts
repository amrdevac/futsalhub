export const OnlyNumber = (e: string) => {
  return e.replace(/[^0-9 ]/g, "");
};
