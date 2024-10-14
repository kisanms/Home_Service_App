import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../../utils/Color";
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItem({ business, booking }) {
  const navigation = useNavigation();

  // Check if business is null or undefined
  if (!business) {
    return null; // Return null to avoid rendering
  }

  // Format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits for day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits for month, months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("business-detail", {
          business,
        })
      }
    >
      <Image source={{ uri: business?.images?.[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
        <Text style={styles.businessName}>{business?.name}</Text>

        {/* Render bookingStatus, time, and date */}
        {booking?.bookingStatus && (
          <Text style={styles.bookingStatus}>{booking.bookingStatus}</Text>
        )}
        {booking?.date && booking?.time && (
          <Text style={styles.bookingDateTime}>
            {formatDate(booking.date)} at {booking.time}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("3%"),
  },
  container: {
    padding: wp("3%"),
    backgroundColor: "white",
    borderRadius: wp("3%"),
    marginBottom: hp("2%"),
    flexDirection: "row",
    gap: wp("3%"),
  },
  subContainer: {
    flex: 1,
    gap: hp("1.5%"),
  },
  contactPerson: {
    fontFamily: "outfit",
    color: "gray",
    fontSize: wp("3.7%"),
  },
  businessName: {
    fontFamily: "outfit-bold",
    fontSize: wp("4.5%"),
  },
  bookingStatus: {
    fontFamily: "outfit-bold", // Make the font bold for emphasis
    color: Color.PRIMARY, // Primary color for the text
    backgroundColor: Color.PRIMARY_LIGHT, // Light background to contrast with the text
    fontSize: wp("3.5%"), // Responsive font size
    paddingVertical: hp("0.5%"), // Vertical padding for better spacing
    paddingHorizontal: wp("3%"), // Horizontal padding to create space around the text
    borderRadius: wp("2%"), // Rounded corners for a more elegant look
    borderColor: Color.PRIMARY, // Adding a border of the same color
    borderWidth: 1, // Define the width of the border
    textAlign: "center", // Center the text within the element
    alignSelf: "flex-start", // Align the status to the start of the container

  },
  bookingDateTime: {
    fontFamily: "outfit",
    fontSize: wp("3.5%"), // Same font size for consistency
    color: "gray",
  },
});
