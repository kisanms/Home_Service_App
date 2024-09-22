import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Threeplatform from "../threeplatformbutton";
import CustomerSignIn from "../screens/Customer/LoginScreen/CustomerSignIn";
import HomeScreen from "../screens/Customer/HomeScreen/HomeScreen";

const Stack = createStackNavigator();
export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Threeplatform"
      >
        <Stack.Screen name="Threeplatform" component={Threeplatform} />
        <Stack.Screen name="CustomerSignIn" component={CustomerSignIn} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
