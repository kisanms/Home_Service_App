import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../../utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
// Update the import
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BookingListItem from "../../BusinessListByCategoryScreen/BookingListItem";

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true); // Set loading state to true
    GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setBookingList(resp?.bookings || []); // Set an empty array if no bookings are returned
        setLoading(false); // Set loading state to false
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookingList}
        onRefresh={() => getUserBookings()}
        refreshing={loading}
        renderItem={({ item }) => {
          if (!item?.businessList) return null; // Skip rendering if no businessList
          return (
            <BookingListItem // Use the new BookingListItem component
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
