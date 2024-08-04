module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js'
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|@react-native|aws-amplify|@aws-amplify)"
  ],
};