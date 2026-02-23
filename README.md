# Co-Pilot Playground

A simple web application playground for testing Co-Pilot functionality. This test bed provides text manipulation utilities including uppercase conversion, lowercase conversion, smart title-case conversion, and letter counting.

## Features

- **Convert to Uppercase**: Transform any text to uppercase
- **Convert to Lowercase**: Transform any text to lowercase
- **Convert to Title Case**: Apply smart AP-style title casing while preserving punctuation and spacing
- **Count Letters**: Count total letters and letters per word in the input text
- Clean, modern UI with gradient styling
- Fully typed with TypeScript
- Comprehensive unit test coverage with Jest
- Code quality enforcement with ESLint and Prettier

## Requirements

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher (comes with Node.js)

## Installation

1. Clone or download this repository

2. Install dependencies:

```bash
npm install
```

## Running the Application

### Build the TypeScript code:

```bash
npm run build
```

### Serve the application:

```bash
npm run serve
```

Then open your browser to `http://localhost:8080`

### Development mode (with auto-rebuild):

```bash
npm run dev
```

This will watch for changes and automatically rebuild the TypeScript files.

## Testing

### Run all tests:

```bash
npm test
```

### Run tests in watch mode:

```bash
npm run test:watch
```

### Generate test coverage report:

```bash
npm run test:coverage
```

Coverage reports will be generated in the `coverage/` directory.

## Linting

### Check for linting errors:

```bash
npm run lint
```

### Auto-fix linting errors:

```bash
npm run lint:fix
```

## Code Formatting

### Format all files:

```bash
npm run format
```

### Check formatting without modifying files:

```bash
npm run format:check
```

## Project Structure

```
ai-test-bed/
├── src/
│   ├── index.ts          # Main application entry point
│   └── textUtils.ts      # Text manipulation utility functions
├── tests/
│   └── textUtils.test.ts # Unit tests for text utilities
├── dist/                 # Compiled JavaScript output (generated)
├── coverage/             # Test coverage reports (generated)
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── jest.config.js        # Jest test configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .gitignore            # Git ignore rules
├── README.md             # This file
└── copilot-instructions.md  # Instructions for GitHub Copilot
```

## Scripts Reference

| Command                 | Description                          |
| ----------------------- | ------------------------------------ |
| `npm run build`         | Compile TypeScript to JavaScript     |
| `npm run dev`           | Watch mode - auto-rebuild on changes |
| `npm test`              | Run all unit tests                   |
| `npm run test:watch`    | Run tests in watch mode              |
| `npm run test:coverage` | Generate test coverage report        |
| `npm run lint`          | Check code for linting errors        |
| `npm run lint:fix`      | Auto-fix linting errors              |
| `npm run format`        | Format code with Prettier            |
| `npm run format:check`  | Check code formatting                |
| `npm run serve`         | Start local HTTP server              |

## Technology Stack

- **TypeScript**: Strongly typed JavaScript
- **Jest**: Testing framework with ts-jest
- **ESLint**: Code linting and quality checks
- **Prettier**: Code formatting
- **ES Modules**: Modern JavaScript module system

## Development Workflow

1. Make changes to TypeScript files in `src/`
2. Run `npm run build` or `npm run dev` to compile
3. Run `npm test` to verify tests pass
4. Run `npm run lint` to check code quality
5. Run `npm run format` to ensure consistent formatting
6. Open `index.html` in a browser or use `npm run serve`

## CI Pipeline

This project uses **GitHub Actions** to run automated checks on every pull request targeting `main`. The workflow lives in `.github/workflows/ci.yml` and includes two jobs:

| Job      | What it checks                                       |
| -------- | ---------------------------------------------------- |
| **Lint** | ESLint rules and Prettier formatting                 |
| **Test** | TypeScript build, Jest unit tests, and code coverage |

### Coverage Requirements

Jest is configured with a **minimum 70% coverage threshold** across statements, branches, functions, and lines. The CI build will **fail** if coverage drops below this threshold.

Coverage reports are:

- Printed to the console (`text` and `text-summary`)
- Published as a **GitHub Actions artifact** (HTML + LCOV)
- Summarised in the **GitHub Actions job summary** table

To check coverage locally:

```bash
npm run test:coverage
```

### Branch Protection (manual step)

To enforce these checks before merging, enable **branch protection rules** on `main` in the GitHub repository settings:

1. Go to **Settings → Branches → Add rule**
2. Set **Branch name pattern** to `main`
3. Enable **Require status checks to pass before merging**
4. Select the **Lint** and **Test** status checks
5. Optionally enable **Require branches to be up to date before merging**

## Testing Best Practices

- All utility functions have comprehensive test coverage
- Tests cover edge cases (empty strings, special characters, numbers, etc.)
- Each function has multiple test scenarios
- Run tests before committing changes

## Contributing

### Branch Naming Convention (Guidance Only)

For the canonical branch naming convention, see [`AGENTS.md`](AGENTS.md#branch-naming-guidance-only).
This is guidance only and is not enforced by CI or Git hooks.

When adding new features:

1. Write the functionality in TypeScript
2. Add comprehensive unit tests
3. Ensure all tests pass (`npm test`)
4. Ensure no linting errors (`npm run lint`)
5. Format code (`npm run format`)
6. Open a pull request — CI will run lint and test checks automatically

## License

MIT
