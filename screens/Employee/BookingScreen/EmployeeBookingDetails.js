import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GlobalApi from "../../../utils/GlobalApi";

export default function EmployeeBookingDetails({ route }) {
  const navigation = useNavigation();
  const { bookingDetails } = route.params;
  const [bookings, setBookings] = useState(bookingDetails?.bookings || []);

  // Handle cancel booking
  const handleCancelBooking = async (data) => {
    try {
      await GlobalApi.cancelBooking(data);
      const updatedBookings = bookings.map((item) =>
        item.id === data ? { ...item, bookingStatus: "Cancelled" } : item
      );
      setBookings(updatedBookings);
      alert("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  // Handle complete booking
  const handleCompleteBooking = async (data) => {
    try {
      await GlobalApi.completeBooking(data);
      const updatedBookings = bookings.map((item) =>
        item.id === data ? { ...item, bookingStatus: "Completed" } : item
      );
      setBookings(updatedBookings);
      alert("Booking marked as completed!");
    } catch (error) {
      console.error("Error completing booking:", error);
      alert("Failed to mark booking as completed.");
    }
  };
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={wp(8)} color="#fff" />
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
                <Text style={styles.textLabel}>User:</Text>
                <Text style={styles.textValue}>{booking.userName}</Text>

                <Text style={styles.textLabel}>Status:</Text>
                <Text style={styles.textValue}>{booking.bookingStatus}</Text>

                <Text style={styles.textLabel}>Date:</Text>
                <Text style={styles.textValue}>{booking.date}</Text>

                <Text style={styles.textLabel}>Time:</Text>
                <Text style={styles.textValue}>{booking.time}</Text>

                <Text style={styles.textLabel}>Business Name:</Text>
                <Text style={styles.textValue}>
                  {booking.businessList.name}
                </Text>

                <Text style={styles.textLabel}>Contact:</Text>
                <Text style={styles.textValue}>
                  {booking.businessList.contactPerson}
                </Text>
                {/* Cancel and Complete Booking Buttons */}
                <View style={styles.buttonContainer}>
                  <Button
                    title="Cancel Booking"
                    color="#FF5722"
                    onPress={() => handleCancelBooking(booking.id)}
                  />
                  <Button
                    title="Complete Booking"
                    color="#4CAF50"
                    onPress={() => handleCompleteBooking(booking.id)}
                  />
                </View>
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
    backgroundColor: "#f0f4f8",
    paddingTop: hp(4),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    backgroundColor: "#FF5722", // Updated header color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
  backButton: {
    padding: wp(2),
    marginRight: wp(3),
  },
  headerText: {
    fontFamily: "outfit-bold",
    fontSize: wp(5.5),
    color: "#fff",
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
    color: "#FF5722", // Updated color for the no booking message
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
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  textLabel: {
    fontSize: wp(4),
    color: "#FF5722", // Updated label color
    fontWeight: "600",
    marginBottom: hp(0.3),
  },
  textValue: {
    fontSize: wp(4),
    color: "#333",
    marginBottom: hp(0.8),
  },
});
