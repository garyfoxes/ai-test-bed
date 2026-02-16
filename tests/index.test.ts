/**
 * Unit tests for index.ts DOM interaction functions
 */

import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

// Mock the textUtils module
jest.mock('../src/textUtils', () => ({
  toUpperCase: (text: string): string => text.toUpperCase(),
  toLowerCase: (text: string): string => text.toLowerCase(),
  countLetters: (text: string): number => text.replace(/[^a-zA-Z]/g, '').length,
  countLettersPerWord: (text: string): { word: string; count: number }[] => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    return words.map((word) => ({
      word,
      count: word.replace(/[^a-zA-Z]/g, '').length,
    }));
  },
}));

describe('index.ts DOM interactions', () => {
  beforeEach(() => {
    // Clear any existing modules
    jest.resetModules();

    // Set up a minimal DOM structure for testing
    document.body.innerHTML = `
      <textarea id="textInput"></textarea>
      <button id="uppercaseBtn">Uppercase</button>
      <button id="lowercaseBtn">Lowercase</button>
      <button id="countBtn">Count Letters</button>
      <div id="result" class="">
        <h2 id="resultTitle"></h2>
        <p id="resultContent"></p>
      </div>
    `;

    // Set readyState to 'loading' to prevent immediate initialization
    Object.defineProperty(document, 'readyState', {
      writable: true,
      value: 'loading',
    });

    // Import the module - this will add the DOMContentLoaded event listener
    require('../src/index');

    // Now trigger DOMContentLoaded to initialize
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
  });

  describe('displayResult', () => {
    it('should display result with title and content', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const resultDiv = document.getElementById('result');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'hello world';
      fireEvent.click(uppercaseBtn!);

      expect(resultTitle).toHaveTextContent('Uppercase Result:');
      expect(resultContent).toHaveTextContent('HELLO WORLD');
      expect(resultDiv).toHaveClass('show');
    });

    it('should update existing result when called multiple times', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const lowercaseBtn = document.getElementById('lowercaseBtn');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'HELLO';
      fireEvent.click(uppercaseBtn!);
      expect(resultTitle).toHaveTextContent('Uppercase Result:');
      expect(resultContent).toHaveTextContent('HELLO');

      textInput.value = 'WORLD';
      fireEvent.click(lowercaseBtn!);
      expect(resultTitle).toHaveTextContent('Lowercase Result:');
      expect(resultContent).toHaveTextContent('world');
    });
  });

  describe('handleUppercase', () => {
    it('should convert text to uppercase', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'hello world';
      fireEvent.click(uppercaseBtn!);

      expect(resultContent).toHaveTextContent('HELLO WORLD');
    });

    it('should show error when input is empty', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = '';
      fireEvent.click(uppercaseBtn!);

      expect(resultTitle).toHaveTextContent('Error');
      expect(resultContent).toHaveTextContent('Please enter some text first!');
    });

    it('should show error when input is only whitespace', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = '   ';
      fireEvent.click(uppercaseBtn!);

      expect(resultTitle).toHaveTextContent('Error');
      expect(resultContent).toHaveTextContent('Please enter some text first!');
    });

    it('should handle text with special characters', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'hello-world_123!';
      fireEvent.click(uppercaseBtn!);

      expect(resultContent).toHaveTextContent('HELLO-WORLD_123!');
    });
  });

  describe('handleLowercase', () => {
    it('should convert text to lowercase', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const lowercaseBtn = document.getElementById('lowercaseBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'HELLO WORLD';
      fireEvent.click(lowercaseBtn!);

      expect(resultContent).toHaveTextContent('hello world');
    });

    it('should show error when input is empty', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const lowercaseBtn = document.getElementById('lowercaseBtn');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = '';
      fireEvent.click(lowercaseBtn!);

      expect(resultTitle).toHaveTextContent('Error');
      expect(resultContent).toHaveTextContent('Please enter some text first!');
    });

    it('should show error when input is only whitespace', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const lowercaseBtn = document.getElementById('lowercaseBtn');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = '   ';
      fireEvent.click(lowercaseBtn!);

      expect(resultTitle).toHaveTextContent('Error');
      expect(resultContent).toHaveTextContent('Please enter some text first!');
    });

    it('should handle mixed case text', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const lowercaseBtn = document.getElementById('lowercaseBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'HeLLo WoRLd';
      fireEvent.click(lowercaseBtn!);

      expect(resultContent).toHaveTextContent('hello world');
    });
  });

  describe('handleCountLetters', () => {
    it('should count letters and display results', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const countBtn = document.getElementById('countBtn');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'hello world';
      fireEvent.click(countBtn!);

      expect(resultTitle).toHaveTextContent('Letter Count:');
      expect(resultContent?.textContent).toContain('Total letters: 10');
      expect(resultContent?.textContent).toContain('Letters per word:');
      expect(resultContent?.textContent).toContain('"hello" → 5 letters');
      expect(resultContent?.textContent).toContain('"world" → 5 letters');
    });

    it('should show error when input is empty', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const countBtn = document.getElementById('countBtn');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = '';
      fireEvent.click(countBtn!);

      expect(resultTitle).toHaveTextContent('Error');
      expect(resultContent).toHaveTextContent('Please enter some text first!');
    });

    it('should show error when input is only whitespace', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const countBtn = document.getElementById('countBtn');
      const resultTitle = document.getElementById('resultTitle');
      const resultContent = document.getElementById('resultContent');

      textInput.value = '   ';
      fireEvent.click(countBtn!);

      expect(resultTitle).toHaveTextContent('Error');
      expect(resultContent).toHaveTextContent('Please enter some text first!');
    });

    it('should handle text with numbers and special characters', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const countBtn = document.getElementById('countBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'hello123 world456!';
      fireEvent.click(countBtn!);

      expect(resultContent?.textContent).toContain('Total letters: 10');
      expect(resultContent?.textContent).toContain('"hello123" → 5 letters');
      expect(resultContent?.textContent).toContain('"world456!" → 5 letters');
    });

    it('should handle single word', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const countBtn = document.getElementById('countBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'hello';
      fireEvent.click(countBtn!);

      expect(resultContent?.textContent).toContain('Total letters: 5');
      expect(resultContent?.textContent).toContain('"hello" → 5 letters');
    });

    it('should handle text with multiple spaces', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const countBtn = document.getElementById('countBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'hello    world';
      fireEvent.click(countBtn!);

      expect(resultContent?.textContent).toContain('Total letters: 10');
      expect(resultContent?.textContent).toContain('"hello" → 5 letters');
      expect(resultContent?.textContent).toContain('"world" → 5 letters');
    });
  });

  describe('init', () => {
    it('should set up event listeners on buttons', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'test';
      fireEvent.click(uppercaseBtn!);

      expect(resultContent).toHaveTextContent('TEST');
    });

    it('should handle missing DOM elements gracefully', () => {
      // Clear modules and reset
      jest.resetModules();

      // Remove all buttons
      document.body.innerHTML = `
        <textarea id="textInput"></textarea>
        <div id="result" class="">
          <h2 id="resultTitle"></h2>
          <p id="resultContent"></p>
        </div>
      `;

      // Re-initialize - should not throw an error
      expect(() => {
        require('../src/index');
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });
  });

  describe('getTextInput', () => {
    it('should return text from textarea', () => {
      const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const resultContent = document.getElementById('resultContent');

      textInput.value = 'sample text';
      fireEvent.click(uppercaseBtn!);

      expect(resultContent).toHaveTextContent('SAMPLE TEXT');
    });

    it('should return empty string when textarea is missing', () => {
      // Clear modules and reset
      jest.resetModules();

      // Set up DOM without textarea
      document.body.innerHTML = `
        <button id="uppercaseBtn">Uppercase</button>
        <button id="lowercaseBtn">Lowercase</button>
        <button id="countBtn">Count Letters</button>
        <div id="result" class="">
          <h2 id="resultTitle"></h2>
          <p id="resultContent"></p>
        </div>
      `;

      // Set readyState to 'loading' to prevent immediate initialization
      Object.defineProperty(document, 'readyState', {
        writable: true,
        value: 'loading',
      });

      // Import and initialize
      require('../src/index');
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const uppercaseBtn = document.getElementById('uppercaseBtn');
      const resultTitle = document.getElementById('resultTitle');

      fireEvent.click(uppercaseBtn!);

      // Should show error because getTextInput returns empty string
      expect(resultTitle).toHaveTextContent('Error');
    });
  });
});
