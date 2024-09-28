import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import SplashScreen from "./SplashScreenView";
import Navigate from "./navigation/navigate";
import { LogBox, Text, View } from "react-native";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
import { Slot } from "expo-router";
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  LogBox.ignoreLogs(["Linking requires a build-time setting scheme"]);
  LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SignedIn>
          <Text style={{ paddingTop: 20 }}>You are signed in</Text>
        </SignedIn>
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <SignedOut>
            <Navigate />
          </SignedOut>
        )}
      </ClerkLoaded>
    </ClerkProvider>
  );
}
