import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export default function LoginPage() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Back Arrow Icon */}
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()} // Navigates back on press
        >
          <FontAwesome name="arrow-left" size={wp(8)} color="#000" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/login2.jpg")}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login !!!</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#FF5722"
              style={styles.smallIcon}
            />
            <TextInput placeholder="Mobile or Email" style={styles.textInput} />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#FF5722" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.inBut}>
            <Text style={styles.textSign}>Log in</Text>
          </TouchableOpacity>

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.registerContainer}
              onPress={() => navigation.navigate("register")}
            >
              <Text style={styles.notEmployeeText}>
                Not an employee{" "}
                <Text style={styles.registerText}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  backArrow: {
    position: "absolute",
    top: Platform.OS === "ios" ? hp(5) : hp(3), // Adjust for iOS/Android
    left: wp(5),
    zIndex: 1, // Ensures it's on top of other elements
    paddingTop: 20,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(5),
  },
  logo: {
    height: hp(40),
    width: wp(80),
    resizeMode: "contain",
    borderRadius: wp(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text_header: {
    color: "#FF5722",
    fontWeight: "bold",
    fontSize: wp(8),
    textAlign: "center",
  },
  loginContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    paddingHorizontal: wp(5),
    paddingVertical: hp(4),
    marginTop: -hp(3),
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF5722",
    borderRadius: 50,
    paddingHorizontal: wp(5),
    paddingVertical: Platform.OS === "ios" ? hp(2) : hp(1.5),
    marginTop: hp(2),
  },
  textInput: {
    flex: 1,
    color: "#05375a",
    fontSize: wp(4),
  },
  smallIcon: {
    marginRight: wp(3),
    fontSize: wp(6),
  },
  forgotPasswordContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: hp(1),
    marginRight: wp(2),
  },
  forgotPasswordText: {
    color: "#FF5722",
    fontWeight: "700",
    fontSize: wp(4),
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: hp(2),
  },
  inBut: {
    width: wp(70),
    backgroundColor: "#FF5722",
    alignItems: "center",
    paddingVertical: hp(2),
    borderRadius: 50,
  },
  textSign: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "white",
  },
  bottomButtonContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  registerContainer: {
    marginVertical: hp(2),
  },
  notEmployeeText: {
    fontSize: wp(4),
    color: "#919191",
    fontWeight: "bold",
  },
  registerText: {
    color: "#0000FF",
    fontWeight: "bold",
  },
});
