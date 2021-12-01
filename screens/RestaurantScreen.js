import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import FlatListGoogleEvents from '../components/FlatListGoogleEvents';
import PlanifyIndicator from '../components/PlanifyIndicator';
import useGeoLocation from '../utils/getGeoLocation';
import EventGoogle from '../components/EventGoogle';

const RestaurantScreen = ({ route, navigation }) => {

  let distance = 30//30km
  const [bars, setBars] = useState(null)
  const [restaurants, setRestaurants] = useState(null)

  const location = useGeoLocation()

  const API_KEY = "AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U"

  const latitude = location.latitude;
  const longitude = location.longitude;

  let radMetter = distance * 1000;
  console.log("position:",latitude,longitude)

  const urlResto = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
    latitude + ',' + longitude + '&radius=' + radMetter + '&type=' + 'restaurant' + '&key=' + API_KEY

  const urlBars = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
    latitude + ',' + longitude + '&radius=' + radMetter + '&type=' + 'bar' + '&key=' + API_KEY

  useEffect(async () => {
    const rR = await fetch(urlResto);
    const dR = await rR.json();
    setRestaurants(dR)

    const rB = await fetch(urlBars);
    const dB = await rB.json();
    setBars(dB)
  }, [])

  if (restaurants != undefined && bars != undefined) {
    return (
      <ScrollView>
        <View style={styles.liste}>
          <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: 'bold', marginTop: 10 }}>Restaurants proches</Text>
          <FlatList
            data={restaurants.results}
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
          <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: 'bold', marginTop: 10 }}>Bars proches</Text>
          <FlatList
            data={bars.results}
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
  else if (bars == null || restaurants == undefined) {
    return (<PlanifyIndicator />
    )
  }
}

export default RestaurantScreen;

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