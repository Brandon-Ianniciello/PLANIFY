import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import FlatListEvent from '../components/FlatListEvent';
import PlanifyIndicator from "../components/PlanifyIndicator";

const sportsScreen = ({ navigation }) => {
  const db = firebase.firestore();
  const [sports, setSports] = useState([])

  /*--aller chercher tout les festivals--*/
  const getSports = async () => {
    const response = db.collection('Sports');
    const data = await response.get();
    let S = []

    data.docs.forEach(item => {
      S.push(item.data())
    })

    setSports(S)
  }

  useEffect(() => {
    setSports(null)
    getSports()
  }, []);

  if (sports != null || sports != undefined) {
    return (
      <View style={styles.container}>
        <FlatListEvent navigation={navigation} data={sports} nomPage={"sportsScreen"} />
      </View>
    )
  } else if (sports == null || sports == undefined) {
    return (
      <PlanifyIndicator/>
    )
  }
}

export default sportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});