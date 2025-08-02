export const getCardSystem = (number) => {
  const digits = number.replace(/\D/g, "");

  if (/^2/.test(digits) && /^(220[0-4])/.test(digits)) {
    return "mir";
  }
  if (/^4/.test(digits)) {
    return "visa";
  }
  if (/^5[1-5]/.test(digits)) {
    return "mastercard";
  }
  return null;
};
