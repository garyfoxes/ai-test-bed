module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  // Strip .js extension from ES module imports for TypeScript/Jest compatibility
  // This allows Jest to resolve './textUtils.js' imports to './textUtils.ts' files
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
