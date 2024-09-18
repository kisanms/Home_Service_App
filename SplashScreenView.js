import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "./assets/icon.png";
import React from "react";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.image} />
      <Text style={styles.text}>Home Service App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
});
