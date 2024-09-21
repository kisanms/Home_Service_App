import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
} from "react-native";
import Icon from "./assets/icon.png";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent) => {
  return PixelRatio.roundToNearestPixel((width * percent) / 100);
};

const responsiveHeight = (percent) => {
  return PixelRatio.roundToNearestPixel((height * percent) / 100);
};

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.image} />
      <Text style={styles.text}>Home Service App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: responsiveWidth(25), // 25% of the screen width
    height: responsiveWidth(25), // Maintain aspect ratio
    resizeMode: "cover",
    borderRadius: responsiveWidth(12.5), // 50% of image width for a circle
  },
  text: {
    fontSize: responsiveWidth(6), // Responsive text size
    fontWeight: "bold",
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
});
