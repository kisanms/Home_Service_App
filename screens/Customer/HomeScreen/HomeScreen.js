import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Categories from "./Categories";
import BusinessList from "./BusinessList";

const HomeScreen = () => {
  return (
    <View>
      <Header />
      <View style={{ padding: 10 }}>
        <Slider />
        <Categories />
        <BusinessList />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
