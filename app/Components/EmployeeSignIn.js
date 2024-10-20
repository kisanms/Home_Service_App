import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { theme } from "../../utils/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function EmployeeSignIn() {
  const { signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Use useNavigation hook

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        Alert.alert("Signed in successfully");
        navigation.navigate("EmployeeHomeScreen"); // Navigate to EmployeeHomeScreen
      } else {
        Alert.alert("Error signing in", "Check your credentials");
      }
    } catch (err) {
      Alert.alert("Error signing in", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Employee Sign In
        </Text>
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
        <Button
          title="Sign In"
          onPress={handleSignIn}
          disabled={loading}
          color={theme.colors.primary}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp("5%"), // Responsive padding
  },
  title: {
    fontSize: wp("6%"), // Responsive font size
    fontFamily: theme.fonts.bold,
    marginBottom: hp("3%"), // Responsive margin
  },
  input: {
    borderWidth: 1,
    padding: wp("3%"), // Responsive padding
    marginBottom: hp("3%"), // Responsive margin
    borderRadius: 5,
    fontFamily: theme.fonts.regular,
    backgroundColor: theme.colors.background,
  },
});
