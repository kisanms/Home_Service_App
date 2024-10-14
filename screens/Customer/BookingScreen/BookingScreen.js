import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PageHeading from "../../../app/Components/PageHeading ";

export default function BookingScreen() {
  return (
    <View style={{ paddingTop: 40, padding: 10 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 26 }}>
        My Bookings
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
