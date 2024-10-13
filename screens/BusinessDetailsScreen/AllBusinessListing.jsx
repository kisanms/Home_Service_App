import { FlatList, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../utils/GlobalApi';
import BusinessListItemSmall from '../Customer/HomeScreen/BusinessListItemSmall';
import Ionicons from '@expo/vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // For responsive sizing
import Heading from '../../app/Components/Heading';
import { useNavigation } from '@react-navigation/native';

export default function AllBusinessListing() {
  const navigation = useNavigation();
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    try {
      const resp = await GlobalApi.getBusinessList();
      setBusinessList(resp?.businessLists || []);
    } catch (error) {
      console.error('Error fetching business list:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", paddingTop: wp(5), alignItems: "center", gap: 4 }}>
        <Ionicons name="arrow-back-outline" size={30} color="black" onPress={() => navigation.goBack()} />
        <Text style={{ fontFamily: "outfit-bold", fontSize: wp(6), textAlign: "center" }}>Our Staff</Text>
      </View>
      <FlatList
        data={businessList}
        keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
        contentContainerStyle={styles.listContent} // Apply responsive content style
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <BusinessListItemSmall business={item} />
          </View>
        )}
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator for cleaner look
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5), // Responsive padding horizontally
    paddingVertical: hp(2), // Responsive padding vertically
    backgroundColor: '#fff', // Clean white background
  },
  listContent: {
    paddingBottom: hp(5), // Padding at the bottom for a smooth scroll
  },
  itemContainer: {
    marginBottom: hp(2), // Margin between list items, responsive
    marginRight: wp(3), // Responsive right margin
    width: wp(90), // Responsive item width
    borderRadius: wp(2), // Responsive border radius
    padding: wp(4), // Responsive padding for each item
    backgroundColor: '#f9f9f9', // Light background for each item
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Elevation for Android shadows
  },
});
