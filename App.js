import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreenView";
import Navigate from "./navigation/navigate";
import { ClerkProvider } from "@clerk/clerk-expo";
import { LogBox } from "react-native";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  LogBox.ignoreLogs(["Linking requires a build-time setting `scheme`"]);

  return (
    <ClerkProvider publishableKey="pk_test_bGVhZGluZy1zdGlua2J1Zy01MC5jbGVyay5hY2NvdW50cy5kZXYk">
      {isShowSplash ? <SplashScreen /> : <Navigate />}
    </ClerkProvider>
  );
}
