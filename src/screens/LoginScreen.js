import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserDetails, setUserLoginStatus } from '../redux/actions/authActions';

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); // Initialize as empty string
  const [password, setPassword] = useState(''); // Initialize as empty string
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (email !== 'user@econceptual.com' || password !== 'user-password') {
      setError('Invalid email or password.');
      return;
    }    

    try {
      dispatch(setUserLoginStatus(true));
      // update token in store
      // fetch user Details and update in store (storing mock response in this case)
      let data = {
        email: 'vijaydonkena@gmail.com',
        name: 'Vijay',
        city: 'Hyderabad',
        pincode: '505188',
        country: 'India'
      };
      dispatch(setUserDetails(data)); //
      navigation.navigate('Products');
    } catch (err) {
      console.log('Error', err);
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../assets/LoginImage.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.catchyTextContainer}>
        <Text style={styles.catchyText}>
          <Text style={styles.lineOne}>Step into{'\n'}</Text>
          <Text style={styles.lineTwo}>World of {'\n'}</Text>
          <Text style={styles.lineThree}>Fashion</Text>
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#244889', // Theme color for the whole screen
    justifyContent: 'flex-end', // Align children to the bottom
    padding: 16,
  },
  image: {
    position: 'absolute',
    right: -40,
    bottom: 0,
    width: 250,
    height: 250,
    opacity: 0.75, // Adjust opacity to blend with the background
  },
  catchyTextContainer: {
    position: 'absolute',
    bottom: 250,
    left: 16,
    width: '60%', 
  },
  catchyText: {
    color: '#fff',
  },
  lineOne: {
    fontSize: 25,
    // fontWeight: 'bold',
  },
  lineTwo: {
    fontSize: 35, 
  },
  lineThree: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16, // Add some margin to ensure it's not too close to the bottom
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#000', // Ensure text is black
    backgroundColor: '#fff', // Ensure input background is white
  },
  error: {
    color: 'red',
    marginBottom: 12,
    alignSelf:'center'
  },
  button: {
    backgroundColor: '#244889', // Button background color
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff', // Button text color to match theme
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
