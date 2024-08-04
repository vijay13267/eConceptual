import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';
import dress1 from '../../assets/producImages/dress1.png';
import dress2 from '../../assets/producImages/dress2.png';
import dress3 from '../../assets/producImages/dress3.png';
import dress4 from '../../assets/producImages/dress4.png';
import dress5 from '../../assets/producImages/dress5.png';
import dress6 from '../../assets/producImages/dress6.png';
import dress7 from '../../assets/producImages/dress7.png';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';

const Products = ({ navigation }) => {
  const dispatch = useDispatch()
  const products = useSelector((state)=> state.product.products) //getting products state from redux store
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulated data
        const data = [
          { id: '1', name: 'Product 1', description: 'Description of Product 1', price: '10.00', imageUrl: dress1, premiumAccess: false },
          { id: '2', name: 'Product 2', description: 'Description of Product 2', price: '20.00', imageUrl: dress2, premiumAccess: true },
          { id: '3', name: 'Product 3', description: 'Description of Product 3', price: '15.00', imageUrl: dress7, premiumAccess: false },
          { id: '4', name: 'Product 4', description: 'Description of Product 4', price: '25.00', imageUrl: dress4, premiumAccess: true },
          { id: '5', name: 'Product 5', description: 'Description of Product 5', price: '30.00', imageUrl: dress5, premiumAccess: false },
          { id: '6', name: 'Product 6', description: 'Description of Product 6', price: '40.00', imageUrl: dress6, premiumAccess: true },
        ];
        // updating the products in redux store
        dispatch(setProducts(data));
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProfileNavigation = () => {
    navigation.navigate('Profile');
  };

  const renderProduct = ({ item }) => (
    <ProductCard
      name={item.name}
      description={item.description}
      price={item.price}
      imageUrl={item.imageUrl}
      premiumAccess={item.premiumAccess}
    />
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* header section displaying page name and profile image */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity onPress={handleProfileNavigation}>
          <Image
            source={require('../../assets/profilePic.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      {/* /List of products displayed using flatlist */}
      <FlatList
        data={products}
        renderItem={renderProduct} //each item is being rendered and passed to component
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#244889', // Theme color for the page background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff', // White border for profile image
  },
  cardContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#244889', // Match background color for the loader
  },
  error: {
    color: '#fff', // White color for error message
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Products;
