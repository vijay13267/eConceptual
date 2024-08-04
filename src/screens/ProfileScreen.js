import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUserDetails, setUserLoginStatus } from '../redux/actions/authActions';
import LogoutModal from '../components/LogoutModal'; 
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [profile, setProfile] = useState({
    email: userDetails.email,
    name: userDetails.name,
    city: userDetails.city,
    pincode: userDetails.pincode,
    country: userDetails.country,
  });
  const countryOptions = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
  ];
  const [selectedCountry, setSelectedCountry] = useState(
    countryOptions.find(option => option.value === userDetails.country)
  );
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState('');

  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePincode = (pincode) => {
    const regex = /^[1-9]\d{5}$/;
    return regex.test(pincode);
  };
  

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      // Clear the login status from AsyncStorage
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userDetails');
      // Update Redux store to reflect the logout status
      dispatch(setUserLoginStatus(false));
  
      // Navigate to login page or any other screen you want
      navigation.navigate('Login');
      handleModalClose();
    } catch (err) {
      console.log('Error during logout:', err);
      // Handle any errors, e.g., show a message to the user
    }
    
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setError(''); // Clear previous errors

    if (!profile.email || !profile.name || !profile.city || !profile.pincode || !selectedCountry) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(profile.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePincode(profile.pincode)) {
      setError('Pincode should be of 6 digits.');
      return;
    }

    try {
      let updatedProfile = { ...profile, country: selectedCountry?.value };
      console.log('Updated profile:', updatedProfile);

      setIsEditing(false);
      await AsyncStorage.setItem('userDetails',JSON.stringify(updatedProfile));
      dispatch(setUserDetails(updatedProfile));
      setProfile(updatedProfile);
    } catch (err) {
      console.error('Failed to update profile:', err);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/profilePic.jpg')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.infoTitle}>Email</Text>
        <TextInput
          style={[styles.infoValue, isEditing && styles.inputBorder]}
          value={profile.email}
          onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
          editable={isEditing}
        />
        <Text style={styles.infoTitle}>Name</Text>
        <TextInput
          style={[styles.infoValue, isEditing && styles.inputBorder]}
          value={profile.name}
          onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
          editable={isEditing}
        />
        <Text style={styles.infoTitle}>City</Text>
        <TextInput
          style={[styles.infoValue, isEditing && styles.inputBorder]}
          value={profile.city}
          onChangeText={(text) => setProfile(prev => ({ ...prev, city: text }))}
          editable={isEditing}
        />
        <Text style={styles.infoTitle}>Pincode</Text>
        <TextInput
          style={[styles.infoValue, isEditing && styles.inputBorder]}
          value={profile.pincode}
          onChangeText={(text) => setProfile(prev => ({ ...prev, pincode: text }))}
          editable={isEditing}
          keyboardType="numeric"
        />
        <Text style={styles.infoTitle}>Country</Text>
        {isEditing ? (
          <Dropdown
            style={[styles.dropdown, styles.infoValue, styles.inputBorder]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={countryOptions}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select country"
            searchPlaceholder="Search..."
            value={selectedCountry ? selectedCountry.value : null}
            onChange={(item) => setSelectedCountry(item)}
          />
        ) : (
          <Text style={styles.infoValue}>{profile.country}</Text>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isEditing ? (
        <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={{ ...styles.buttonText, color: '#fff' }}>Log Out</Text>
      </TouchableOpacity>
      <LogoutModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onLogout={handleLogoutConfirm}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#244889',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },
  detailsContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingVertical: 8,
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    padding: 10,
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    height: 40,
  },
  placeholderStyle: {
    fontSize: 18,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#fff',
  },
  inputSearchStyle: {
    fontSize: 18,
    color: '#fff',
  },
  itemTextStyle: {
    fontSize: 18,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  updateButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  logoutButton: {
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#244889',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
