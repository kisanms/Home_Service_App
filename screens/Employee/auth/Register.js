import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // For responsive design
import axios from "axios";
import Color from "../../../utils/Color";

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

  const [gender, setGender] = useState(""); // New state for gender
  const [profileImageURL, setProfileImageURL] = useState("");
  const [profession, setProfession] = useState("");

  const navigation = useNavigation(); // For handling back navigation

  function handleSubmit() {
    // Check if any field is empty
    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !gender ||
      !profileImageURL ||
      !profession
    ) {
      return Alert.alert("Error", "All fields are required!");
    }

    // If all validations pass, create userData object
    const userData = {
      name,
      email,
      mobile,
      password,
      gender,
      profileImage: profileImageURL,
      profession,
    };

    // Make the registration request
    axios
      .post("http://192.168.236.179:5001/register", userData)
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "success") {
          Alert.alert("Registration Successful!", "User has been registered.");
          // Clear input fields after successful registration
          setName("");
          setEmail("");
          setMobile("");
          setPassword("");
          setGender("");
          setProfileImageURL("");
          setProfession("");

          // Navigate to Login screen
          navigation.navigate("login");
        } else {
          Alert.alert("Error", res.data.data || "Registration failed.");
        }
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Error", "Something went wrong. Please try again later.");
      });
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(nameVar.length > 1);
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar));
  }

  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(/[6-9]{1}[0-9]{9}/.test(mobileVar));
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar));
  }

  function handleProfileImageURL(e) {
    const url = e.nativeEvent.text;
    setProfileImageURL(url);
  }

  function handleProfession(e) {
    const professionVar = e.nativeEvent.text;
    setProfession(professionVar);
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
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

            {/* Gender Checkbox */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender:</Text>
              <View style={styles.genderOptionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === "Male" && styles.selectedOption,
                  ]}
                  onPress={() => setGender("Male")}
                >
                  <Text style={styles.genderText}>Male</Text>
                  {gender === "Male" && (
                    <Feather name="check-circle" color="green" size={20} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === "Female" && styles.selectedOption,
                  ]}
                  onPress={() => setGender("Female")}
                >
                  <Text style={styles.genderText}>Female</Text>
                  {gender === "Female" && (
                    <Feather name="check-circle" color="green" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <FontAwesome name="user-o" color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Name"
                style={styles.textInput}
                value={name}
                onChange={(e) => handleName(e)}
                accessibilityLabel="Name"
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
                value={email}
                style={styles.textInput}
                onChange={(e) => handleEmail(e)}
                accessibilityLabel="Email"
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
                value={mobile}
                style={styles.textInput}
                onChange={(e) => handleMobile(e)}
                maxLength={10}
                accessibilityLabel="Mobile"
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

            {/* Profile Image URL Input */}
            <View style={styles.inputContainer}>
              <FontAwesome name="image" color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Profile Image URL"
                value={profileImageURL}
                style={styles.textInput}
                onChange={(e) => handleProfileImageURL(e)}
                accessibilityLabel="Profile Image URL"
              />
            </View>

            {/* Profession Input */}
            <View style={styles.inputContainer}>
              <Feather name="briefcase" color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Profession"
                value={profession}
                style={styles.textInput}
                onChange={(e) => handleProfession(e)}
                accessibilityLabel="Profession"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Password"
                value={password}
                style={styles.textInput}
                onChange={(e) => handlePassword(e)}
                secureTextEntry={!showPassword}
                accessibilityLabel="Password"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Feather name="eye-off" color="#FF5722" size={20} />
                ) : (
                  <Feather name="eye" color="#FF5722" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {password.length > 0 && !passwordVerify && (
              <Text style={styles.errorText}>
                Password must contain uppercase, lowercase, numbers, and be 6 or
                more characters.
              </Text>
            )}

            {/* Register Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {/* Navigation to Login */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // mainContainer: {
  //   flex: 1,
  //   padding: hp("2%"),
  //   alignItems: "center",
  // },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: hp(30),
    width: wp(100),
    resizeMode: "contain",
  },

  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("3%"),
    marginTop: -hp("3%"),
  },
  textHeader: {
    color: "#FF5722",
    fontWeight: "bold",
    fontSize: hp("4%"),
    textAlign: "center",
  },

  imagePicker: {
    marginVertical: hp("2%"),
    borderColor: "#FF5722",
    borderWidth: 1,
    borderRadius: 5,
    padding: hp("1%"),
    alignItems: "center",
  },
  profileImage: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: 15,
  },
  imagePlaceholder: {
    color: "#FF5722",
    fontSize: hp("2%"),
  },
  genderOptionsContainer: {
    flexDirection: "row",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc", // Light gray border
    marginHorizontal: wp("7%"),
  },

  genderText: {
    color: "gray", // Text color
    fontSize: hp("2%"),
    fontFamily: "outfit",
  },
  label: {
    color: Color.PRIMARY,
    fontSize: hp("2%"),
    fontFamily: "outfit",
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

  button: {
    backgroundColor: "#FF5722",
    padding: hp("2%"),
    borderRadius: 5,
    marginVertical: hp("2%"),
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("2%"),
  },
  footerText: {
    fontSize: hp("2%"),
  },
  footerLink: {
    color: "#FF5722",
    fontWeight: "bold",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    fontSize: hp("2%"),
  },
  successText: {
    color: "green",
    fontSize: hp("2%"),
  },
});
