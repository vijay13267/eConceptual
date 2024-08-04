module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js'
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|@react-native|react-native-gesture-handler|aws-amplify|@aws-amplify|react-redux)"
  ],
};