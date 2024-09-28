import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // Import responsive library
import Color from "../../../utils/Color";
import Entypo from "@expo/vector-icons/Entypo";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../../app/hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession(); // Ensure this completes the auth session.

const CustomerSignIn = () => {
  useWarmUpBrowser(); // Warm up browser for faster OAuth flow.

  const navigation = useNavigation(); // Use navigation hook to navigate after login.

  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const onPress = React.useCallback(async () => {
    try {
      console.log("Starting OAuth flow...");
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        console.log("OAuth success. Session ID:", createdSessionId);

        // Ensure the session is being set properly.
        const setActiveResponse = await setActive({
          session: createdSessionId,
        });
        console.log("SetActive response:", setActiveResponse);

        // Navigate to HomeScreen after successful login
        navigation.navigate("HomeScreen"); // Using navigate instead of push.
      } else {
        console.log("Sign in or sign up needed.");
      }
    } catch (err) {
      console.error("OAuth error:", err);

      // Add more detailed logging to help with debugging.
      if (err.message) {
        console.error("Error message:", err.message);
      }
      if (err.response) {
        console.error("Error response:", err.response);
      }
    }
  }, [startOAuthFlow, navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ paddingTop: hp("2%"), alignItems: "center" }}>
      <Image
        source={require("./../../../assets/customerlogin.jpg")}
        style={styles.image}
      />
      <View style={styles.subContainer}>
        <Text style={styles.headingText}>
          Let's Find{" "}
          <Text style={{ fontWeight: "bold" }}>
            Professional Cleaning and Repair{" "}
          </Text>{" "}
          Service
        </Text>
        <Text style={styles.descriptionText}>
          Best App to find services near you which deliver you a professional
          service
        </Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Entypo name="back" size={wp("6%")} color="#FF5722" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomerSignIn;

const styles = StyleSheet.create({
  image: {
    marginVertical: hp("2%"),
    width: wp("95%"),
    height: hp("45%"),
    borderWidth: 4,
    borderColor: "#3BC7C6",
    borderRadius: 15,
    padding: 10,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Color.PRIMARY,
    height: hp("70%"),
    marginTop: hp("-5%"),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: wp("5%"),
  },
  headingText: {
    fontSize: wp("7%"),
    color: "white",
    textAlign: "center",
  },
  descriptionText: {
    fontSize: wp("4.5%"),
    color: "white",
    textAlign: "center",
    marginTop: hp("2%"),
  },
  button: {
    padding: hp("2.5%"),
    backgroundColor: "white",
    borderRadius: 50,
    marginVertical: hp("5%"),
  },
  buttonText: {
    textAlign: "center",
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: Color.PRIMARY,
  },
  goBackButton: {
    padding: hp("1.5%"),
    width: wp("20%"),
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
  },
});
