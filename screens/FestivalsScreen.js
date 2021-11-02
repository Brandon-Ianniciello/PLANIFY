import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

import GetData from '../utils/GetData';

import * as firebase from 'firebase';

import FlatListEvent from '../components/FlatListEvent';

const FestivalsScreen = ({ navigation }) => {
  //Création de la base de données
  const [festivals, setFestivals] = useState([])

  const getFestivals = async () => {
    const db = firebase.firestore();
    const response = db.collection('Festivals');
    const data = await response.get();
    let F = []
    data.docs.forEach(item => {
      F.push(item.data())
    })
    setFestivals(F)
  }

  useEffect(() => {
    setFestivals(null)
    getFestivals()
  }, []);

  if (festivals != undefined || festivals != null) {
    return (
      <View>
        <FlatListEvent data={festivals} navigation={navigation} nomPage={"FestivalsScreen"} />
      </View>
    )
  }
  else if (festivals == undefined || festivals == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="black" size="large" />
      </View>
    )
  }
}


export default FestivalsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});