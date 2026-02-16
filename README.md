# Co-Pilot Playground

A simple web application playground for testing Co-Pilot functionality. This test bed provides text manipulation utilities including uppercase conversion, lowercase conversion, and letter counting.

## Features

- **Convert to Uppercase**: Transform any text to uppercase
- **Convert to Lowercase**: Transform any text to lowercase
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

## Testing Best Practices

- All utility functions have comprehensive test coverage
- Tests cover edge cases (empty strings, special characters, numbers, etc.)
- Each function has multiple test scenarios
- Run tests before committing changes

## Contributing

When adding new features:

1. Write the functionality in TypeScript
2. Add comprehensive unit tests
3. Ensure all tests pass (`npm test`)
4. Ensure no linting errors (`npm run lint`)
5. Format code (`npm run format`)

## License

MIT
