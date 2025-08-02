module.exports = {
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/*.test.js'],
      testEnvironment: 'jsdom',
    },
    {
      displayName: 'e2e',
      testMatch: ['<rootDir>/__tests__/**/*.test.js', '<rootDir>/e2e/**/*.test.js'],
      testEnvironment: 'node',
      testTimeout: 60000,
    },
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!__tests__/e2e.server.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
};