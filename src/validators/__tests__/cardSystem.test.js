import { getCardSystem } from '../cardSystem';

describe('getCardSystem', () => {
  test('should return "mir" only for 2200–2204 prefixes', () => {
    expect(getCardSystem('2200 1234 5678 9012')).toBe('mir');
    expect(getCardSystem('2201 1234 5678 9012')).toBe('mir');
    expect(getCardSystem('2202 1234 5678 9012')).toBe('mir');
    expect(getCardSystem('2203 1234 5678 9012')).toBe('mir');
    expect(getCardSystem('2204 1234 5678 9012')).toBe('mir');

    expect(getCardSystem('2221 1234 5678 9012')).toBe(null);
    expect(getCardSystem('2345 6789 0123 4567')).toBe(null);
    expect(getCardSystem('2888 1234 5678 9012')).toBe(null);
    expect(getCardSystem('2889 1234 5678 9012')).toBe(null);
  });

  test('should return "visa" for Visa cards', () => {
    expect(getCardSystem('4123 4567 8901 2345')).toBe('visa');
    expect(getCardSystem('4000000000000000')).toBe('visa');
    expect(getCardSystem('4532 0151 1283 0366')).toBe('visa');
  });

  test('should return "mastercard" for MasterCard cards', () => {
    expect(getCardSystem('5123 4567 8901 2345')).toBe('mastercard');
    expect(getCardSystem('5500 0000 0000 0004')).toBe('mastercard');
    expect(getCardSystem('5623 4567 8901 2345')).toBe(null);
    expect(getCardSystem('5000 0000 0000 0002')).toBe(null);
  });

  test('should return null for unknown systems', () => {
    expect(getCardSystem('1234 5678 9012 3456')).toBe(null);
    expect(getCardSystem('6123 4567 8901 2345')).toBe(null);
    expect(getCardSystem('')).toBe(null);
    expect(getCardSystem('abc')).toBe(null);
  });

  test('should ignore non-digit characters', () => {
    expect(getCardSystem(' 2200 1234 5678 9012 ')).toBe('mir');
    expect(getCardSystem('4123-4567-8901-2345')).toBe('visa');
    expect(getCardSystem('5123.4567.8901.2345')).toBe('mastercard');
    expect(getCardSystem('2221-1234-5678-9012')).toBe(null);
  });
});