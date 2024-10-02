import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../../utils/GlobalApi';
import Heading from '../../../app/Components/Heading';

export default function Slider() {
  const [slider, setSlider] = useState([]); // Initialize slider state

  // Fetch sliders on component mount
  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    try {
      const resp = await GlobalApi.getSlider();
      setSlider(resp?.sliders || []); // Set sliders or an empty array if undefined
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Section heading */}
      <Heading text="Offers For You" style={styles.heading} />

      {/* Slider with images */}
      <FlatList
        data={slider}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sliderItem}>
            <Image
              source={{ uri: item?.image?.url }}
              style={styles.sliderImage}
            />
          </View>
        )}
        horizontal // Displays images horizontally
        showsHorizontalScrollIndicator={false} // Hides default scrollbar for a clean look
        contentContainerStyle={styles.sliderList} // Adds padding at the start/end of the slider
      />
    </View>
  );
}

// Stylesheet for better layout and visuals
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  heading: {
    fontSize: 22,
    fontFamily: 'outfit-bold', // Ensure you have a suitable bold font loaded
    marginBottom: 15,
    color: '#333', // Darker text color for better readability
    textAlign: 'center',
  },
  sliderList: {
    paddingLeft: 10,
    paddingRight: 20, // Ensure spacing at the end of the list
  },
  sliderItem: {
    marginRight: 15, // Space between each slider item
    alignItems: 'center',
    shadowColor: '#000', // Adds shadow for a card-like effect
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  sliderImage: {
    width: 280, // Slightly wider image
    height: 160,
    borderRadius: 20,
    resizeMode: 'cover', // Ensures images cover their container
  },
});
