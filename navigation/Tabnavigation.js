import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Customer/HomeScreen/HomeScreen";
import BookingScreen from "../screens/Customer/BookingScreen/BookingScreen";
import ProfileScreen from "../screens/Customer/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();
export default function Tabnavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
