import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import Color from "../../../utils/Color";
import Entypo from "@expo/vector-icons/Entypo";

const CustomerSignIn = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={{ paddingTop: 20, alignItems: "center" }}>
      <Image
        source={require("./../../../assets/customerlogin.jpg")}
        style={{
          marginVertical: 20,
          width: "95%",
          height: 450,
          borderWidth: 4,
          borderColor: "#3BC7C6",
          borderRadius: 15,
          padding: 10,
        }}
      />
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 27, color: "white", textAlign: "center" }}>
          Let's Find{" "}
          <Text style={{ fontWeight: "bold" }}>
            Professional Cleaning and Repair{" "}
          </Text>{" "}
          Service
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "white",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Best App to find services near you which deliver you a professional
          service
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: Color.PRIMARY,
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>

        {/* Go Back Button */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Entypo name="back" size={24} color="#FF5722" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomerSignIn;

const styles = StyleSheet.create({
  subContainer: {
    width: "100%",
    backgroundColor: Color.PRIMARY,
    height: "70%",
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 50,
    marginVertical: 40,
  },
  goBackButton: {
    padding: 15,
    width: 80,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
  },
});
