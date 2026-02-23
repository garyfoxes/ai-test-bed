# GitHub Copilot Instructions

This document provides context and guidelines for GitHub Copilot when working with this codebase.

Note: `.github/copilot-instructions.md` points to this file so both Copilot and Codex follow one shared instruction source.

## Project Overview

This is a TypeScript-based web application playground designed to test GitHub Copilot functionality. The application provides text manipulation utilities through a clean web interface.

## Project Purpose

- **Primary Goal**: Serve as a test bed for GitHub Copilot features and capabilities
- **Secondary Goal**: Demonstrate best practices for TypeScript, Jest, ESLint, and Prettier integration
- **Use Case**: Text manipulation utilities (case conversion, letter counting)

## Code Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Always provide explicit return types for functions
- Use interfaces for complex object structures
- Prefer `const` over `let` when values don't change
- Use descriptive variable and function names

### Function Documentation

- All exported functions must have JSDoc comments
- Include @param tags for parameters
- Include @returns tag for return values
- Provide brief description of function purpose

### Testing

- Write comprehensive unit tests for all utility functions
- Test edge cases (empty strings, special characters, null values)
- Use descriptive test names following "should [expected behavior]" pattern
- Group related tests using `describe` blocks
- Aim for 100% code coverage on utility functions

### Code Quality

- Follow ESLint rules strictly
- Run Prettier before committing
- No unused variables or imports
- No `any` types (use proper typing)
- Handle edge cases explicitly

## Architecture Patterns

### Module Structure

- **src/textUtils.ts**: Pure utility functions with no DOM dependencies
- **src/index.ts**: DOM manipulation and event handling
- Keep business logic separate from UI logic

### Function Design

- Keep functions small and focused (single responsibility)
- Pure functions in textUtils.ts (no side effects)
- Event handlers in index.ts manage DOM interactions

### Error Handling

- Validate input before processing
- Provide user-friendly error messages
- Display errors in the UI result container

## When Suggesting Code

### Do:

- Suggest TypeScript with proper types
- Include JSDoc comments for new functions
- Provide corresponding Jest tests for new functionality
- Follow existing code patterns and conventions
- Consider edge cases and error handling

### Don't:

- Suggest JavaScript without types
- Create functions without documentation
- Add features without tests
- Ignore ESLint warnings
- Use `any` type unnecessarily

## Testing Guidelines

### When Writing Tests:

```typescript
// Good - descriptive, tests one thing
it('should return empty array for empty string', () => {
  expect(countLettersPerWord('')).toEqual([]);
});

// Bad - unclear what's being tested
it('works', () => {
  expect(countLettersPerWord('')).toEqual([]);
});
```

### Test Coverage:

- Happy path (normal inputs)
- Edge cases (empty, null, undefined)
- Boundary conditions (very long strings)
- Special characters and numbers
- Multiple spaces, mixed case

## Common Patterns in This Codebase

### Utility Functions:

```typescript
/**
 * Brief description
 * @param paramName - Parameter description
 * @returns Return value description
 */
export function functionName(paramName: string): ReturnType {
  // Implementation
  return result;
}
```

### Event Handlers:

```typescript
function handleAction(): void {
  const input = getTextInput();
  if (!input.trim()) {
    displayResult('Error', 'Message');
    return;
  }
  // Process input
  displayResult('Title', result);
}
```

### Test Structure:

```typescript
describe('functionName', () => {
  it('should handle specific scenario', () => {
    expect(functionName(input)).toBe(expected);
  });
});
```

## Key Dependencies

- **TypeScript 5.x**: Static typing
- **Jest 29.x**: Unit testing framework
- **Playwright**: End-to-end (E2E) browser testing
- **ESLint 8.x**: Linting
- **Prettier 3.x**: Code formatting
- **ts-jest**: TypeScript support for Jest

## E2E Testing (Playwright)

### Overview

End-to-end tests live in the `e2e/` directory and use [Playwright](https://playwright.dev/). They run against the real app served by `http-server` on port 8080.

### Running E2E Tests

- Run all: `npm run test:e2e`
- Interactive UI mode: `npm run test:e2e:ui`
- HTML report: `npx playwright show-report`

### Writing Resilient Tests

- **Always wait for elements** before asserting — use `waitFor({ state: 'visible' })` on result elements and headings before checking text content.
- **Use Playwright auto-retrying assertions** (`toHaveText`, `toBeVisible`, `not.toBeEmpty`) instead of raw `textContent()` checks wherever possible.
- **Read `textContent()` only after** an auto-retrying assertion has confirmed the element is populated. This prevents flaky reads on slow networks.
- **Do not hard-code waits** (`page.waitForTimeout`). Rely on Playwright built-in timeouts configured in `playwright.config.ts` instead.
- **Timeouts are configured globally** in `playwright.config.ts`:
  - Test timeout: 30 s
  - Expect timeout: 10 s
  - Navigation timeout: 15 s
  - Action timeout: 10 s
- **Retries**: 1 locally, 2 on CI. Traces are captured on first retry for debugging.

### Test File Conventions

- E2E specs: `e2e/<feature>.spec.ts`
- Name tests descriptively using the pattern: `'<feature> does expected thing'`
- Group related tests under a `test.describe` block
- Use `test.beforeEach` for common navigation

### When Adding New Features

1. Add unit tests in `tests/` (Jest)
2. Add E2E tests in `e2e/` (Playwright)
3. Ensure the E2E test waits for results before asserting
4. Run `npm run test:e2e` to verify before committing

## Build Process

1. TypeScript compiles `src/*.ts` to `dist/*.js`
2. HTML loads compiled JS as ES modules
3. Jest runs tests directly on TypeScript files using ts-jest

## File Naming Conventions

- Source files: camelCase (e.g., `textUtils.ts`)
- Test files: match source + `.test.ts` (e.g., `textUtils.test.ts`)
- Config files: lowercase with hyphens (e.g., `.eslintrc.json`)

## Environment

- **Target**: Modern browsers with ES2020 support
- **Module System**: ES Modules
- **Minimum Node.js**: 18.0.0

## Suggested Enhancements

When suggesting new features, consider:

- Adding new text manipulation utilities
- Improving error messages
- Adding input validation
- Enhancing UI/UX
- Adding keyboard shortcuts
- Supporting internationalization

Always provide:

1. TypeScript implementation
2. Unit tests
3. Documentation updates

## Quick Reference

### Running Commands:

- Build: `npm run build`
- Test (unit): `npm test`
- Test with coverage: `npm run test:coverage`
- Test (E2E): `npm run test:e2e`
- Test (E2E UI): `npm run test:e2e:ui`
- Lint: `npm run lint`
- Format: `npm run format`

### Making Changes:

1. Edit TypeScript in `src/`
2. Add unit tests in `tests/`
3. Add or update E2E tests in `e2e/`
4. Run `npm run build`
5. Run `npm test`
6. Run `npm run test:e2e`
7. Run `npm run lint`
8. Open a pull request — GitHub Actions CI will run lint and test checks automatically

### Pull Requests:

1. Use `.github/pull_request_template.md` when creating or updating pull request descriptions.
2. Fill in each section with concrete details for the current changes.
3. If a section does not apply, write `N/A` instead of leaving placeholders.

### Branch Naming (Guidance Only):

Use these branch name patterns as a team convention for consistency:

- `feat/<kebab-case-slug>`
- `bug/<kebab-case-slug>`
- `chore/<kebab-case-slug>`

Slug format rules:

- Lowercase letters only
- Words separated by hyphens (`-`)

Examples:

- Valid: `feat/add-export-button`, `bug/fix-empty-input-crash`, `chore/update-deps`
- Invalid: `feature/add-export`, `bug/fix_empty_input`, `Chore/update-deps`

This is guidance only and is not enforced by CI or Git hooks.

## CI Pipeline

The project has a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every pull request targeting `main`.

### Jobs:

- **Lint** — runs ESLint and Prettier format check
- **Test** — builds TypeScript, runs Jest with coverage, and uploads a coverage artifact
- **E2E Tests** — installs Chromium, builds TypeScript, runs Playwright E2E tests, and uploads the report on failure

### Coverage Requirements:

- Minimum **70%** coverage is enforced globally for statements, branches, functions, and lines
- Jest is configured with `coverageThreshold` in `jest.config.js`
- Coverage reporters: `text`, `text-summary`, `lcov`, `html`, `json-summary`
- The CI job writes a coverage summary table to the GitHub Actions job summary

### When Suggesting Code:

- Always ensure new code is accompanied by tests that maintain or improve the 70% coverage threshold
- Do not lower coverage thresholds without explicit approval
