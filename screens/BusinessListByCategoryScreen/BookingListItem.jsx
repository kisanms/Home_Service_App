import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Color from "../../utils/Color";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BookingListItem({ business, booking }) {
  // Check if business is null or undefined
  if (!business) {
    return null; // Return null to avoid rendering
  }

  // Function to dynamically set status color based on booking status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Booked":
        return [styles.bookingStatus, styles.booked];
      case "Cancelled":
        return [styles.bookingStatus, styles.cancelled];
      case "Completed":
        return [styles.bookingStatus, styles.completed];
      default:
        return styles.bookingStatus;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: business?.images?.[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
        <Text style={styles.businessName}>{business?.name}</Text>
        {booking?.bookingStatus && (
          <Text style={getStatusStyles(booking.bookingStatus)}>
            {booking.bookingStatus}
          </Text>
        )}
        {booking?.date && booking?.time && (
          <View style={styles.dateTimeContainer}>
            <Ionicons name="calendar" size={wp(6)} color={Color.PRIMARY} style={styles.calendarIcon} />
            <Text style={styles.bookingDateTime}>
              {formatDate(booking.date)} at {booking.time}
            </Text>
          </View>
        )}
      </View>
    </View>
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
  dateTimeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // Align icon and text vertically
  },
  bookingDateTime: {
    fontFamily: "outfit",
    color: "gray",
    fontSize: wp("3.5%"),
  },
  calendarIcon: {
    marginRight: wp("1%"), // Space between icon and text
    borderRadius: wp("1%"), // Rounded background
    padding: wp("1%"), // Padding around the icon
  },
  bookingStatus: {
    fontFamily: "outfit",
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("2%"),
    borderRadius: wp("2%"),
    textAlign: "center",
    overflow: "hidden",
    fontWeight: "bold",
    fontSize: wp("3.5%"),
    width: wp("25%"), // Adjust width for consistent appearance
  },
  // Specific styles for each booking status
  booked: {
    color: "white",
    backgroundColor: "blue",
  },
  cancelled: {
    color: "white",
    backgroundColor: "red",
  },
  completed: {
    color: "white",
    backgroundColor: "green",
  },
});

// Function to format the date
const formatDate = (date) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options).replace(/,/g, '');
};
