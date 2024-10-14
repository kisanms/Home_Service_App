import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import loginImage from "./assets/loginPortalImage.jpg";
import Icon from "./assets/icon.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Threeplatform() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: wp("1%"),
            alignItems: "center",
          }}
        >
          <Image
            source={Icon}
            style={{ width: wp("13%"), height: wp("13%"), borderRadius: 50 }}
          />
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: wp("5%"),
            }}
          >
            Home Service App
          </Text>
        </View>
      </View>
      <Image source={loginImage} style={styles.loginImage} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CustomerSignIn")}
      >
        <Text style={styles.buttonText}>Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginBottom: wp(15) }]}>
        <Text style={styles.buttonText}>Employee</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#FF5722",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("3%"),
    borderColor: "#FFFFFF",
    borderWidth: 3,
    marginVertical: hp("1.5%"),
    width: wp("80%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: wp("4.5%"),
    fontWeight: "bold",
  },
  loginImage: {
    width: wp("80%"),
    height: hp("45%"),
    aspectRatio: 1.5,
    resizeMode: "contain",
    marginBottom: hp("3%"),
    borderRadius: wp("4%"),
  },
});
