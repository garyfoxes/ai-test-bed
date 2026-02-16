/**
 * Unit tests for text utility functions
 */

import { toUpperCase, toLowerCase, countLetters, countLettersPerWord } from '../src/textUtils';

describe('toUpperCase', () => {
  it('should convert lowercase text to uppercase', () => {
    expect(toUpperCase('hello world')).toBe('HELLO WORLD');
  });

  it('should keep uppercase text as uppercase', () => {
    expect(toUpperCase('HELLO WORLD')).toBe('HELLO WORLD');
  });

  it('should handle mixed case text', () => {
    expect(toUpperCase('HeLLo WoRLd')).toBe('HELLO WORLD');
  });

  it('should handle empty string', () => {
    expect(toUpperCase('')).toBe('');
  });

  it('should handle text with numbers and symbols', () => {
    expect(toUpperCase('hello123!@#')).toBe('HELLO123!@#');
  });

  it('should handle special characters', () => {
    expect(toUpperCase('hello-world_test')).toBe('HELLO-WORLD_TEST');
  });
});

describe('toLowerCase', () => {
  it('should convert uppercase text to lowercase', () => {
    expect(toLowerCase('HELLO WORLD')).toBe('hello world');
  });

  it('should keep lowercase text as lowercase', () => {
    expect(toLowerCase('hello world')).toBe('hello world');
  });

  it('should handle mixed case text', () => {
    expect(toLowerCase('HeLLo WoRLd')).toBe('hello world');
  });

  it('should handle empty string', () => {
    expect(toLowerCase('')).toBe('');
  });

  it('should handle text with numbers and symbols', () => {
    expect(toLowerCase('HELLO123!@#')).toBe('hello123!@#');
  });

  it('should handle special characters', () => {
    expect(toLowerCase('HELLO-WORLD_TEST')).toBe('hello-world_test');
  });
});

describe('countLetters', () => {
  it('should count letters in a simple word', () => {
    expect(countLetters('hello')).toBe(5);
  });

  it('should count letters in multiple words', () => {
    expect(countLetters('hello world')).toBe(10);
  });

  it('should exclude numbers from letter count', () => {
    expect(countLetters('hello123world')).toBe(10);
  });

  it('should exclude special characters from letter count', () => {
    expect(countLetters('hello!@#world')).toBe(10);
  });

  it('should handle empty string', () => {
    expect(countLetters('')).toBe(0);
  });

  it('should handle string with only numbers', () => {
    expect(countLetters('12345')).toBe(0);
  });

  it('should handle string with only special characters', () => {
    expect(countLetters('!@#$%')).toBe(0);
  });

  it('should handle mixed case letters', () => {
    expect(countLetters('HeLLo WoRLd')).toBe(10);
  });

  it('should handle string with spaces only', () => {
    expect(countLetters('   ')).toBe(0);
  });

  it('should count letters correctly in complex text', () => {
    expect(countLetters('The quick brown fox jumps over 123 lazy dogs!')).toBe(33);
  });
});

describe('countLettersPerWord', () => {
  it('should count letters in single word', () => {
    const result = countLettersPerWord('hello');
    expect(result).toEqual([{ word: 'hello', count: 5 }]);
  });

  it('should count letters in multiple words', () => {
    const result = countLettersPerWord('hello world');
    expect(result).toEqual([
      { word: 'hello', count: 5 },
      { word: 'world', count: 5 },
    ]);
  });

  it('should handle words with numbers', () => {
    const result = countLettersPerWord('hello123 world456');
    expect(result).toEqual([
      { word: 'hello123', count: 5 },
      { word: 'world456', count: 5 },
    ]);
  });

  it('should handle empty string', () => {
    const result = countLettersPerWord('');
    expect(result).toEqual([]);
  });

  it('should handle string with only spaces', () => {
    const result = countLettersPerWord('   ');
    expect(result).toEqual([]);
  });

  it('should handle multiple spaces between words', () => {
    const result = countLettersPerWord('hello    world');
    expect(result).toEqual([
      { word: 'hello', count: 5 },
      { word: 'world', count: 5 },
    ]);
  });

  it('should handle words with special characters', () => {
    const result = countLettersPerWord('hello! world?');
    expect(result).toEqual([
      { word: 'hello!', count: 5 },
      { word: 'world?', count: 5 },
    ]);
  });

  it('should handle mixed case words', () => {
    const result = countLettersPerWord('HeLLo WoRLd');
    expect(result).toEqual([
      { word: 'HeLLo', count: 5 },
      { word: 'WoRLd', count: 5 },
    ]);
  });

  it('should handle complex sentence', () => {
    const result = countLettersPerWord('The quick brown fox');
    expect(result).toEqual([
      { word: 'The', count: 3 },
      { word: 'quick', count: 5 },
      { word: 'brown', count: 5 },
      { word: 'fox', count: 3 },
    ]);
  });
});
