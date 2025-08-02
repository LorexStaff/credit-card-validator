import { validateLuhn } from '../luhn';

describe('validateLuhn', () => {
  test('should validate correct Visa card', () => {
    expect(validateLuhn('4532015112830366')).toBe(true);
    expect(validateLuhn('4000000000000002')).toBe(true);
  });

  test('should invalidate incorrect Visa card', () => {
    expect(validateLuhn('4532015112830367')).toBe(false);
  });

  test('should validate correct MasterCard', () => {
    expect(validateLuhn('5555555555554444')).toBe(true);
    expect(validateLuhn('5105105105105100')).toBe(true);
  });

  test('should validate correct MIR card (2200–2204)', () => {
    expect(validateLuhn('2200123456789016')).toBe(false);
    expect(validateLuhn('2202222222222228')).toBe(true);
    expect(validateLuhn('2204123456789012')).toBe(false);
  });

  test('should invalidate invalid numbers', () => {
    expect(validateLuhn('1234567890123456')).toBe(false);
    expect(validateLuhn('4444444444444444')).toBe(false);
  });

  test('should return false for too short or too long numbers', () => {
    expect(validateLuhn('1234567890123')).toBe(false);
    expect(validateLuhn('123456789012345678901')).toBe(false);
  });

  test('should handle formatted input (spaces, dashes)', () => {
    expect(validateLuhn('4532 0151 1283 0366')).toBe(true);
    expect(validateLuhn('4532-0151-1283-0366')).toBe(true);
    expect(validateLuhn(' 4532   0151   1283   0366 ')).toBe(true);
    expect(validateLuhn('2202 2222 2222 2228')).toBe(true);
  });

  test('should return false for empty or non-numeric input', () => {
    expect(validateLuhn('')).toBe(false);
    expect(validateLuhn('abc')).toBe(false);
    expect(validateLuhn('   ')).toBe(false);
  });
});