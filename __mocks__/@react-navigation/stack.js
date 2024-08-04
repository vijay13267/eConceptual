import React from 'react';
import { View } from 'react-native';

const Stack = {
  Navigator: ({ children }) => <View>{children}</View>,
  Screen: ({ component }) => <View>{component}</View>,
};

const createStackNavigator = () => Stack;

export { createStackNavigator };
