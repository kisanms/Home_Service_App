import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BookingModal({ hideModal }) {
  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}
        onPress={() => hideModal()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{ fontFamily: "outfit-medium", fontSize: 25 }}>Booking</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})