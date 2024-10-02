import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Categories from "./Categories";

const HomeScreen = () => {
  return (
    <View>
      <Header />
      <View style={{ padding: 5 }}>
        <Slider />
        <Categories />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
