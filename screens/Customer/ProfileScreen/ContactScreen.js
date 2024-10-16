import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.contactText}>Contact Us</Text>
      {/* Add more content here, like a form or contact details */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  contactText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
