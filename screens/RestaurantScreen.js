import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import PlanifyIndicator from "../components/PlanifyIndicator"
import FlatListGoogleEvents from '../components/FlatListGoogleEvents';

const RestaurantScreen = ({ route, navigation }) => {  
  if(route.params!= undefined){
    let resto = route.params.event
    let eventClique = route.params.eventClique
    let details = route.params.details
    return (
      <View style={styles.container}>
        <FlatListGoogleEvents eventClique={eventClique} details={details} data={resto.results} navigation={navigation} />
      </View>)
  }
  return (<PlanifyIndicator /> )
}

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});