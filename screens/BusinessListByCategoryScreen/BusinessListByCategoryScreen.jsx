import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import GlobalApi from '../../utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import PageHeading from '../../app/Components/PageHeading ';


export default function BusinessListByCategoryScreen() {
  const navigation = useNavigation();
  const param = useRoute().params;
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);  // For refresh control

  useEffect(() => {
    // Fetch business data when category changes
    if (param) getBusinessByCategory();
  }, [param]);

  const getBusinessByCategory = async () => {
    try {
      setLoading(true);  // Start loading
      const resp = await GlobalApi.getBusinessListByCategory(param.category);
      setBusinessList(resp.businessLists || []);  // Ensure no null values
    } catch (error) {
      console.error("Error fetching business list:", error);  // Better error handling
    } finally {
      setLoading(false);  // Stop loading whether success or failure
    }
  }

  return (
    <View style={{ padding: 20, paddingTop: 40 }}>
      <PageHeading title={param.category} />
      {businessList.length > 0 ? (
        <FlatList
          style={{ marginTop: 10 }}
          data={businessList}
          keyExtractor={(item, index) => item.id.toString()} // KeyExtractor for better performance
          onRefresh={getBusinessByCategory}  // Triggers refresh
          refreshing={loading}  // Control refresh spinner
          renderItem={({ item }) => (
            <BusinessListItem business={item} />
          )}
        />
      ) : (
        <Text style={styles.noBusinessText}>No Business Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noBusinessText: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    textAlign: "center",
    marginTop: "20%",
    color: "gray"
  }
});
