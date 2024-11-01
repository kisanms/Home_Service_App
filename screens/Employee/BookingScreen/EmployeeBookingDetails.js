import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function EmployeeBookingDetails({ route }) {
  const navigation = useNavigation();
  const { bookingDetails } = route.params;

  if (
    !bookingDetails ||
    !bookingDetails.bookings ||
    bookingDetails.bookings.length === 0
  ) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={wp(8)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.noBookingText}>
          No booking available for you at this time.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome name="arrow-left" size={wp(8)} color="#000" />
      </TouchableOpacity>
      <FlatList
        data={bookingDetails.bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item: booking }) => (
          <View style={styles.bookingContainer}>
            <Text style={styles.text}>User: {booking.userName}</Text>
            <Text style={styles.text}>Status: {booking.bookingStatus}</Text>
            <Text style={styles.text}>Date: {booking.date}</Text>
            <Text style={styles.text}>Time: {booking.time}</Text>
            <Text style={styles.text}>
              Business Name: {booking.businessList.name}
            </Text>
            <Text style={styles.text}>
              Contact: {booking.businessList.contactPerson}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: hp(5) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: hp(4),
    left: wp(4),
    padding: wp(2),
  },
  noBookingText: {
    fontFamily: "outfit-bold",
    fontSize: wp(5),
    color: "#555",
    textAlign: "center",
    marginTop: hp("50%"),
  },
  bookingContainer: {
    width: "100%",
    marginTop: hp(8),
    marginBottom: hp(2),
    padding: wp(4),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: wp(4),
    color: "#333",
    marginBottom: hp(0.5),
  },
});
