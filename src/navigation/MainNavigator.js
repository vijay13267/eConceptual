import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Products from '../screens/Products';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#244889', // Theme color for the header
          },
          headerTintColor: '#fff', // Text color in the header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20, // Title font size
          },
        }}
      >
        {/* screens */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
