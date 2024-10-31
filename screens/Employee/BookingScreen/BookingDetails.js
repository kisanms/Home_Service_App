import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons if you haven't

export default function BookingDetails() {
  const navigation = useNavigation();

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
        keyboardType="numeric"
      />

      {/* Show Booking Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Show Booking</Text>
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
    backgroundColor: "#4CAF50",
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
