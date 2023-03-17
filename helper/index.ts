export const abbrevNum = (num: number) => {
  let value = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);

  return value;
};
