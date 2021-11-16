import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, TouchableOpacity, Button } from 'react-native';
import FlastListEvent from "../components/FlatListEvent";
import * as firebase from 'firebase';
import { LogBox } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

LogBox.ignoreLogs(['Setting a timer']);

const forum = ({ navigation }) => {
  const [ajouts, setAjouts] = useState([])

  let length = 1

  const getAjouts = async () => {
    setAjouts(null)
    const db = firebase.firestore();
    const response = db.collection('Ajouts');
    const data = await response.get();
    let R = []
    data.docs.forEach(item => {
      R.push(item.data())
      length++
    })

    setAjouts(R)
  }

  useEffect(() => {
    setAjouts(null)
    getAjouts()
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#dcdcdc" }}>
      <View style={{
        backgroundColor: "dcdcdc", height: "10%", borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20, width: '100%', marginTop: 10
      }}>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 50, width: "100%", paddingHorizontal: 20, paddingBottom: 100 }}>
          {/* Texte d'accueil du forum */}
          <View style={{ width: "50%", backgroundColor: "#dcdcdc" }}>
            <Text style={{
              fontSize: 28,
              color: "#141823",
              fontWeight: "bold"
            }}>
              Bienvenue sur le forum de Planify
            </Text>
          </View>
          {/* Image */}
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <Image
              source={require('../assets/CalendarV3.png')}
              style={{ height: 60, width: 60 }}
            />
          </View>
        </View>


      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.bouton} onPress={() => navigation.navigate("AddEventScreen")}>
          <FontAwesome name="plus" color='#33cc33' size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={() => getAjouts()}>
          <FontAwesome name="retweet" color="#0099ff" size={25} style={{ marginBottom: 5 }} />
        </TouchableOpacity>
      </View>
      {/* Liste de tout les ajouts */}
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <FlastListEvent data={ajouts} navigation={navigation} nomPage="Forum" />
      </View>
    </ScrollView>
  )
}

export default forum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bouton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    width: '50%' ,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boutonAdd: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: 'white',
  }
});