import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Color from '../../utils/Color';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({ business }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push('business-detail', {
      business: business
    })}>
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text style={styles.contactPerson}>
          {business?.contactPerson}
        </Text>
        <Text style={styles.businessName}>{business.name}</Text>
        <Text style={styles.address}>
          <Ionicons name="location-sharp" size={wp('4%')} color={Color.PRIMARY} />
          {business.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('3%'),
  },
  container: {
    padding: wp('3%'),
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
    flexDirection: 'row',
    gap: wp('3%'),
  },
  subContainer: {
    flex: 1,
    gap: hp('1.5%'),
  },
  contactPerson: {
    fontFamily: 'outfit',
    color: 'gray',
    fontSize: wp('3.7%'),
  },
  businessName: {
    fontFamily: 'outfit-bold',
    fontSize: wp('4.5%'),
  },
  address: {
    fontFamily: 'outfit',
    color: 'gray',
    fontSize: wp('3.5%'),
  },
});
