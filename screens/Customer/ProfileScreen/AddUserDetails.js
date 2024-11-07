import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
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
import { useNavigation } from "@react-navigation/native";
// Make sure this path is correct for your project

export default function AddUserDetails() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await GlobalApi.createUserContactDetail(form);
      setLoading(false);
      showSuccessModal(); // Show success modal after data is submitted and published
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to submit details, please try again.");
    }
  };

  const showSuccessModal = () => {
    setIsModalVisible(true);
  };

  const hideSuccessModal = () => {
    setIsModalVisible(false);

    navigation.navigate("contact"); // Optionally, navigate to another screen or reset form fields here
  };

  return (
    <LinearGradient colors={["#FF8A50", "#FF5722"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Add User Details</Text>

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
          placeholder="Enter your login email please"
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideSuccessModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Success</Text>
            <Text style={styles.modalText}>
              Your details have been successfully submitted and published.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={hideSuccessModal}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: wp("80%"),
    padding: hp("4%"),
    backgroundColor: "white",
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  modalHeading: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: Color.PRIMARY,
    marginBottom: hp("2%"),
  },
  modalText: {
    fontSize: wp("4%"),
    color: "#333",
    marginBottom: hp("3%"),
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("10%"),
    borderRadius: wp("3%"),
  },
  modalButtonText: {
    color: "white",
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
});
