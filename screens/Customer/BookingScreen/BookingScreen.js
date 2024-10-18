import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ToastAndroid, // Import ToastAndroid
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../../utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BookingListItem from "../../BusinessListByCategoryScreen/BookingListItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../../../utils/Color";

const { width } = Dimensions.get("window");

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 0, note: "" });
  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false);

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setBookingList(resp?.bookings || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  };

  const openFeedbackModal = (booking) => {
    setSelectedBooking(booking);
    setFeedback({
      rating: booking?.feedback?.rating || 0,
      note: booking?.feedback?.note || "",
    });
    setFeedbackModalVisible(true);
  };

  const handleStarPress = (rating) => {
    setFeedback({ ...feedback, rating });
  };

  const submitFeedback = () => {
    if (!selectedBooking) return;

    // Prepare feedback data
    const feedbackData = {
      rating: feedback.rating,
      note: feedback.note,
      bookingId: selectedBooking.id,
      userId: user?.id,
    };

    // Call the API to submit feedback
    GlobalApi.submitFeedback(feedbackData)
      .then(() => {
        // Update local booking list with new feedback
        const updatedBookings = bookingList.map((item) =>
          item.id === selectedBooking.id ? { ...item, feedback } : item
        );
        setBookingList(updatedBookings);
        setFeedbackModalVisible(false);

        // Show a success toast
        ToastAndroid.show("Feedback submitted!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookingList}
        onRefresh={() => getUserBookings()}
        refreshing={loading}
        renderItem={({ item }) => {
          if (!item?.businessList) return null;
          return (
            <TouchableOpacity onPress={() => openFeedbackModal(item)}>
              <BookingListItem
                business={item?.businessList}
                booking={{
                  id: item.id,
                  bookingStatus: item.bookingStatus,
                  time: item.time,
                  date: item.date,
                }}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Feedback Modal */}
      <Modal
        transparent={true}
        visible={isFeedbackModalVisible}
        animationType="slide"
        onRequestClose={() => setFeedbackModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Give Feedback</Text>

            {/* Star Rating */}
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                >
                  <Ionicons
                    name={star <= feedback.rating ? "star" : "star-outline"}
                    size={wp("8%")}
                    color={star <= feedback.rating ? "#ffd700" : "#cccccc"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Note Section */}
            <TextInput
              style={styles.noteInput}
              placeholder="Write your feedback..."
              value={feedback.note}
              onChangeText={(text) => setFeedback({ ...feedback, note: text })}
              multiline
            />

            {/* Submit and Cancel Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={submitFeedback}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "gray" }]}
                onPress={() => setFeedbackModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
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
    paddingTop: hp("4%"),
    paddingHorizontal: wp("3%"),
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: wp("6.5%"),
    marginBottom: hp("2%"),
  },
  flatListContent: {
    paddingBottom: hp("5%"),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: hp("3%"),
    marginHorizontal: wp("5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  modalHeading: {
    fontSize: wp("6%"),
    marginBottom: hp("2%"),
    fontFamily: "outfit-bold",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: hp("2%"),
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: hp("1.5%"),
    borderRadius: wp("2%"),
    marginBottom: hp("2%"),
    fontSize: wp("4%"),
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: Color.PRIMARY,
    padding: hp("1.5%"),
    borderRadius: wp("2%"),
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: wp("4.5%"),
    fontWeight: "600",
  },
});
