import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../src/screens/ProfileScreen'; // Adjust the import path as needed
import rootReducer from '../src/redux/reducers'; // Adjust the import path as needed
import { setUserDetails, setUserLoginStatus } from '../src/redux/actions/authActions';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  removeItem: jest.fn(),
  getItem: jest.fn(),
}));

const store = createStore(rootReducer);

describe('ProfileScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    AsyncStorage.setItem.mockClear();
    AsyncStorage.removeItem.mockClear();
    AsyncStorage.getItem.mockClear();
  });

    it('renders correctly', () => {
        const { getByText, getByTestId } = render(
        <Provider store={store}>
            <ProfileScreen navigation={{ navigate: jest.fn() }} />
        </Provider>
        );

        expect(getByText('Email')).toBeTruthy();
        expect(getByText('Name')).toBeTruthy();
        expect(getByText('City')).toBeTruthy();
        expect(getByText('Pincode')).toBeTruthy();
        expect(getByText('Country')).toBeTruthy();
        expect(getByTestId('profile-image')).toBeTruthy();
    });

    it('Error display When updating without email', async () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
            <ProfileScreen navigation={{ navigate: jest.fn() }} />
            </Provider>
        );

        // Toggle edit mode
        fireEvent.press(getByTestId('edit-button'));

        // Check if fields are editable
        const emailInput = getByTestId('email-input');
        fireEvent.changeText(emailInput, ''); // Invalid email

        // Trigger update action
        fireEvent.press(getByTestId('update-button'));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(getByText('All fields are required.')).toBeTruthy();
        });
    });
    it('Error display When updating without name', async () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
            <ProfileScreen navigation={{ navigate: jest.fn() }} />
            </Provider>
        );

        // Toggle edit mode
        fireEvent.press(getByTestId('edit-button'));

        // Check if fields are editable
        const emailInput = getByTestId('name-input');
        fireEvent.changeText(emailInput, ''); // Invalid email

        // Trigger update action
        fireEvent.press(getByTestId('update-button'));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(getByText('All fields are required.')).toBeTruthy();
        });
    });

    it('Error display When pincode is empty', async () => {
        const { getByTestId, getByText } = render(
          <Provider store={store}>
            <ProfileScreen navigation={{ navigate: jest.fn() }} />
          </Provider>
        );
      
        // Toggle edit mode
        fireEvent.press(getByTestId('edit-button'));
      
        // Check if fields are editable
        const pincodeInput = getByTestId('pincode-input');
        fireEvent.changeText(pincodeInput, ''); // Invalid pincode
      
        // Trigger update action
        fireEvent.press(getByTestId('update-button'));
      
        // Wait for the error message to appear
        await waitFor(() => {
          expect(getByText('All fields are required.')).toBeTruthy();
        });
    });
      
});
