module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.ts'], // Match test files
  clearMocks: true,
};