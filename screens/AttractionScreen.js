import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

import GetData from '../utils/GetData';
import * as firebase from 'firebase';
import FlatListEvent from '../components/FlatListEvent';

const AttractionScreen = ({ navigation }) => {
  const [attractions, setAttractions] = useState([])

  const getAttractions = async () => {
    const db = firebase.firestore();
    const response = db.collection('Attractions');
    const data = await response.get();
    let A = []
    data.docs.forEach(item => {
      A.push(item.data())
    })
    setAttractions(A)
  }

  useEffect(() => {
    setAttractions(null)
    //setFestivals(GetData('Festivals'))
    getAttractions()
  }, []);

  if (attractions != undefined || attractions != null) {
    console.log(attractions)
    return (
      <View style={styles.container}>
        <FlatListEvent navigation={navigation} nomPage={"AttractionScreen"} data={attractions} />
      </View>
    )
  }
  else if (attractions == undefined || attractions == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="black" size="large" />
      </View>
    )
  }
}


export default AttractionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});