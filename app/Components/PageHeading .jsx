import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function PageHeading({ title }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}
      onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={30} color="black" />
      <Text style={{ fontFamily: "outfit-medium", fontSize: 25 }}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})