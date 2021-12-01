import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import FlatListGoogleEvents from '../components/FlatListGoogleEvents';
import PlanifyIndicator from '../components/PlanifyIndicator';
import useGeoLocation from '../utils/getGeoLocation';
import EventGoogle from '../components/EventGoogle';

const AttractionScreen = ({ route, navigation }) => {

  let distance = 30//30km
  const [art, setArt] = useState(null)
  const [aquariums,setAquauriums]= useState(null)

  const location = useGeoLocation()

  const API_KEY = "AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U"

  const latitude = location.latitude;
  const longitude = location.longitude;

  let radMetter = distance * 1000;

  const urlArts = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
    latitude + ',' + longitude + '&radius=' + radMetter + '&type=' + 'art_gallery' + '&key=' + API_KEY

  const urlAquarium = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
  latitude + ',' + longitude + '&radius=' + radMetter + '&type=' + 'aquarium' + '&key=' + API_KEY

  useEffect(async () => {

    const rA = await fetch(urlArts);
    const dA = await rA.json();
    setArt(dA)

    const rAqua = await fetch(urlAquarium);
    const dAqua = await rAqua.json();
    setAquauriums(dAqua)
  }, [])

  if (aquariums != undefined && art != undefined ) {
    return (
      <ScrollView>
        <View style={styles.liste}>
          <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: 'bold', marginTop: 10 }}>Aquariums proches</Text>
          <FlatList
            data={aquariums.results}
            refreshing={true}
            renderItem={({ item }) => {
              return (
                <EventGoogle item={item} navigation={navigation} nomPage={"FlatListGoogle"} />
              )
            }
            }
          />
        </View>
        <View style={styles.liste}>
          <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: 'bold', marginTop: 10 }}>Stations d'arts proches</Text>
          <FlatList
            data={art.results}
            refreshing={true}
            renderItem={({ item }) => {
              return (
                <EventGoogle item={item} navigation={navigation} nomPage={"FlatListGoogle"} />
              )
            }
            }
          />
        </View>
      </ScrollView>
    )
  }
  else if (aquariums == null || art == undefined) {
    return (<PlanifyIndicator />
    )
  }
}

export default AttractionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  liste: {
    flexDirection: "column",
    backgroundColor: '#dcdcdc'
  }
});