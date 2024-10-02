import { FlatList, Image, StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../../utils/GlobalApi';
import Heading from '../../../app/Components/Heading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Responsive library

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to toggle "View All"
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

  // Handler to toggle the display of categories
  const toggleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <View style={{ marginTop: 1 }}>
      {/* Heading with "View All" button */}
      <View style={styles.headingContainer}>
        <Heading text={'Categories'} />
        <TouchableOpacity onPress={toggleViewAll}>
          <Text style={styles.viewAllText}>{showAll ? "Show Less" : "View All"}</Text>
        </TouchableOpacity>
      </View>

      {/* Category list */}
      <FlatList
        data={categories}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          // Only show first 4 items if 'showAll' is false, otherwise show all items
          (showAll || index <= 3) && (
            <View style={styles.container}>
              <View style={styles.iconContainer}>
                <Image source={{ uri: item?.icon?.url }} style={{ width: hp(4.5), height: hp(4.5) }} />
              </View>
              <Text style={{ fontFamily: "outfit-medium", marginTop: 2 }}>{item?.name}</Text>
            </View>
          )
        )}
      />
    </View>
  );
}

// Enhanced responsive styles
const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  viewAllText: {
    color: '#007BFF', // Color for the View All text
    fontSize: hp(2), // Responsive font size
    fontFamily: 'outfit-medium',
  },
  iconContainer: {
    backgroundColor: "#EDEDED",
    padding: wp(4),
    borderRadius: 99,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
