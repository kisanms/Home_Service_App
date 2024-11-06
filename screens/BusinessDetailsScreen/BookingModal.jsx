import { StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid, Alert,
  Platform, } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from "react-native-calendar-picker";
import Color from '../../utils/Color';
import Heading from '../../app/Components/Heading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useUser } from '@clerk/clerk-expo';
import GlobalApi from '../../utils/GlobalApi';

export default function BookingModal({ buinessId, hideModal }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [note, setNote] = useState();
  const { user } = useUser();

  // Function to show cross-platform toast/alert
  const showToastOrAlert = (message) => {
    Platform.select({
      android: () => ToastAndroid.show(message, ToastAndroid.SHORT),
      ios: () => Alert.alert("Notification", message),
    })();
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const [timeList, setTimeList] = useState();
  useEffect(() => {
    getTime(); // Fetch time slots on component mount
  }, []);




  const getTime = () => {
    const timeList = [];

    // Loop for morning times (8 AM - 12 PM)
    for (let i = 8; i <= 11; i++) {
      timeList.push({
        time: i + ':00 AM'
      });
      timeList.push({
        time: i + ':30 AM'
      });
    }

    // Special case for 12 PM
    timeList.push({
      time: '12:00 PM'
    });
    timeList.push({
      time: '12:30 PM'
    });

    // Loop for afternoon/evening times (1 PM - 7 PM)
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ':00 PM'
      });
      timeList.push({
        time: i + ':30 PM'
      });
    }

    setTimeList(timeList);
  };

  // create booking method
  const createNewBooking = () => {
    if (!selectedDate || !selectedTime) {
      // Show a success notification
      showToastOrAlert("Please select date and time!");
      return;
    }
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      date: selectedDate,
      time: selectedTime,
      businessId: buinessId,
    }
    GlobalApi.createBooking(data).then(resp => {
      console.log("Resp", resp);
      showToastOrAlert("Booking created successfully!");
      hideModal();
    })
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
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

        {/* Time slots Section */}
        <View style={styles.timeSlotContainer}>
          <Heading text={'Select Time Slot'} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.timeSlot} onPress={() => setSelectedTime(item.time)}>
                <Text style={selectedTime === item.time ? styles.selectedTime : styles.unselectedTime}>{item.time}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.timeList}
          />
        </View>
        {/* Note Section*/}
        <View style={{ paddingTop: 20 }}>
          <Heading text={'Any Suggestion Note'} />
          <TextInput placeholder='Note'
            numberOfLines={4}
            multiline={true} style={styles.noteTextArea}
            onChange={(text) => setNote(text)} />
        </View>
        {/* Confirmation Button */}
        <TouchableOpacity onPress={() => createNewBooking()}>
          <Text style={styles.confirmBtn}>Confirm and Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
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
    backgroundColor: Color.PRIMARY_LIGHT,
    padding: wp('5%'), // Responsive padding
    borderRadius: wp('4%'), // Responsive border radius
  },
  todayTextStyle: {
    color: Color.WHITE,
  },
  timeSlotContainer: {
    marginTop: hp('2%'), // Responsive margin top
  },
  timeSlot: {
    marginRight: wp('3%'), // Responsive margin between time slots
  },
  selectedTime: {
    paddingVertical: hp('1.2%'), // Responsive vertical padding
    paddingHorizontal: wp('5%'), // Responsive horizontal padding
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: wp('6%'), // Responsive border radius
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
    fontSize: wp('4%'), // Responsive font size
    textAlign: 'center',
  },
  unselectedTime: {
    paddingVertical: hp('1.2%'), // Responsive vertical padding
    paddingHorizontal: wp('5%'), // Responsive horizontal padding
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: wp('6%'), // Responsive border radius
    color: Color.PRIMARY,
    fontSize: wp('4%'), // Responsive font size
    textAlign: 'center',
  },
  timeList: {
    paddingHorizontal: wp('2%'), // Responsive padding for the FlatList container
  },
  noteTextArea: {
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('4%'), // Responsive border radius
    marginBottom: hp('2%'), // Responsive margin bottom
    fontSize: wp('4%'), // Responsive font size
    color: Color.PRIMARY,
    fontFamily: 'outfit',
  },
  confirmBtn: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('6%'), // Responsive border radius
    marginTop: hp('1%'), // Responsive margin top
    color: Color.WHITE,
    fontSize: wp('5%'), // Responsive font size
    fontFamily: 'outfit-medium',
    textAlign: 'center',
    marginBottom: hp('3%'), // Responsive margin bottom
  }
});
