import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

import EventButton from '../components/EventButton';
import FlatListEvent from '../components/FlatListEvent';
import PlanifyIndicator from "../components/PlanifyIndicator"

const RestaurantScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([])

  /*--aller chercher tout les festivals--*/
  const getRestaurants = async () => {
    const db = firebase.firestore();
    const response = db.collection('Restaurants');
    const data = await response.get();

    let R = []
    data.docs.forEach(item => {
      R.push(item.data())
    })
    setRestaurants(R)
  }

  useEffect(() => {
    setRestaurants(null)
    getRestaurants()
  }, []);

  if (restaurants != null || restaurants != undefined) {
    return (
      <View style={styles.container}>
        <FlatListEvent data={restaurants} nomPage={"RestaurantScreen"} navigation={navigation}/>
      </View>)
  }
  else if (restaurants == null || restaurants == undefined) {
    return(<PlanifyIndicator/>
    )
  }
}

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});