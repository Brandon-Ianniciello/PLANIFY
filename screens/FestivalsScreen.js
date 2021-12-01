import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import FlatListGoogleEvents from '../components/FlatListGoogleEvents';
import PlanifyIndicator from '../components/PlanifyIndicator';
import useGeoLocation from '../utils/getGeoLocation';
import EventGoogle from '../components/EventGoogle';

const FestivalsScreen = ({ route, navigation }) => {

  let distance = 30//30km
  const [amusementPark, setParks] = useState(null)

  const location = useGeoLocation()

  const API_KEY = "AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U"

  const latitude = location.latitude;
  const longitude = location.longitude;

  let radMetter = distance * 1000;

  const urlParks = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
    latitude + ',' + longitude + '&radius=' + radMetter + '&type=' + 'amusement_park' + '&key=' + API_KEY

  useEffect(async () => {
    const rP = await fetch(urlParks);
    const dP = await rP.json();
    setParks(dP)
  }, [])

  if (amusementPark != undefined ) {
    return (
      <ScrollView>
        <View style={styles.liste}>
          <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: 'bold', marginTop: 10 }}>Centres d'amusements proches</Text>
          <FlatList
            data={amusementPark.results}
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
  else if (amusementPark == null || amusementPark == undefined) {
    return (<PlanifyIndicator />
    )
  }
}

export default FestivalsScreen;

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