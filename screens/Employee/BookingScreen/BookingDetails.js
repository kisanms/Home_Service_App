import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GlobalApi from "../../../utils/GlobalApi";
import Color from "../../../utils/Color";
// Adjust path based on your file structure

export default function BookingDetails() {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleShowBooking = async () => {
    if (!employeeId) {
      Alert.alert("Error", "Please enter Employee ID.");
      return;
    }

    setLoading(true);
    try {
      // Make the API call to get bookings related to this employee's business list
      const response = await GlobalApi.getEmployeeBookings({ id: employeeId });
      Alert.alert("Success", "Booking details retrieved.");

      // Navigate to BookingDetailsScreen and pass the response data
      navigation.navigate("empbookingdetail", {
        bookingDetails: response,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve booking details.");
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome name="arrow-left" size={wp(8)} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Booking Details</Text>

      {/* Employee ID Input */}
      <TextInput
        placeholder="Employee ID"
        placeholderTextColor="#888"
        style={styles.input}
        keyboardType="numbers-and-punctuation"
        value={employeeId}
        onChangeText={setEmployeeId}
      />

      {/* Show Booking Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleShowBooking}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Show Booking"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? hp(5) : hp(4),
    left: wp(4),
    zIndex: 1,
    padding: wp(2),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "90%",
    backgroundColor: Color.PRIMARY,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
