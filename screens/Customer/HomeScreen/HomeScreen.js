import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";

const HomeScreen = () => {
  return (
    <View>
      <Header />
      <View style={{ padding: 20 }}>
        <Slider />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
