import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // For responsive design

export default function Register() {
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [secretText, setSecretText] = useState("");

  const navigation = useNavigation(); // For handling back navigation

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }
  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }
  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/[6-9]{1}[0-9]{9}/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.mainContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../assets/images/register.jpg")}
            />
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.textHeader}>Register !!!</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <FontAwesome name="user-o" color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Name"
                style={styles.textInput}
                onChange={(e) => handleName(e)}
              />
              {name.length < 1 ? null : nameVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Feather name="x-circle" color="red" size={20} />
              )}
            </View>
            {name.length < 1 ? null : nameVerify ? null : (
              <Text style={styles.errorText}>
                Name should be more than 1 character.
              </Text>
            )}

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Fontisto name="email" color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChange={(e) => handleEmail(e)}
              />
              {email.length > 0 &&
                (emailVerify ? (
                  <Feather name="check-circle" color="green" size={20} />
                ) : (
                  <Feather name="x-circle" color="red" size={20} />
                ))}
            </View>
            {email.length > 0 && !emailVerify && (
              <Text style={styles.errorText}>Enter a valid email address.</Text>
            )}

            {/* Mobile Input */}
            <View style={styles.inputContainer}>
              <FontAwesome
                name="mobile"
                color="#FF5722"
                size={30}
                style={styles.icon}
              />
              <TextInput
                placeholder="Mobile"
                style={styles.textInput}
                onChange={(e) => handleMobile(e)}
                maxLength={10}
              />
              {mobile.length > 0 &&
                (mobileVerify ? (
                  <Feather name="check-circle" color="green" size={20} />
                ) : (
                  <Feather name="x-circle" color="red" size={20} />
                ))}
            </View>
            {mobile.length > 0 && !mobileVerify && (
              <Text style={styles.errorText}>Mobile number must be valid.</Text>
            )}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChange={(e) => handlePassword(e)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  color={passwordVerify ? "green" : "red"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            {password.length > 0 && !passwordVerify && (
              <Text style={styles.errorText}>
                Password must contain uppercase, lowercase, numbers, and be 6 or
                more characters.
              </Text>
            )}
          </View>

          {/* Register Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.registerContainer}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.notEmployeeText}>
                Already an employee{" "}
                <Text style={styles.registerText}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // backIconContainer: {
  //   position: "absolute",
  //   top: hp("5%"),
  //   left: wp("5%"),
  //   zIndex: 1,
  // },
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: hp(48),
    width: wp(100),
    resizeMode: "contain",
    borderRadius: wp(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("5%"),
    marginTop: -hp("5%"),
    marginBottom: -hp("2%"),
  },
  textHeader: {
    color: "#FF5722",
    fontWeight: "bold",
    fontSize: hp("4%"),
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    paddingTop: hp("1%"),
    paddingBottom: hp("1%"),
    marginTop: hp("2%"),
    paddingHorizontal: wp("5%"),
    borderWidth: 1,
    borderColor: "#FF5722",
    borderRadius: 50,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: "#05375a",
    fontFamily: "outfit",
  },
  icon: {
    marginRight: wp("3%"),
    fontSize: wp("6%"),
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: hp("1.3%"),
  },
  button: {
    width: wp("70%"),
    backgroundColor: "#FF5722",
    alignItems: "center",
    paddingVertical: hp("2%"),
    borderRadius: 50,
  },
  buttonText: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: "white",
    fontFamily: "outfit",
  },
  errorText: {
    marginLeft: wp("5%"),
    color: "red",
    fontSize: wp("3.5%"),
    marginTop: hp("1%"),
  },
  bottomButtonContainer: {
    alignItems: "center",
  },
  registerContainer: {
    marginVertical: hp(1),
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
