import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function EmployeeBookingDetails({ route }) {
  const navigation = useNavigation();
  const { bookingDetails } = route.params;
  const [bookings] = useState(bookingDetails?.bookings || []);

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={wp(8)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Booking Details</Text>
      </View>

      {/* No bookings available */}
      {!bookings || bookings.length === 0 ? (
        <ScrollView contentContainerStyle={styles.noBookingContainer}>
          <Text style={styles.noBookingText}>
            No booking available for you at this time.
          </Text>
        </ScrollView>
      ) : (
        // Bookings List
        <View style={styles.listContainer}>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
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
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: hp(4),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  backButton: {
    padding: wp(2),
    marginRight: wp(3),
  },
  headerText: {
    fontFamily: "outfit-bold",
    fontSize: wp(6.5),
    color: "#333",
  },
  noBookingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: wp(5),
  },
  noBookingText: {
    fontFamily: "outfit-bold",
    fontSize: wp(5),
    color: "#555",
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
    marginTop: hp(2),
    paddingHorizontal: wp(5),
  },
  listContentContainer: {
    paddingBottom: hp(5),
  },
  bookingContainer: {
    marginBottom: hp(2),
    padding: wp(4),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: wp(4),
    color: "#333",
    marginBottom: hp(0.5),
  },
});
