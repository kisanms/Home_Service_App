import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function SubmittedDataScreen() {
  const route = useRoute();
  const { submittedData } = route.params || {}; // Get the submitted data from navigation params

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Submitted Data</Text>
      {submittedData ? (
        <View style={styles.dataContainer}>
          <View style={styles.card}>
            <Text style={styles.label}>Business Name:</Text>
            <Text style={styles.value}>{submittedData.name}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Contact Person:</Text>
            <Text style={styles.value}>{submittedData.contactPerson}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{submittedData.address}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>About:</Text>
            <Text style={styles.value}>{submittedData.about}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{submittedData.email}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>No submitted data found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
    textAlign: "center",
  },
  dataContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
  },
  value: {
    fontSize: 18,
    color: "#212529",
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: "#dc3545",
    textAlign: "center",
  },
});
