import { View, Text, LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Customer/HomeScreen/HomeScreen';
import BusinessListByCategoryScreen from '../screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen';
import BusinessDetailsScreen from '../screens/BusinessDetailsScreen/BusinessDetailsScreen';
import AllBusinessListing from '../screens/BusinessDetailsScreen/AllBusinessListing';
import ContactScreen from '../screens/Customer/ProfileScreen/ContactScreen';
import AddUserDetails from '../screens/Customer/ProfileScreen/AddUserDetails';
import UpdateUserDetails from '../screens/Customer/ProfileScreen/UpdateUserDetails';

LogBox.ignoreLogs(["Found screens with the same name nested inside one another. Check:"]);
const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='business-list' component={BusinessListByCategoryScreen} />
      <Stack.Screen name='business-detail' component={BusinessDetailsScreen} />
      <Stack.Screen name='all-business-detail' component={AllBusinessListing} />
      <Stack.Screen name='contact' component={ContactScreen} />
      <Stack.Screen name='adduserdetails' component={AddUserDetails} />
      <Stack.Screen name="updateuserdetails" component={UpdateUserDetails} />
    </Stack.Navigator>
  )
}