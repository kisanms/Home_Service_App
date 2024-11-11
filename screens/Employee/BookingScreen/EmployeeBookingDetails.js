import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  Pressable,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionType, setActionType] = useState("");

  // Function to get user details based on email
  const getUserDetails = (userEmail) => {
    const userDetails = bookingDetails?.userContactDetails?.find(
      (user) => user.email === userEmail
    );
    return {
      address: userDetails?.address || "No address provided",
      phone: userDetails?.phone || "No phone provided",
    };
  };

  // Show confirmation modal
  const showModal = (action, bookingId) => {
    setSelectedBooking(bookingId);
    setActionType(action);
    setModalVisible(true);
  };

  // Handle confirm action
  const handleConfirmAction = async () => {
    if (actionType === "cancel") {
      await handleCancelBooking(selectedBooking);
    } else if (actionType === "complete") {
      await handleCompleteBooking(selectedBooking);
    }
    setModalVisible(false);
  };

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
            renderItem={({ item: booking }) => {
              const userDetails = getUserDetails(booking.userEmail);
              return (
                <View style={styles.bookingContainer}>
                  <Text style={styles.textLabel}>User:</Text>
                  <Text style={styles.textValue}>{booking.userName}</Text>

                  <Text style={styles.textLabel}>User Email:</Text>
                  <Text style={styles.textValue}>{booking.userEmail}</Text>

                  <Text style={styles.textLabel}>User Mobile No.:</Text>
                  <Text style={styles.textValue}>{userDetails.phone}</Text>

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

                  <Text style={styles.textLabel}>Employee:</Text>
                  <Text style={styles.textValue}>
                    {booking.businessList.contactPerson}
                  </Text>

                  {/* <Text style={styles.textLabel}>Business Address:</Text>
                  <Text style={styles.textValue}>
                    {booking.businessList.address}
                  </Text> */}

                  <Text style={styles.textLabel}>User Address:</Text>
                  <Text style={styles.textValue}>{userDetails.address}</Text>

                  {/* Cancel and Complete Booking Buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.CancelButton]}
                      onPress={() => showModal("cancel", booking.id)}
                    >
                      <Text style={styles.buttonText}>Cancel Booking</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionButton, styles.completeButton]}
                      onPress={() => showModal("complete", booking.id)}
                    >
                      <Text style={styles.buttonText}>Complete Booking</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
      )}

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to{" "}
              {actionType === "cancel" ? "cancel" : "complete"} this booking?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.confirmButton}
                onPress={handleConfirmAction}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#FF5722",
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
    color: "#FF5722",
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
    borderRadius: wp(6),
    borderColor: "#e6e6e6",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  textLabel: {
    fontSize: wp(4),
    color: "#FF5722",
    fontWeight: "600",
    marginBottom: hp(0.3),
  },
  textValue: {
    fontSize: wp(4),
    color: "#333",
    marginBottom: hp(0.8),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: wp(80),
    backgroundColor: "#fff",
    borderRadius: wp(3),
    padding: wp(5),
    alignItems: "center",
  },
  modalText: {
    fontSize: wp(4.5),
    color: "#333",
    textAlign: "center",
    marginBottom: hp(2),
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: wp(3),
    borderRadius: wp(6),
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF5722",
    padding: wp(3),
    borderRadius: wp(6),
    width: "45%",
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: wp(4),
    fontWeight: "bold",
  },
  cancelText: {
    color: "#fff",
    fontSize: wp(4),
    fontWeight: "bold",
  },
  actionButton: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    borderRadius: wp(6),
    alignItems: "center",
  },
  CancelButton: {
    backgroundColor: "#FF5722",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: wp(3.6),
    fontWeight: "bold",
  },
});
