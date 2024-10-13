import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Heading from '../../../app/Components/Heading';
import GlobalApi from '../../../utils/GlobalApi';
import BusinessListItemSmall from './BusinessListItemSmall';
import { useNavigation } from '@react-navigation/native';

export default function BusinessList() {
  const navigation = useNavigation();
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    try {
      const resp = await GlobalApi.getBusinessList();
      setBusinessList(resp?.businessLists || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <View style={{ marginTop: 5 }}>
      <Heading text={'Latest Business'} isViewAll={true} onViewAllPress={() => navigation.navigate('all-business-detail')} />
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.push('business-detail', { business: item })} // Pass business data here
          >
            <BusinessListItemSmall business={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
      />
    </View>
  );
}

const styles = StyleSheet.create({});
