/**
 * Main application entry point
 * Handles DOM interactions and connects UI to text utility functions
 */

import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  countLetters,
  countLettersPerWord,
} from './textUtils.js';

/**
 * Displays the result in the result container
 * @param title - The title of the result
 * @param content - The content to display
 */
export function displayResult(title: string, content: string): void {
  const resultDiv = document.getElementById('result');
  const resultTitle = document.getElementById('resultTitle');
  const resultContent = document.getElementById('resultContent');

  if (resultDiv && resultTitle && resultContent) {
    resultTitle.textContent = title;
    resultContent.textContent = content;
    resultDiv.classList.add('show');
  }
}

/**
 * Gets the text input value from the textarea
 * @returns The current text input value
 */
export function getTextInput(): string {
  const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
  return textInput ? textInput.value : '';
}

/**
 * Handles the uppercase button click
 */
export function handleUppercase(): void {
  const text = getTextInput();
  if (!text.trim()) {
    displayResult('Error', 'Please enter some text first!');
    return;
  }
  const result = toUpperCase(text);
  displayResult('Uppercase Result:', result);
}

/**
 * Handles the lowercase button click
 */
export function handleLowercase(): void {
  const text = getTextInput();
  if (!text.trim()) {
    displayResult('Error', 'Please enter some text first!');
    return;
  }
  const result = toLowerCase(text);
  displayResult('Lowercase Result:', result);
}

/**
 * Handles the title case button click
 */
export function handleTitleCase(): void {
  const text = getTextInput();
  if (!text.trim()) {
    displayResult('Error', 'Please enter some text first!');
    return;
  }
  const result = toTitleCase(text);
  displayResult('Title Case Result:', result);
}

/**
 * Handles the count letters button click
 */
export function handleCountLetters(): void {
  const text = getTextInput();
  if (!text.trim()) {
    displayResult('Error', 'Please enter some text first!');
    return;
  }

  const totalLetters = countLetters(text);
  const wordsWithCounts = countLettersPerWord(text);

  let resultText = `Total letters: ${totalLetters}\n\n`;
  if (wordsWithCounts.length > 0) {
    resultText += 'Letters per word:\n';
    wordsWithCounts.forEach((item) => {
      resultText += `"${item.word}" → ${item.count} letters\n`;
    });
  }

  displayResult('Letter Count:', resultText);
}

/**
 * Initializes the application by setting up event listeners
 */
export function init(): void {
  const uppercaseBtn = document.getElementById('uppercaseBtn');
  const lowercaseBtn = document.getElementById('lowercaseBtn');
  const titleCaseBtn = document.getElementById('titleCaseBtn');
  const countBtn = document.getElementById('countBtn');

  if (uppercaseBtn) {
    uppercaseBtn.addEventListener('click', handleUppercase);
  }

  if (lowercaseBtn) {
    lowercaseBtn.addEventListener('click', handleLowercase);
  }

  if (titleCaseBtn) {
    titleCaseBtn.addEventListener('click', handleTitleCase);
  }

  if (countBtn) {
    countBtn.addEventListener('click', handleCountLetters);
  }
}

// Initialize the application when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
