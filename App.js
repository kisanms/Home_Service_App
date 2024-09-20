import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreenView";
import Threeplatform from "./threeplatformbutton";
import CustomerSignIn from "./screens/Customer/LoginScreen/CustomerSignIn";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";

const Stack = createStackNavigator();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Threeplatform"
          >
            <Stack.Screen name="Threeplatform" component={Threeplatform} />
            <Stack.Screen name="CustomerSignIn" component={CustomerSignIn} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
