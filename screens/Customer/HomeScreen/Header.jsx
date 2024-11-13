import { View, Text, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Color from '../../../utils/Color';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const { user, isLoading } = useUser();
    const { width } = Dimensions.get('window'); // Get screen width
    const navigation = useNavigation();
    return user && (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("contact")}>
                        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.welcomeText}>Welcome,</Text>
                        <Text style={styles.userNameText}>{user?.fullName}</Text>
                    </View>
                </View>
                <FontAwesome name="bookmark-o" size={30} color="white"
                    onPress={() => navigation.navigate("Booking")} />
            </View>
            {/* Search bar section */}
            <View style={styles.searchBarContainer}>
                <TextInput placeholder='Search' style={styles.textInput} />
                <FontAwesome name="search" size={wp('5.5%')} color={Color.PRIMARY} style={styles.searchBtn} />
            </View>
        </View>
    );
}

// Enhanced responsive styles
const styles = StyleSheet.create({
    container: {
        padding: wp('5%'), // Responsive padding
        paddingTop: hp('5%'),
        backgroundColor: Color.PRIMARY,
        borderBottomLeftRadius: wp('8%'),
        borderBottomRightRadius: wp('8%'),
    },
    profileMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('3%'), // Responsive gap between image and text
    },
    userImage: {
        width: wp('12%'), // Responsive width and height
        height: wp('12%'),
        borderRadius: wp('12%'),
    },
    welcomeText: {
        color: Color.WHITE,
        fontFamily: 'outfit',
        fontSize: wp('4%'), // Responsive font size
    },
    userNameText: {
        color: Color.WHITE,
        fontSize: wp('5%'), // Responsive font size
        fontFamily: 'outfit-medium',
    },
    searchBarContainer: {
        marginTop: hp('2%'),
        flexDirection: 'row',
        gap: wp('3%'),
        marginBottom: hp('1%'),
    },
    textInput: {
        padding: wp('3%'),
        width: '85%',
        paddingHorizontal: wp('4%'),
        backgroundColor: '#f5f5f5',
        borderRadius: wp('3%'),
        fontSize: wp('4%'),
        fontFamily: 'outfit',
    },
    searchBtn: {
        backgroundColor: Color.WHITE,
        padding: wp('3%'),
        borderRadius: wp('3%'),
    },
});

