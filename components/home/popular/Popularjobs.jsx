import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import { PopularJobCard } from "../../../components";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
   const router = useRouter();
   const { data, isLoading, error } = useFetch('search', { query: 'React developer', page: 1, num_pages: 1 });
   // console.log(data);

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Popular jobs</Text>
            <TouchableOpacity>
               <Text style={styles.headerBtn}>Show all</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.cardsContainer}>
            {isLoading ? (
               <ActivityIndicator size="large" colors={COLORS.primary} />
            ) : error ? (
               <Text>Something went wrong</Text>
            ) : (
               <FlatList 
                  data={data.data}
                  renderItem={({ item }) => (
                     <PopularJobCard item={item} />
                  )}
                  keyExtractor={item => item?.job_id}
                  horizontal
                  contentContainerStyle={{ columnGap: SIZES.medium }}
               />
            )}
         </View>
      </View>
   )
}

export default Popularjobs;