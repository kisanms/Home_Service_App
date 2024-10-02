import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Import responsive functions

export default function Heading({ text, isViewAll = false, onViewAllPress }) {
  return (
    <View style={styles.container}>
      {/* Main Heading Text */}
      <Text style={styles.heading}>{text}</Text>

      {/* Optional "View All" button */}
      {isViewAll && (
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1), // Responsive margin at the bottom
    paddingHorizontal: wp(3), // Responsive padding on both sides
  },
  heading: {
    fontSize: hp(2.5), // Responsive font size for heading
    fontFamily: 'outfit-bold', // Ensure this font is bold for emphasis
    color: '#333', // A dark, modern color for text
  },
  viewAllText: {
    fontSize: hp(2), // Responsive font size for "View All"
    fontFamily: 'outfit-medium', // Regular font for "View All"
    color: '#1E90FF', // A nice blue to make "View All" stand out
  },
});
