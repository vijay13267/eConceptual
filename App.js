
import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserDetails } from './src/redux/actions/authActions';

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // checking if is user is logged in and navigating accordingly
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        console.log('isLoggedIn',isLoggedIn)
        if(isLoggedIn === 'true'){
          const userDetailsString = await AsyncStorage.getItem('userDetails');
          if (userDetailsString !== null) {
            const userDetails = JSON.parse(userDetailsString);
            // Use userDetails as needed
            dispatch(setUserDetails(userDetails)); //getting and updating userDetails from Async
            setInitialRoute('Products')
            console.log(userDetails);
          }
        }else{
          setInitialRoute('Login')
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
        setInitialRoute('Login');
      }
    };

    checkLoginStatus();
  }, []);
  if (initialRoute === null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  return (
      <AppNavigator Screen={initialRoute}/>
  );
};

export default App;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#244889', // Match your theme color
  },
});