import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform, // Import Platform to handle different platforms
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { theme } from "../../utils/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function EmployeeSignUp() {
  const { signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });

      await signUp.prepareEmailAddressVerification();
      Alert.alert("Check your email to complete verification.");
    } catch (err) {
      Alert.alert("Error signing up", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }} // Make the KeyboardAvoidingView take the full screen
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on the platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this value based on your layout
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Employee Sign Up
        </Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={[styles.input, { borderColor: theme.colors.borderColor }]}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={[styles.input, { borderColor: theme.colors.borderColor }]}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { borderColor: theme.colors.borderColor }]}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, { borderColor: theme.colors.borderColor }]}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp("5%"),
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: wp("6%"),
    fontFamily: theme.fonts.bold,
    marginBottom: hp("4%"),
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: wp("3%"),
    marginBottom: hp("3%"),
    borderRadius: 10,
    fontFamily: theme.fonts.regular,
    backgroundColor: theme.colors.background,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: wp("3%"),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("2%"),
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
});
