import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // For navigation
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Color from "../../../utils/Color";

export default function ContactScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Contact Details</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("adduserdetails")} // Navigate to the add user details page
      >
        <Text style={styles.buttonText}>Add User Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background for modern look
    padding: wp("5%"),
    alignItems: "center",
  },
  heading: {
    fontSize: wp("7%"),
    fontFamily: "outfit-bold",
    color: "#333",
    marginTop: hp("4%"),
    marginBottom: hp("2%"),
    textAlign: "center",
  },
  button: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: hp(1),
    width: wp("100%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontFamily: "outfit-bold",
    color: "#fff",
    fontSize: wp("4.5%"),
    textAlign: "center",
  },
});
