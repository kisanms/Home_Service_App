import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import Color from "../../../utils/Color";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function EmpProfileScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    address: "",
    about: "",
    category: "",
    email: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("YOUR_HYGRAPH_ENDPOINT", formData);
      console.log("Data submitted successfully:", response.data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()} // Navigates back on press
      >
        <FontAwesome name="arrow-left" size={wp(8)} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Employee Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Person"
        value={formData.contactPerson}
        onChangeText={(value) => handleInputChange("contactPerson", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(value) => handleInputChange("address", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="About"
        value={formData.about}
        onChangeText={(value) => handleInputChange("about", value)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={formData.category}
        onChangeText={(value) => handleInputChange("category", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp("5%"),
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  backArrow: {
    position: "absolute",
    top: Platform.OS === "ios" ? hp(5) : hp(3), // Adjust for iOS/Android
    left: wp(5),
    zIndex: 1, // Ensures it's on top of other elements
    paddingTop: 20,
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    color: Color.PRIMARY,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: wp("3%"),
    marginBottom: hp("2%"),
    fontSize: wp("4%"),
  },
  button: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: hp("2%"),
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
});
