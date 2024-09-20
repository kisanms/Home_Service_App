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

export default function Threeplatform() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", marginTop: 90 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Image
            source={Icon}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            Home Service App
          </Text>
        </View>
      </View>
      <Image source={loginImage} style={styles.loginImage} />

      {/* SignedOut Section */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CustomerSignIn")}
      >
        <Text style={styles.buttonText}>Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Employee</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
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
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginImage: {
    width: "80%",
    height: 400,
    aspectRatio: 1.5,
    resizeMode: "contain",
    marginBottom: 25,
    borderRadius: 15,
  },
});
