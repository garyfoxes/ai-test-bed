/**
 * Text utility functions for string manipulation
 */

/**
 * Converts a string to uppercase
 * @param text - The input string to convert
 * @returns The uppercase version of the input string
 */
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

/**
 * Converts a string to lowercase
 * @param text - The input string to convert
 * @returns The lowercase version of the input string
 */
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

/**
 * Counts the number of letters in a string
 * Letters are defined as alphabetic characters (a-z, A-Z)
 * @param text - The input string to analyze
 * @returns The count of letters in the string
 */
export function countLetters(text: string): number {
  // Remove all non-letter characters and count the remaining
  const letters = text.match(/[a-zA-Z]/g);
  return letters ? letters.length : 0;
}

/**
 * Counts letters in each word of the input text
 * @param text - The input string to analyze
 * @returns An array of objects containing word and letter count
 */
export function countLettersPerWord(text: string): Array<{ word: string; count: number }> {
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  return words.map((word) => ({
    word,
    count: countLetters(word),
  }));
}
