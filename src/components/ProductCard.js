import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// This component is used in Products screen and each product is displayed as this component
const ProductCard = ({ name, description, price, imageUrl, premiumAccess }) => {
  return (
    <View style={styles.card}>
      {/* displays product image */}
      <View style={styles.imageContainer}>
        <Image 
          source={imageUrl}
          style={styles.image} 
          resizeMode='contain'
        />
      </View>
      {/* /displays product info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
        {premiumAccess && <Text style={styles.premium}>Premium Access</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', // White background for the card
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light border color
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8', // Light background for image container
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#244889', // Theme color for price
    marginBottom: 8,
  },
  premium: {
    fontSize: 14,
    color: '#ff9900',
    fontWeight: 'bold',
  },
});

export default ProductCard;
