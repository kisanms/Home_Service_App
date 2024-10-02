import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Color from '../../../utils/Color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BusinessListItemSmall({ business }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: business?.images[0]?.url }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.businessName}>{business?.name}</Text>
        <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
        <Text style={styles.category}>{business?.category.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp('3%'),
    backgroundColor: "white",
    borderRadius: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: wp('40%'),
    height: hp('15%'),
    borderRadius: wp('3%'),
  },
  infoContainer: {
    paddingLeft: wp('3%'),
    flex: 1,
  },
  businessName: {
    fontSize: wp('4.5%'),
    fontFamily: "outfit-medium",
  },
  contactPerson: {
    fontSize: wp('3.5%'),
    fontFamily: "outfit",
    color: "gray",
    marginTop: hp('0.5%'),
  },
  category: {
    fontSize: wp('3%'),
    fontFamily: "outfit-bold",
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    color: Color.PRIMARY,
    backgroundColor: Color.PRIMARY_LIGHT,
    borderRadius: wp('2%'),
    marginTop: hp('0.5%'),
    alignSelf: "flex-start",
  },
});
