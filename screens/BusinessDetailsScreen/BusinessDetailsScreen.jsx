import { Image, LogBox, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Color from '../../utils/Color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Heading from '../../app/Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BookingModal from './BookingModal';
LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead."]);
export default function BusinessDetailsScreen() {
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [business, setBusiness] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (route?.params?.business) {
      setBusiness(route.params.business);
    }
  }, [route]);

  if (!business) {
    return <Text>Loading...</Text>; // Handle the loading state
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnContainer}>
          <Ionicons name="arrow-back-outline" size={hp(4)} color="white" />
        </TouchableOpacity>
        <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.businessName}>{business?.name}</Text>
          <View style={styles.subContainer}>
            <Text style={styles.contactPerson}>{business?.contactPerson} 🌟</Text>
            <Text style={styles.category}>{business?.category.name}</Text>
          </View>
          <Text style={styles.address}>
            <Ionicons name="location-sharp" size={hp(2.5)} color={Color.PRIMARY} /> {business?.address}
          </Text>

          {/* Horizontal line */}
          <View style={styles.horizontalLine}></View>

          {/* About Me */}
          <View>
            <Heading text={'About Me'} />
            <Text
              style={styles.aboutText}
              numberOfLines={isReadMore ? 8 : 4}
            >
              {business?.about}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
              <Text style={styles.readMoreText}>
                {isReadMore ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal line */}
          <View style={styles.horizontalLine}></View>
          <BusinessPhotos business={business} />
        </View>
      </ScrollView>
      <View style={{ display: "flex", flexDirection: "row", margin: wp(2), gap: wp(2) }}>
        <TouchableOpacity style={styles.messgaeBtn}>
          <Text style={{ textAlign: "center", fontFamily: "outfit-medium", color: Color.PRIMARY, fontSize: wp(4.5) }}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingBtn} onPress={() => setShowModal(true)}>
          <Text style={{ textAlign: "center", fontFamily: "outfit-medium", color: "white", fontSize: wp(4.5) }}>Book Now</Text>
        </TouchableOpacity>
      </View>
      {/* Booking screen modal*/}
      <Modal
        animationType='slide'
        visible={showModal}>
        <BookingModal hideModal={() => setShowModal(false)} />
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: hp(3),
    height: '91%',// Added padding for better UI layout
  },
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    paddingTop: wp(4),
    marginHorizontal: wp(2)
  },
  image: {
    width: '100%',
    height: hp(30), // Reduced image height for a more compact layout
    resizeMode: 'cover', // Ensure the image covers the area properly
  },
  infoContainer: {
    padding: wp(4), // Reduced padding for a compact look
    gap: hp(1),
  },
  businessName: {
    fontFamily: 'outfit-bold',
    fontSize: wp(5), // Reduced font size
    color: '#000',
  },
  subContainer: {
    flexDirection: 'row',
    gap: wp(2),
    alignItems: 'center',
  },
  contactPerson: {
    fontFamily: 'outfit-medium',
    fontSize: wp(4), // Reduced font size
    color: Color.PRIMARY,
  },
  category: {
    color: 'red',
    backgroundColor: Color.PRIMARY_LIGHT,
    padding: wp(1.5), // Reduced padding
    borderRadius: wp(1),
    fontSize: wp(3), // Reduced font size
  },
  address: {
    fontSize: wp(3.5), // Reduced font size
    fontFamily: 'outfit',
    color: 'gray',
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: 'gray',
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
  },
  aboutText: {
    fontFamily: 'outfit',
    color: 'gray',
    fontSize: wp(3.5), // Reduced font size
    paddingHorizontal: wp(3),
    lineHeight: hp(3), // Reduced line height
  },
  readMoreText: {
    color: Color.PRIMARY,
    fontFamily: 'outfit',
    fontSize: wp(3.5), // Reduced font size
    paddingHorizontal: wp(3),
  },
  messgaeBtn: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: wp(10),
    flex: 1,
  },
  bookingBtn: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: Color.PRIMARY,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: wp(10),
    flex: 1,
  }
});
