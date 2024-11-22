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
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddUserDetails() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Check each field
    if (!form.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.phone.trim()) {
      tempErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!form.address.trim()) {
      tempErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const response = await GlobalApi.createUserContactDetail(form);
      setLoading(false);
      showSuccessModal();
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
    navigation.navigate("contact");
  };

  return (
    <LinearGradient colors={["#FF8A50", "#FF5722"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Ionicons name="arrow-back-outline" size={wp("7%")} color="white" />
        <Text style={styles.heading}>Add User Details</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Enter your name"
            placeholderTextColor="#fff"
            value={form.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            placeholderTextColor="#fff"
            value={form.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your login email please"
            keyboardType="email-address"
            placeholderTextColor="#fff"
            value={form.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              styles.addressInput,
              errors.address && styles.inputError,
            ]}
            placeholder="Enter your address"
            placeholderTextColor="#fff"
            value={form.address}
            onChangeText={(value) => handleInputChange("address", value)}
            multiline={true}
            numberOfLines={4}
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
  inputContainer: {
    width: "100%",
    marginBottom: hp("2%"),
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
  },
  inputError: {
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  errorText: {
    color: "#FFD700",
    fontSize: wp("3.5%"),
    marginTop: hp("0.5%"),
    marginLeft: wp("1%"),
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
