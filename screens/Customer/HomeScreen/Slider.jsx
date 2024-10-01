import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../../utils/GlobalApi'

export default function Slider() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = () => {
    GlobalApi.getSlider().then(resp => {
      console.log("resp", JSON.stringify(resp, null, 2)); // Log the full response
      setSlider(resp?.sliders);
    }).catch(error => {
      console.error("Error fetching sliders:", error);
    });
  };

  return (
    <View>
      <Text style={styles.heading}>Offers For You</Text>
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
        horizontal={true} // Optional: to display images in a horizontal slider format
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
    marginBottom: 10
  },
  sliderItem: {
    marginRight: 10, // Add some spacing between slider items
    alignItems: 'center'
  },
  sliderImage: {
    width: 270,
    height: 150,
    borderRadius: 20,
    objectFit: "cover"
  }
});
