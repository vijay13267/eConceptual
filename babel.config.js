module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // Ensures that ES modules are transformed
  ],
};
