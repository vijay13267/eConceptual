import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import LoginScreen from '../src/screens/LoginScreen'; // Adjust the import path as needed
import rootReducer from '../src/redux/reducers/index'; // Adjust the import path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserLoginStatus, setUserDetails } from '../src/redux/actions/authActions';

// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn(),
}));

// Mocking the navigation
const mockNavigate = jest.fn();

const createTestProps = (props) => ({
  navigation: {
    navigate: mockNavigate,
  },
  ...props,
});

const store = createStore(rootReducer);

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('displays error when email or password are empty', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), '');
    fireEvent.changeText(getByPlaceholderText('Password'), '');
    fireEvent.press(getByText('Sign In'));

    expect(getByText('Both email and password are required.')).toBeTruthy();
  });

  it('displays error when email is invalid', () => {
    const { getByText, getByPlaceholderText } = render(
        <Provider store={store}>
          <LoginScreen navigation={{ navigate: jest.fn() }} />
        </Provider>
    );
  
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Sign In'));

    expect(getByText('Please enter a valid email address.')).toBeTruthy();
});

  it('shows error when email or password is incorrect', async () => {
    const props = createTestProps({});
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'user@econceptual.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrong-password');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(getByText('Invalid email or password.')).toBeTruthy();
    });
  });

  it('navigates to Products page on successful login', async () => {
    const mockNavigate = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: mockNavigate }} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'user@econceptual.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'user-password');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('Products'));
  });

  it('stores login status and user details in AsyncStorage on successful login', async () => {
    const mockNavigate = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: mockNavigate }} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'user@econceptual.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'user-password');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userDetails', JSON.stringify({
        email: 'vijaydonkena@gmail.com',
        name: 'Vijay',
        city: 'Hyderabad',
        pincode: '505188',
        country: 'India'
      }));
    });
  });
});
