import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../../../utils/Color';

export default function EmpHomeScreen() {
  const [userData, setUserData] = useState();
  async function getData() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios.post("http://192.168.230.179:5001/userdata", { token: token }).then(res => {
      console.log(res.data);
      setUserData(res.data.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Shape */}
      <View style={styles.headerBackground} />

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{userData.name}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <FontAwesome name="envelope" size={24} color="#FF8C00" />
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoText}>{userData.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="user" size={24} color="#4CAF50" />
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoText}>Male</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="briefcase" size={24} color="#800080" />
          <Text style={styles.infoLabel}>Profession</Text>
          <Text style={styles.infoText}>Engineer</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="phone" size={24} color="#FF6347" />
          <Text style={styles.infoLabel}>Mobile</Text>
          <Text style={styles.infoText}>{userData.mobile}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    width: '100%',
    height: hp('25%'),
    backgroundColor: Color.PRIMARY,
    borderBottomLeftRadius: wp('50%'),
    borderBottomRightRadius: wp('50%'),
    position: 'absolute',
    top: 0,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: hp('15%'),
  },
  profileImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameText: {
    marginTop: hp('2%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    marginTop: hp('3%'),
    paddingHorizontal: wp('8%'),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  infoLabel: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp('3%'),
  },
  infoText: {
    fontSize: wp('4%'),
    color: '#666',
    marginLeft: 'auto',
  },
});
