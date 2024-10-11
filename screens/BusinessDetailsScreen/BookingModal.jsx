import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from "react-native-calendar-picker";
import Color from '../../utils/Color';

export default function BookingModal({ hideModal }) {
  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}
        onPress={() => hideModal()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{ fontFamily: "outfit-medium", fontSize: 25 }}>Booking</Text>
      </TouchableOpacity>
      {/*Calender section */}
      <View style={styles.calenderContainer}>
        <CalendarPicker onDateChange={this.onDateChange}
          width={340}
          minDate={Date.now()}
          todayBackgroundColor={Color.PRIMARY} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: Color.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  }
})