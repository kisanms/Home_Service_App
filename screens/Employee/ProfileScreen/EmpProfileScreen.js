// EmpProfileScreen.js

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Color from "../../../utils/Color";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../../../utils/GlobalApi";

export default function EmpProfileScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    address: "",
    about: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.contactPerson ||
      !formData.address ||
      !formData.about ||
      !formData.email
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const resp = await GlobalApi.createBusinessList({
        ...formData,
      });
      Alert.alert("Success", "Business profile created as draft.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to create business profile.");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="arrow-left" size={wp(8)} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Employee Profile</Text>

          <TextInput
            style={styles.input}
            placeholder="Business Name"
            placeholderTextColor="#aaa"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Contact Person"
            placeholderTextColor="#aaa"
            value={formData.contactPerson}
            onChangeText={(value) => handleInputChange("contactPerson", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#aaa"
            value={formData.address}
            onChangeText={(value) => handleInputChange("address", value)}
          />

          <TextInput
            style={[styles.input, { height: hp(15) }]}
            placeholder="About"
            placeholderTextColor="#aaa"
            multiline
            textAlignVertical="top"
            value={formData.about}
            onChangeText={(value) => handleInputChange("about", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp("5%"),
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? hp(5) : hp(2),
  },
  backArrow: {
    position: "absolute",
    top: Platform.OS === "ios" ? hp(5) : hp(2),
    left: wp(4),
    zIndex: 1,
    padding: wp(2),
  },
  title: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    marginBottom: hp("4%"),
    color: Color.PRIMARY,
    textAlign: "center",
    marginTop: hp(5),
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: wp("4%"),
    marginBottom: hp("2%"),
    fontSize: wp("4%"),
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: hp("2%"),
    borderRadius: 8,
    alignItems: "center",
    marginTop: hp("3%"),
    marginBottom: hp("2%"),
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
  },
});
