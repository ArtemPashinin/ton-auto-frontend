export const generateYearsList = (): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - 1960 + 1 },
    (_, i) => currentYear - i
  );
};
