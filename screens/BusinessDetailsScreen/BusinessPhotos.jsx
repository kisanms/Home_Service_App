import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../../app/Components/Heading'

export default function BusinessPhotos({ business }) {
  return (
    <View>
      <Heading text={'Photos'} />
      <FlatList
        data={business.images}
        renderItem={({ item }) => (
          <Image />
        )} />
    </View>
  )
}

const styles = StyleSheet.create({})