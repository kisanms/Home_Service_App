import { View, Text, LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Customer/HomeScreen/HomeScreen';
import BusinessListByCategoryScreen from '../screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen';

LogBox.ignoreLogs(["Found screens with the same name nested inside one another. Check:"]);
const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='business-list' component={BusinessListByCategoryScreen} />
    </Stack.Navigator>
  )
}