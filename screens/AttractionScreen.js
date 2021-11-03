import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

import GetData from '../utils/GetData';
import * as firebase from 'firebase';
import FlatListEvent from '../components/FlatListEvent';
import PlanifyIndicator from "../components/PlanifyIndicator";

const AttractionScreen = ({ navigation,userInfo }) => {
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

  console.log("U:",userInfo)
  if(userInfo!=undefined){
      userInfo = route.params.userInfo
  }
    
  if (attractions != undefined || attractions != null) {
    console.log(attractions)
    return (
      <View style={styles.container}>
        <FlatListEvent navigation={navigation} nomPage={"AttractionScreen"} data={attractions} userInfo={userInfo}/>
      </View>
    )
  }
  else if (attractions == undefined || attractions == null) {
    return (<PlanifyIndicator/>)
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