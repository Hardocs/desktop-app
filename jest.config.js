/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['**/__tests__/**/*.(test|spec).js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(test|spec).js'
    // '<rootDir>/src/**/*.(test|spec).js'
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./jest.setup.js']
};
