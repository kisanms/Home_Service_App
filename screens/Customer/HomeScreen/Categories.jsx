import { FlatList, Image, StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../../utils/GlobalApi';
import Heading from '../../../app/Components/Heading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Responsive library

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const { width } = Dimensions.get('window'); // Get the device's screen width

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const resp = await GlobalApi.getCategories();
      setCategories(resp?.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Heading with "View All" button */}
      <Heading text={'Categories'} isViewAll={true} />

      {/* Horizontal scrolling categories */}
      <FlatList
        data={categories}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.iconContainer}>
            <Image source={{ uri: item?.icon?.url }} style={[styles.categoryIcon, { width: wp('10%'), height: wp('10%') }]} />
          </View>
        )}
        // horizontal
        // showsHorizontalScrollIndicator={false} // Hides default scrollbar
        contentContainerStyle={styles.categoriesList} // Style for padding around the list
      />
    </View>
  );
}

// Enhanced responsive styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('2%'), // Responsive vertical padding
  },
  categoriesList: {
    paddingHorizontal: wp('3%'), // Padding around the categories list
  },
  iconContainer: {
    backgroundColor: '#EDEDED', // White background for the category icon
    padding: wp('4.5%'), // Responsive padding
    marginRight: wp('4%'), // Responsive margin
    borderRadius: wp('12%'), // Rounding for a circular effect based on screen width
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    resizeMode: 'contain', // Ensure the icon maintains its aspect ratio
  },
});
