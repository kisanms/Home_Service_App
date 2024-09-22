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
WebBrowser.maybeCompleteAuthSession();

const CustomerSignIn = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        //Use signIn or signUp for nxt steps
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  const navigation = useNavigation();

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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={onPress}>
            Let's Get Started
          </Text>
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
