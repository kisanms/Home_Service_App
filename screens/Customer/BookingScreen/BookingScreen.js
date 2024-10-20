import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../../utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BookingListItem from "../../BusinessListByCategoryScreen/BookingListItem";
import Color from "../../../utils/Color";

const { width } = Dimensions.get("window");

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setBookingList(resp?.bookings || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
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
          if (!item?.businessList) return null;
          return (
            <BookingListItem
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
    flex: 1,
    paddingTop: hp("4%"),
    paddingHorizontal: wp("3%"),
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: wp("6.5%"),
    marginBottom: hp("2%"),
  },
  flatListContent: {
    paddingBottom: hp("5%"),
  },
});
