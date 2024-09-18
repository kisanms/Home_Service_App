import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./SplashScreenView";
import Threeplatform from "./threeplatformbutton";
import { useEffect, useState } from "react";
export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  });
  return <>{isShowSplash ? <SplashScreen /> : <Threeplatform />}</>;
}
