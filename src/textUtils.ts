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

const SMALL_TITLE_WORDS: ReadonlySet<string> = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'for',
  'in',
  'nor',
  'of',
  'on',
  'or',
  'per',
  'so',
  'the',
  'to',
  'up',
  'via',
  'yet',
]);

/**
 * Converts a string to smart title case (AP-style)
 * @param text - The input string to convert
 * @returns The title-cased version of the input string
 */
export function toTitleCase(text: string): string {
  if (text === '') {
    return '';
  }

  const words = text.match(/[A-Za-z]+(?:'[A-Za-z]+)*/g);
  if (!words || words.length === 0) {
    return text;
  }

  let wordIndex = 0;
  const lastWordIndex = words.length - 1;

  return text
    .split(/(\s+)/)
    .map((token) =>
      token.replace(/[A-Za-z]+(?:'[A-Za-z]+)*/g, (word) => {
        const normalizedWord = word.toLowerCase();
        const isFirstOrLastWord = wordIndex === 0 || wordIndex === lastWordIndex;
        wordIndex += 1;

        if (!isFirstOrLastWord && SMALL_TITLE_WORDS.has(normalizedWord)) {
          return normalizedWord;
        }

        return normalizedWord.charAt(0).toUpperCase() + normalizedWord.slice(1);
      })
    )
    .join('');
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
