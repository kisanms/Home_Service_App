import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Threeplatform from "../threeplatformbutton";
import CustomerSignIn from "../screens/Customer/LoginScreen/CustomerSignIn";
import HomeScreen from "../screens/Customer/HomeScreen/HomeScreen";
import LoginPage from "../screens/Employee/auth/LoginPage";
import Register from "../screens/Employee/auth/Register";
import EmpHomeScreen from "../screens/Employee/HomeScreen/EmpHomeScreen";
import EmpProfileScreen from "../screens/Employee/ProfileScreen/EmpProfileScreen";
import SubmittedDataScreen from "../screens/Employee/ProfileScreen/SubmittedDataScreen";
import BookingDetails from "../screens/Employee/BookingScreen/BookingDetails";
import EmployeeBookingDetails from "../screens/Employee/BookingScreen/EmployeeBookingDetails";

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
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="emphome" component={EmpHomeScreen} />
        <Stack.Screen name="empprofile" component={EmpProfileScreen} />
        <Stack.Screen name="submittedData" component={SubmittedDataScreen} />
        <Stack.Screen name="empbooking" component={BookingDetails} />
        <Stack.Screen
          name="empbookingdetail"
          component={EmployeeBookingDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
