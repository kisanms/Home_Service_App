import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../../app/Components/Heading'
import GlobalApi from '../../../utils/GlobalApi';
import BusinessListItemSmall from './BusinessListItemSmall';

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    try {
      const resp = await GlobalApi.getBusinessList();
      setBusinessList(resp?.businessLists || []);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <View style={{ marginTop: 5 }}>
      <Heading text={"Latest Business"} isViewAll={true} />
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <BusinessListItemSmall business={item} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})