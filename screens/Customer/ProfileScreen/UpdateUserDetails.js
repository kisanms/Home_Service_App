import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Color from "../../../utils/Color";
import GlobalApi from "../../../utils/GlobalApi";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function UpdateUserDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userDetail } = route.params;
  const [form, setForm] = useState({
    name: userDetail.name,
    phone: userDetail.phone,
    email: userDetail.email,
    address: userDetail.address,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await GlobalApi.updateUserContactDetail(userDetail.id, form);
      setLoading(false);
      Alert.alert("Success", "Contact updated successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("contact"),
        },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to update contact details");
    }
  };

  return (
    <LinearGradient colors={["#FF8A50", "#FF5722"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Update User Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#fff"
          value={form.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="name-phone-pad"
          placeholderTextColor="#fff"
          value={form.phone}
          onChangeText={(value) => handleInputChange("phone", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#fff"
          value={form.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />

        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Enter your address"
          placeholderTextColor="#fff"
          value={form.address}
          onChangeText={(value) => handleInputChange("address", value)}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>
            {loading ? "Updating..." : "Update"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("3%"),
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    color: "#fff",
    marginBottom: hp("4%"),
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("2%"),
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 1,
    fontSize: wp("4.5%"),
    color: "#fff",
    marginBottom: hp("2%"),
  },
  addressInput: {
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("10%"),
    borderRadius: wp("3%"),
    marginTop: hp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: Color.PRIMARY,
    fontSize: wp("5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
});
