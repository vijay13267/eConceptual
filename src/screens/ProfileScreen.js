import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUserDetails } from '../redux/actions/authActions';
import LogoutModal from '../components/LogoutModal'; 
import { Dropdown } from 'react-native-element-dropdown';

const ProfileScreen = ({ navigation }) => {
  const userDetails = useSelector((state)=>state.auth.userDetails)
  const [profile, setProfile] = useState({
    email: userDetails.email,
    name: userDetails.name,
    city: userDetails.city,
    pincode: userDetails.pincode,
    country: userDetails.country
  }); // To store latest updates
  // Example country options
  const countryOptions = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
    // Add more countries as needed
  ];
  const [selectedCountry, setSelectedCountry] = useState(countryOptions.find(option => option.value === userDetails.country));
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const token = useSelector(state => state.auth.token); // Assuming token is stored in auth slice
  const dispatch = useDispatch();


  const handleLogout = () => {
    setIsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleLogoutConfirm = () => {
    navigation.navigate('Login'); // Navigate to Login screen after logout
    handleModalClose(); // Close the modal
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Here you would typically send a PUT request to update the profile
      // For now, we'll just log the updated profile
      let updatedProfile = { ...profile, country: selectedCountry?.value }
      console.log('Updated profile:',updatedProfile );

      // Simulate success and reset edit mode
      setIsEditing(false);
      dispatch(setUserDetails(updatedProfile));
      setProfile(updatedProfile)
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
          source={require('../../assets/profilePic.jpg')} // Adjust path as necessary
          style={styles.profileImage}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.infoTitle}>Email</Text>
        <TextInput
          style={[styles.infoValue, isEditing && styles.inputBorder]} // Apply border style if editing
          value={profile.email}
          onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
          editable={isEditing} //becomes editable after pressing Edit Button
        />
        <Text style={styles.infoTitle}>Name</Text>
        <TextInput
          style={[styles.infoValue, isEditing && styles.inputBorder]} // Apply border style if editing
          value={profile.name}
          onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
          editable={isEditing}
        />
        <Text style={styles.infoTitle}>City</Text>
        <TextInput
          style={[styles.infoValue, isEditing && styles.inputBorder]} // Apply border style if editing
          value={profile.city}
          onChangeText={(text) => setProfile(prev => ({ ...prev, city: text }))}
          editable={isEditing}
        />
        <Text style={styles.infoTitle}>Pincode</Text>
        <TextInput
          style={[styles.infoValue, isEditing && styles.inputBorder]} // Apply border style if editing
          value={profile.pincode}
          onChangeText={(text) => setProfile(prev => ({ ...prev, pincode: text }))}
          editable={isEditing}
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
      {/* Edit & update Button changes based on the action that user is performing */}
      {isEditing ? (
        <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
      {/* Log out button*/}
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
    backgroundColor: '#244889', // Theme color for the whole screen
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
    color: '#fff', // White color for text
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    color: '#fff', // White color for text
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff', // White border for input field (default state)
    paddingVertical: 8, // Add padding for better touch experience
  },
  inputBorder: {
    borderWidth: 1, // Add border around the input when editing
    borderColor: '#fff', // White border for input field (editing state)
    borderRadius: 4, // Optional: to add rounded corners
    padding: 10,
  },
  dropdown: {
    backgroundColor: 'transparent', // Background color for the dropdown to match input fields
    borderBottomWidth: 1, // Border bottom to match input fields
    borderBottomColor: '#fff', // White border color
    height: 40, // Match height with input fields
  },
  placeholderStyle: {
    fontSize: 18,
    color: '#fff', // Placeholder text color to match input fields
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#fff', // Selected text color to match input fields
  },
  inputSearchStyle: {
    fontSize: 18,
    color: '#fff', // Input search text color to match input fields
  },
  itemTextStyle: {
    fontSize: 18,
    color: '#000', // Dropdown item text color (black for contrast)
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  editButton: {
    backgroundColor: '#fff', // Button background color
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  updateButton: {
    backgroundColor: '#fff', // Button background color
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
    color: '#244889', // Theme color for buttons
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
