import { test, expect } from '@playwright/test';

test.describe('Co-Pilot Playground - Text Utilities', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle('Co-Pilot Playground - Text Utilities');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('🎮 Co-Pilot Playground');
  });

  test('shows all three transform buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'UPPERCASE' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'lowercase' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Count Letters' })).toBeVisible();
  });

  test('UPPERCASE transform converts text correctly', async ({ page }) => {
    const textbox = page.getByRole('textbox', { name: 'Enter your text:' });
    await textbox.fill('Hello World');
    await page.getByRole('button', { name: 'UPPERCASE' }).click();

    const resultHeading = page.getByRole('heading', { level: 3 });
    await resultHeading.waitFor({ state: 'visible' });
    await expect(resultHeading).toHaveText('Uppercase Result:');
    await expect(page.locator('#resultContent')).toHaveText('HELLO WORLD');
  });

  test('lowercase transform converts text correctly', async ({ page }) => {
    const textbox = page.getByRole('textbox', { name: 'Enter your text:' });
    await textbox.fill('Hello World');
    await page.getByRole('button', { name: 'lowercase' }).click();

    const resultHeading = page.getByRole('heading', { level: 3 });
    await resultHeading.waitFor({ state: 'visible' });
    await expect(resultHeading).toHaveText('Lowercase Result:');
    await expect(page.locator('#resultContent')).toHaveText('hello world');
  });

  test('Count Letters shows correct total and per-word counts', async ({ page }) => {
    const textbox = page.getByRole('textbox', { name: 'Enter your text:' });
    await textbox.fill('Hello World');
    await page.getByRole('button', { name: 'Count Letters' }).click();

    const resultHeading = page.getByRole('heading', { level: 3 });
    await resultHeading.waitFor({ state: 'visible' });
    await expect(resultHeading).toHaveText('Letter Count:');
    const resultContent = page.locator('#resultContent');
    await expect(resultContent).not.toBeEmpty();
    const resultText = await resultContent.textContent();
    expect(resultText).toContain('Total letters: 10');
    expect(resultText).toContain('"Hello" → 5 letters');
    expect(resultText).toContain('"World" → 5 letters');
  });

  test('shows error when input is empty', async ({ page }) => {
    await page.getByRole('button', { name: 'UPPERCASE' }).click();

    const resultHeading = page.getByRole('heading', { level: 3 });
    await resultHeading.waitFor({ state: 'visible' });
    await expect(resultHeading).toHaveText('Error');
    await expect(page.locator('#resultContent')).toHaveText('Please enter some text first!');
  });

  test('shows error for whitespace-only input', async ({ page }) => {
    const textbox = page.getByRole('textbox', { name: 'Enter your text:' });
    await textbox.fill('   ');
    await page.getByRole('button', { name: 'lowercase' }).click();

    const resultHeading = page.getByRole('heading', { level: 3 });
    await resultHeading.waitFor({ state: 'visible' });
    await expect(resultHeading).toHaveText('Error');
    await expect(page.locator('#resultContent')).toHaveText('Please enter some text first!');
  });

  test('toggling between transforms updates result', async ({ page }) => {
    const textbox = page.getByRole('textbox', { name: 'Enter your text:' });
    await textbox.fill('Test Input');
    const resultContent = page.locator('#resultContent');

    // Click UPPERCASE first
    await page.getByRole('button', { name: 'UPPERCASE' }).click();
    await expect(resultContent).toHaveText('TEST INPUT');

    // Toggle to lowercase
    await page.getByRole('button', { name: 'lowercase' }).click();
    await expect(resultContent).toHaveText('test input');

    // Toggle to Count Letters
    await page.getByRole('button', { name: 'Count Letters' }).click();
    await expect(resultContent).not.toBeEmpty();
    const resultText = await resultContent.textContent();
    expect(resultText).toContain('Total letters: 9');
  });

  test('handles special characters and numbers', async ({ page }) => {
    const textbox = page.getByRole('textbox', { name: 'Enter your text:' });
    await textbox.fill('Hello 123! @#$');
    const resultContent = page.locator('#resultContent');

    await page.getByRole('button', { name: 'UPPERCASE' }).click();
    await expect(resultContent).toHaveText('HELLO 123! @#$');

    await page.getByRole('button', { name: 'Count Letters' }).click();
    await expect(resultContent).not.toBeEmpty();
    const resultText = await resultContent.textContent();
    expect(resultText).toContain('Total letters: 5');
  });

  test('result section is hidden initially', async ({ page }) => {
    const result = page.locator('#result');
    await expect(result).not.toHaveClass(/show/);
  });

  test('result section becomes visible after clicking a button', async ({ page }) => {
    const textbox = page.getByRole('textbox', { name: 'Enter your text:' });
    await textbox.fill('test');
    await page.getByRole('button', { name: 'UPPERCASE' }).click();

    const result = page.locator('#result');
    await expect(result).toHaveClass(/show/);
  });
});
