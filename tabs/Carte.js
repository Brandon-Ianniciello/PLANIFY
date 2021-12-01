import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, SliderComponent } from 'react-native';
import MapView, { Callout, Circle, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../components/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import useGeoLocation from '../utils/getGeoLocation';
import Slider from '@react-native-community/slider';

const fetchData = (location, distance, type) => {
    const [data, setData] = useState(null);
    const API_KEY = "AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U"
    const latitude = location.latitude;
    const longitude = location.longitude;
    let radMetter = distance * 1000;

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
        latitude + ',' + longitude + '&radius=' + radMetter + '&type=' + type + '&key=' + API_KEY

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(url);
            const data = await resp.json();
            setData(data)
        }

        fetchData()
    }, [])
    return data;
}

const carte = ({ route, navigation }) => {

    let initialRegion = {
        longitude: -73.8423519855052,
        latitude: 45.642249982790126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    }

    let évènement = route.params
    let latitudeEvent = initialRegion.latitude
    let longitudeEvent = initialRegion.longitude
    let nom = ""
    let page = "HomeScreen"

    const API_KEY = "AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U"
    
    const [region, setRegion] = useState({ latitude: 45.642249982790126, longitude: -73.8423519855052 })
    const [eventSelectionné, setEventSélectionné] = useState()
    const [eventDetails, setDetails] = useState(null)
    const [distance, setDistance] = useState(30)//30km

    const location = useGeoLocation()
    let defaut = fetchData(location,distance,'establishment')

    if (route.params != undefined) {
        if (route.params.latitude != undefined && route.params.longitude != undefined) {
            latitudeEvent = route.params.latitude
            longitudeEvent = route.params.longitude
        }
        if (route.params.nom != undefined)
            nom = route.params.nom
        if (route.params.page != undefined)
            page = route.params.page
    }
    if (évènement != undefined || évènement != null) {
        initialRegion.latitude = latitudeEvent
        initialRegion.longitude = longitudeEvent
        return (
            <View style={{ marginTop: 50, flex: 1 }}>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => { évènement = null; navigation.navigate('Carte'); }}
                        style={styles.boutonRetour}>
                        <Text style={{ textAlign: 'center' }}>
                            Retourner à l'endroit de départ
                        </Text>
                    </TouchableOpacity>
                </View>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    provider="google">
                    <MapView.Marker
                        coordinate={{ latitude: latitudeEvent, longitude: longitudeEvent }}
                    />
                </MapView>
            </View>
        )

    }
    else if (évènement == undefined || évènement == null) {
        return (
            <View style={{ marginTop: 50, flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder='Recherche'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        setEventSélectionné(data)
                        setDetails(details)
                        console.log("DETAILS:",details)
                        console.log("EVENT SÉLECTIONNER",data)
                        setRegion({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        })
                        initialRegion.latitude = region.latitude
                        initialRegion.longitude = region.longitude
                    }}
                    query={{
                        key: 'AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U',
                        language: 'fr',
                        types: 'establishment',
                        radius: distance*1000,
                        location: `${region.latitude}, ${region.longitude}`
                    }}
                    styles={{
                        container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                        listView: { backgroundColor: "white" }
                    }}
                />
                <View style={{
                    margin:40,alignItems:'center',flexDirection:'row'
                }}>
                    <Text>{distance} km</Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={5}
                        maximumValue={50}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        defaultValue={30}
                        aria-label="Default" 
                        valueLabelDisplay="auto"
                        step={5}
                        onValueChange={(v)=>setDistance(v)}
                        value={distance}
                    />
                    <Text>Rayon de recherche</Text>
                </View>

                <MapView
                    style={styles.mapStyle}
                    region={region}
                    showsUserLocation={true}
                    provider='google'>
                    <MapView.Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                        onPress={() => {
                            navigation.navigate("HomeScreen", { event: defaut,eventClique:eventSelectionné,details:eventDetails})
                        }}
                    />
                    <Polyline coordinates={[
                        { latitude: initialRegion.latitude, longitude: initialRegion.longitude },
                        { latitude: region.latitude, longitude: region.longitude }
                    ]} />
                </MapView>
            </View>
        )
    }
}

export default carte;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    boutonRetour: {
        backgroundColor: "#00a46c",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        color: 'white',
        alignContent: 'center'
    },
    boldText: {
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
    },
});