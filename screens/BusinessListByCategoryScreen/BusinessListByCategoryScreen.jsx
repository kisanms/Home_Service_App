import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalApi from '../../utils/GlobalApi';
import BusinessListItem from './BusinessListItem';

export default function BusinessListByCategoryScreen() {
  const navigation = useNavigation();
  const param = useRoute().params;
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    param && getBusinessByCategory();
  }, [param]);

  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then(resp => {
      setBusinessList(resp.businessLists);
    })
  }
  return (
    <View style={{ padding: 20, paddingTop: 40 }}>
      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{ fontFamily: "outfit-medium", fontSize: 25 }}>{param.category}</Text>
      </TouchableOpacity>
      {businessList?.length > 0 ? <FlatList
        style={{ marginTop: 10 }}
        data={businessList}
        renderItem={({ item, index }) => (
          <BusinessListItem business={item} />
        )} /> :
        <Text style={{ fontFamily: "outfit-medium", fontSize: 20, textAlign: "center", marginTop: "20%", color: "gray" }}>No Business Found</Text>}
    </View>
  )
}

const styles = StyleSheet.create({})