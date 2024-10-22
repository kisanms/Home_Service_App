import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { height } = Dimensions.get("window");

export default function LoginPage() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/login2.jpg")}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.text_header}>Login !!!</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#FF5722" style={styles.smallIcon} />
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

        <Text style={styles.orText}>----Or Continue as----</Text>

        <View style={styles.bottomButtonContainer}>
          {[
            { name: "Sign Up", icon: "user-plus", onPress: () => {} },
            {
              name: "Google",
              icon: "google",
              onPress: () => alert("Coming Soon"),
            },
            {
              name: "Facebook",
              icon: "facebook-f",
              onPress: () => alert("Coming Soon"),
            },
          ].map((item, index) => (
            <View key={index} style={styles.bottomButtonItem}>
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome
                  name={item.icon}
                  color="white"
                  style={styles.smallIcon2}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(5),
  },
  logo: {
    height: hp(30),
    width: wp(60),
    resizeMode: "contain",
    borderRadius: wp(5), // Adding some border radius for softer edges
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // Adding shadow to give it depth
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
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
  orText: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#919191",
    marginVertical: hp(2),
  },
  bottomButtonContainer: {
    width: wp(90),
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(2),
  },
  bottomButtonItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  inBut2: {
    backgroundColor: "#FF5722",
    height: wp(16),
    width: wp(16),
    borderRadius: wp(4),
    justifyContent: "center",
    alignItems: "center",
  },
  smallIcon2: {
    fontSize: wp(7),
  },
  bottomText: {
    color: "black",
    fontSize: wp(3.5),
    fontWeight: "600",
    marginTop: hp(1),
  },
});
