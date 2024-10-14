import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeading from "../../../app/Components/PageHeading ";
import GlobalApi from "../../../utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItem from "../../BusinessListByCategoryScreen/BusinessListItem";

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
    <View style={{ paddingTop: 40, padding: 10 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 26 }}>
        My Bookings
      </Text>
      <View>
        <FlatList
          data={bookingList}
          renderItem={({ item }) => {
            if (!item?.businessList) return null; // Skip rendering if no businessList
            return <BusinessListItem business={item?.businessList} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
