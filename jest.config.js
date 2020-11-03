module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "**/src/*.{js,jsx}",
        "__utils__/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/mocks/**"
    ]
};