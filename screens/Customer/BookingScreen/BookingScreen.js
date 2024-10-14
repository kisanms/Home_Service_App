import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../../utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItem from "../../BusinessListByCategoryScreen/BusinessListItem";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setBookingList(resp?.bookings || []); // Set an empty array if no bookings are returned
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>
      <FlatList
        data={bookingList}
        renderItem={({ item }) => {
          if (!item?.businessList) return null; // Skip rendering if no businessList
          return (
            <BusinessListItem
              business={item?.businessList}
              booking={{
                id: item.id,
                bookingStatus: item.bookingStatus,
                time: item.time,
                date: item.date,
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up full available space for scrolling
    paddingTop: hp("4%"), // Responsive padding
    paddingHorizontal: wp("3%"), // Responsive horizontal padding
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: wp("6.5%"), // Responsive font size
    marginBottom: hp("2%"), // Responsive margin below the heading
  },
  flatListContent: {
    paddingBottom: hp("5%"), // Adds padding to the bottom to ensure full visibility of last item
  },
});
