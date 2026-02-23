/**
 * @jest-environment jsdom
 */

/**
 * Unit tests for the main application entry point (DOM logic)
 */

// We need to set up the DOM *before* importing the module so the
// module-level init() call finds the elements it expects.

function setupDOM(): void {
  document.body.innerHTML = `
    <textarea id="textInput"></textarea>
    <button id="uppercaseBtn">Uppercase</button>
    <button id="lowercaseBtn">Lowercase</button>
    <button id="titleCaseBtn">Title Case</button>
    <button id="countBtn">Count Letters</button>
    <div id="result">
      <h2 id="resultTitle"></h2>
      <p id="resultContent"></p>
    </div>
  `;
}

// Helper to dynamically import the module in isolation so each test
// suite gets a fresh init() call against the current DOM.
async function loadModule(): Promise<typeof import('../src/index')> {
  const mod = await import('../src/index');
  return mod;
}

describe('index.ts — DOM functions', () => {
  beforeEach(() => {
    setupDOM();
    jest.resetModules();
  });

  // ── displayResult ──────────────────────────────────────────────────

  describe('displayResult', () => {
    it('should set title and content in the result container', async () => {
      const { displayResult } = await loadModule();

      displayResult('Test Title', 'Test Content');

      expect(document.getElementById('resultTitle')!.textContent).toBe('Test Title');
      expect(document.getElementById('resultContent')!.textContent).toBe('Test Content');
      expect(document.getElementById('result')!.classList.contains('show')).toBe(true);
    });

    it('should not throw when result elements are missing', async () => {
      document.body.innerHTML = ''; // remove all elements
      const { displayResult } = await loadModule();

      expect(() => displayResult('Title', 'Content')).not.toThrow();
    });
  });

  // ── getTextInput ───────────────────────────────────────────────────

  describe('getTextInput', () => {
    it('should return the value of the textarea', async () => {
      const { getTextInput } = await loadModule();
      const textarea = document.getElementById('textInput') as HTMLTextAreaElement;
      textarea.value = 'hello world';

      expect(getTextInput()).toBe('hello world');
    });

    it('should return empty string when textarea is missing', async () => {
      document.body.innerHTML = '';
      const { getTextInput } = await loadModule();

      expect(getTextInput()).toBe('');
    });
  });

  // ── handleUppercase ────────────────────────────────────────────────

  describe('handleUppercase', () => {
    it('should display uppercase text', async () => {
      const { handleUppercase } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value = 'hello';

      handleUppercase();

      expect(document.getElementById('resultTitle')!.textContent).toBe('Uppercase Result:');
      expect(document.getElementById('resultContent')!.textContent).toBe('HELLO');
    });

    it('should show error when input is empty', async () => {
      const { handleUppercase } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value = '';

      handleUppercase();

      expect(document.getElementById('resultTitle')!.textContent).toBe('Error');
      expect(document.getElementById('resultContent')!.textContent).toBe(
        'Please enter some text first!'
      );
    });

    it('should show error when input is only whitespace', async () => {
      const { handleUppercase } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value = '   ';

      handleUppercase();

      expect(document.getElementById('resultTitle')!.textContent).toBe('Error');
      expect(document.getElementById('resultContent')!.textContent).toBe(
        'Please enter some text first!'
      );
    });
  });

  // ── handleLowercase ────────────────────────────────────────────────

  describe('handleLowercase', () => {
    it('should display lowercase text', async () => {
      const { handleLowercase } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value = 'HELLO';

      handleLowercase();

      expect(document.getElementById('resultTitle')!.textContent).toBe('Lowercase Result:');
      expect(document.getElementById('resultContent')!.textContent).toBe('hello');
    });

    it('should show error when input is empty', async () => {
      const { handleLowercase } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value = '';

      handleLowercase();

      expect(document.getElementById('resultTitle')!.textContent).toBe('Error');
      expect(document.getElementById('resultContent')!.textContent).toBe(
        'Please enter some text first!'
      );
    });
  });

  // ── handleTitleCase ────────────────────────────────────────────────

  describe('handleTitleCase', () => {
    it('should display smart title-case text', async () => {
      const { handleTitleCase } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value =
        'war and peace in the time of cholera';

      handleTitleCase();

      expect(document.getElementById('resultTitle')!.textContent).toBe('Title Case Result:');
      expect(document.getElementById('resultContent')!.textContent).toBe(
        'War and Peace in the Time of Cholera'
      );
    });

    it('should show error when input is empty', async () => {
      const { handleTitleCase } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value = '';

      handleTitleCase();

      expect(document.getElementById('resultTitle')!.textContent).toBe('Error');
      expect(document.getElementById('resultContent')!.textContent).toBe(
        'Please enter some text first!'
      );
    });
  });

  // ── handleCountLetters ─────────────────────────────────────────────

  describe('handleCountLetters', () => {
    it('should display total letter count and per-word breakdown', async () => {
      const { handleCountLetters } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value = 'Hi there';

      handleCountLetters();

      const content = document.getElementById('resultContent')!.textContent;
      expect(document.getElementById('resultTitle')!.textContent).toBe('Letter Count:');
      expect(content).toContain('Total letters: 7');
      expect(content).toContain('"Hi"');
      expect(content).toContain('"there"');
    });

    it('should show error when input is empty', async () => {
      const { handleCountLetters } = await loadModule();
      (document.getElementById('textInput') as HTMLTextAreaElement).value = '';

      handleCountLetters();

      expect(document.getElementById('resultTitle')!.textContent).toBe('Error');
      expect(document.getElementById('resultContent')!.textContent).toBe(
        'Please enter some text first!'
      );
    });
  });

  // ── init ───────────────────────────────────────────────────────────

  describe('init', () => {
    it('should attach click listeners to buttons', async () => {
      await loadModule();

      // Set text so handlers don't hit the error branch
      (document.getElementById('textInput') as HTMLTextAreaElement).value = 'test';

      document.getElementById('uppercaseBtn')!.click();
      expect(document.getElementById('resultContent')!.textContent).toBe('TEST');

      document.getElementById('lowercaseBtn')!.click();
      expect(document.getElementById('resultContent')!.textContent).toBe('test');

      document.getElementById('titleCaseBtn')!.click();
      expect(document.getElementById('resultContent')!.textContent).toBe('Test');

      document.getElementById('countBtn')!.click();
      expect(document.getElementById('resultContent')!.textContent).toContain('Total letters: 4');
    });

    it('should not throw when buttons are missing from the DOM', async () => {
      document.body.innerHTML = ''; // no buttons at all
      await expect(loadModule()).resolves.not.toThrow();
    });
  });
});
