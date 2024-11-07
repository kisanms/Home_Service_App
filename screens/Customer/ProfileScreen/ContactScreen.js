import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Color from "../../../utils/Color";
import { useUser } from "@clerk/clerk-expo"; // Use Clerk's useUser hook
import GlobalApi from "../../../utils/GlobalApi"; // Assuming you have this utility to handle API calls

export default function ContactScreen() {
  const navigation = useNavigation();
  const { user, isLoading } = useUser(); // Access logged-in user details
  const [userDetails, setUserDetails] = useState([]); // To hold the user details
  const [loading, setLoading] = useState(true); // Loading state for the data fetch
  const [error, setError] = useState(""); // To handle error messages

  // Function to fetch the user contact details from API
  const fetchUserDetails = async (email) => {
    try {
      const result = await GlobalApi.getUserContactDetails(email);
      if (result?.userContactDetails) {
        setUserDetails(result.userContactDetails); // Store user data
      } else {
        setError("No user details found");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Error fetching data: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const email = user.primaryEmailAddress?.emailAddress; // Get the email from the logged-in user
      if (email) {
        fetchUserDetails(email); // Fetch the user details if the email is available
      }
    }
  }, [user]);

  if (isLoading) {
    return <Text>Loading...</Text>; // Show loading message while user details are being fetched
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, { color: Color.PRIMARY }]}>
        Name:{" "}
        <Text style={{ color: "black", fontFamily: "outfit" }}>
          {item.name}
        </Text>
      </Text>
      <Text style={[styles.itemText, { color: Color.SECONDARY }]}>
        Phone:{" "}
        <Text style={{ color: "black", fontFamily: "outfit" }}>
          {item.phone}
        </Text>
      </Text>
      <Text style={[styles.itemText, { color: Color.TERTIARY }]}>
        Email:{" "}
        <Text style={{ color: "black", fontFamily: "outfit" }}>
          {item.email}
        </Text>
      </Text>
      <Text style={[styles.itemText, { color: Color.FOURTH }]}>
        Address:{" "}
        <Text style={{ color: "black", fontFamily: "outfit" }}>
          {item.address}
        </Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Contact Details</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("adduserdetails")}
      >
        <Text style={styles.buttonText}>Add User Detail</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Color.PRIMARY}
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={userDetails}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.noDataText}>No user details found.</Text>
          }
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: wp("5%"),
    alignItems: "center",
  },
  heading: {
    fontSize: wp("7%"),
    fontFamily: "outfit-bold",
    color: "#333",
    marginTop: hp("4%"),
    marginBottom: hp("2%"),
    textAlign: "center",
  },
  button: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: hp(1),
    width: wp("100%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: hp("3%"),
  },
  buttonText: {
    fontFamily: "outfit-bold",
    color: "#fff",
    fontSize: wp("4.5%"),
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: wp("4%"),
    marginVertical: hp("1%"),
    borderRadius: wp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: Color.PRIMARY,
    backgroundColor: "#f8f8f8",
  },
  itemText: {
    fontSize: wp("4.5%"),
    marginBottom: hp("1%"),
    fontFamily: "outfit-bold",
  },
  loading: {
    marginTop: hp("10%"),
  },
  noDataText: {
    fontSize: wp("4.5%"),
    color: "#999",
    textAlign: "center",
    marginTop: hp("3%"),
  },
  errorText: {
    fontSize: wp("4.5%"),
    color: "red",
    textAlign: "center",
    marginTop: hp("3%"),
  },
});
