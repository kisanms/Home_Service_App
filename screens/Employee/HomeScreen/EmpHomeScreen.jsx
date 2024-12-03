import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../../../utils/Color';
import { useNavigation } from '@react-navigation/native';

export default function EmpHomeScreen() {
  const [userData, setUserData] = useState(null); // Set initial state to null
  const navigation = useNavigation();

  async function getData() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      axios.post("http://192.168.29.179:5001/userdata", { token: token }).then(res => {
        console.log(res.data);
        setUserData(res.data.data); // Assuming data contains user info
      }).catch(err => {
        console.error("Error fetching user data:", err); // Handle any errors
      });
    }
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('token');
    alert('Logged out successfully');
    navigation.navigate("login");
    // Add navigation logic here to redirect to the login screen
  }


  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Shape */}
      <View style={styles.headerBackground} />
      <Text style={{ marginTop: 20, paddingTop: 20, textAlign: "center", fontSize: hp(3), fontFamily: "outfit-bold", color: "white" }}>Home Service App</Text>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: userData?.profileImage || 'https://via.placeholder.com/100' }} // Fallback image
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{userData?.name}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <FontAwesome name="envelope" size={24} color="#FF8C00" />
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoText}>{userData?.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="user" size={24} color="#4CAF50" />
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoText}>{userData?.gender}</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="phone" size={24} color="#FF6347" />
          <Text style={styles.infoLabel}>Mobile</Text>
          <Text style={styles.infoText}>{userData?.mobile}</Text>
        </View>
        {/* Updated Profession Section */}
        <View style={styles.infoItem}>
          <FontAwesome name="briefcase" size={24} color="#007BFF" />
          <Text style={styles.infoLabel}>Profession</Text>
          <Text style={styles.infoText}>{userData?.profession}</Text>
        </View>
      </View>



      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("empprofile")}>
          <Text style={styles.buttonText}>Job Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("empbooking")}>
          <Text style={styles.buttonText}>Booking Details</Text>
        </TouchableOpacity>
      </View>
      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    height: hp('30%'),
    backgroundColor: Color.PRIMARY,
    borderBottomLeftRadius: wp('50%'),
    borderBottomRightRadius: wp('50%'),
    position: 'absolute',
    top: 0,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  profileImage: {
    width: wp('50%'),
    height: wp('50%'),
    borderRadius: wp('50%'),
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameText: {
    marginTop: hp('2%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
    fontFamily: "outfit",
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
    color: 'black',
    marginLeft: 'auto',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp('5%'),
    paddingHorizontal: wp('6%'),
    gap: wp('5%'),
  },
  button: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: hp('6%'),
  },
  logoutButton: {
    borderColor: Color.PRIMARY,
    borderWidth: 2,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('10%'),
    marginBottom: hp('5%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Color.PRIMARY,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});
