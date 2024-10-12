import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from "react-native-calendar-picker";
import Color from '../../utils/Color';
import Heading from '../../app/Components/Heading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BookingModal({ hideModal }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };
  const [timeList, setTimeList] = useState();
  useEffect(() => {
    getTime(); // Fetch time slots on component mount
  }, []);
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      })
      timeList.push({
        time: i + ':30 AM'
      })
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ':00 PM'
      })
      timeList.push({
        time: i + ':30 PM'
      })
    }
  }

  return (
    <View style={styles.container}>
      {/* Header with back arrow and title */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => hideModal()}
      >
        <Ionicons name="arrow-back-outline" size={wp('7%')} color="black" />
        <Text style={styles.headerText}>Booking</Text>
      </TouchableOpacity>

      {/* Calendar Section */}
      <Heading text={'Select Date'} />
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={onDateChange}
          width={wp('85%')} // Width is 85% of the screen width
          minDate={Date.now()}
          todayBackgroundColor={Color.PRIMARY}
          todayTextStyle={styles.todayTextStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'), // Responsive padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'), // Responsive margin bottom
    gap: wp('2%'), // Responsive gap
  },
  headerText: {
    fontFamily: "outfit-medium",
    fontSize: wp('6%'), // Responsive font size
  },
  calendarContainer: {
    backgroundColor: "lightgray",
    padding: wp('5%'), // Responsive padding
    borderRadius: wp('4%'), // Responsive border radius
  },
  todayTextStyle: {
    color: Color.WHITE,
  },
});
