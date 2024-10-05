import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Color from '../../utils/Color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Heading from '../../app/Components/Heading';

export default function BusinessDetailsScreen() {
  const route = useRoute();
  const [isReadMore, setIsReadMore] = useState(false);
  const [business, setBusiness] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    if (route?.params?.business) {
      setBusiness(route.params.business);
    }
  }, [route]);

  if (!business) {
    return <Text>Loading...</Text>;  // Handle the loading state
  }

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnContainer}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </TouchableOpacity>
      <Image source={{ uri: business?.images[0]?.url }} style={{ width: "100%", height: 300 }} />
      <View style={styles.infoContainer}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>{business?.name}</Text>
        <View style={styles.subContainer}>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 20, color: Color.PRIMARY }}>{business?.contactPerson} 🌟 </Text>
          <Text style={{ color: "red", backgroundColor: Color.PRIMARY_LIGHT, padding: 5, borderRadius: 5, fontSize: 14 }}>{business?.category.name}</Text>
        </View>
        <Text style={{ fontSize: 17, fontFamily: "outfit", color: "gray" }}>
          <Ionicons name="location-sharp" size={25} color={Color.PRIMARY} />{business?.address}</Text>

        {/*horizontal line */}
        <View style={{ borderWidth: 0.5, borderColor: "gray", marginTop: 15, marginBottom: 10 }}></View>

        {/*About Me */}
        <View>
          <Heading text={'About Me'} />
          <Text style={{ fontFamily: "outfit", color: "gray", fontSize: 16, paddingHorizontal: wp(3), lineHeight: 27 }} numberOfLines={isReadMore ? 10 : 5}>{business?.about}</Text>
          <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
            <Text style={{ color: Color.PRIMARY, fontFamily: "outfit", fontSize: 16, paddingHorizontal: wp(3) }}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center"
  }
});
