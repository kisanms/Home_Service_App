import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser, useClerk } from "@clerk/clerk-expo"; // Use useClerk hook
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import Color from "../../../utils/Color";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, isLoading } = useUser();
  const { signOut } = useClerk(); // Access signOut from useClerk hook

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    user && (
      <View style={styles.container}>
        {/* Profile Section */}
        <LinearGradient
          colors={["#6a11cb", "#2575fc"]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileInitials}>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.fullName}</Text>
          <Text style={styles.userEmail}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </LinearGradient>

        {/* Navigation Buttons */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="home" size={wp(6)} color={Color.PRIMARY} />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Booking")}
          >
            <Ionicons name="bookmark" size={wp(6)} color={Color.PRIMARY} />
            <Text style={styles.menuText}>My Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("contact")}
          >
            <MaterialIcons name="contacts" size={24} color={Color.PRIMARY} />
            <Text style={styles.menuText}>User Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => signOut()} // Use signOut function here
          >
            <Ionicons name="log-out" size={wp(6)} color={Color.PRIMARY} />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    paddingTop: hp("6%"),
    paddingBottom: hp("4%"),
    alignItems: "center",
    borderBottomLeftRadius: wp("10%"),
    borderBottomRightRadius: wp("10%"),
  },
  profileImageContainer: {
    backgroundColor: "white",
    width: wp("24%"),
    height: wp("24%"),
    borderRadius: wp("12%"),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("2%"),
    borderWidth: 3,
    borderColor: Color.PRIMARY,
    elevation: 5,
  },
  profileInitials: {
    color: Color.PRIMARY,
    fontSize: wp("11%"),
    fontWeight: "bold",
  },
  userName: {
    color: "white",
    fontSize: wp("5.5%"),
    fontWeight: "600",
    marginBottom: hp("0.5%"),
  },
  userEmail: {
    color: "white",
    fontSize: wp("4.2%"),
  },
  menuContainer: {
    marginTop: hp("4%"),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("5%"),
    backgroundColor: "#ffffff",
    marginBottom: hp("1.8%"),
    width: wp("85%"),
    alignSelf: "center",
    borderRadius: wp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  menuText: {
    marginLeft: wp("4%"),
    color: "#333",
    fontSize: wp("4.7%"),
    fontWeight: "500",
  },
});
