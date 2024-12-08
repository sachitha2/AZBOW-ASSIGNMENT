module.exports = {
    testEnvironment: "jsdom", // For React testing
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // Use babel-jest for TypeScript and JS files
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(react-markdown|remark-gfm)/)", // Allow transforming these modules
      ],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Ensure setup file runs
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1", // Support absolute imports
    },
  };