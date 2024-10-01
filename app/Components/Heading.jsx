import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

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
    marginBottom: 15, // Adds some spacing at the bottom
    paddingHorizontal: 10, // Adds padding on both sides
  },
  heading: {
    fontSize: 22,
    fontFamily: 'outfit-bold', // Ensure this font is bold for emphasis
    color: '#333', // A dark, modern color for text
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'outfit-medium', // Regular font for "View All"
    color: '#1E90FF', // A nice blue to make "View All" stand out
    textDecorationLine: 'underline', // Underline to emphasize it's clickable
  },
});
