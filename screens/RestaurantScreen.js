import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import PlanifyIndicator from "../components/PlanifyIndicator"
import FlatListGoogleEvents from '../components/FlatListGoogleEvents';

const RestaurantScreen = ({ route, navigation }) => {  
  let resto = null
  let eventClique = null

  if(route.params!= undefined){
    resto = route.params.event
    eventClique = route.params.eventClique
    /*affichage de tout les évènements proche de lui */
    return (
      <View style={styles.container}>
        <FlatListGoogleEvents eventClique={eventClique} data={resto.results} navigation={navigation} />
      </View>)
  }
  else if (restaurants == null || restaurants == undefined) {
    return (<PlanifyIndicator /> )
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