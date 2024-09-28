import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreenView";
import Navigate from "./navigation/navigate";
import { LogBox } from "react-native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  LogBox.ignoreLogs(["Linking requires a build-time setting scheme"]);

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        {isShowSplash ? <SplashScreen /> : <Navigate />}
      </ClerkLoaded>
    </ClerkProvider>
  );
}
