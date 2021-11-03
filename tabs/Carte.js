import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import MapView, { Callout, Circle, Polygon, Polyline } from 'react-native-maps';
import Header from '../components/Header';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const API_KEY = "AIzaSyCEY83Y-5Rehs-Ha-2Vklocapm72B1B43M"

const carte = ({ route, navigation }) => {

    let initialRegion = {
        longitude: -73.8423519855052,
        latitude: 45.642249982790126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    }

    let évènement = null
    let latitudeEvent = initialRegion.latitude
    let longitudeEvent = initialRegion.longitude
    let nom = ""
    let page = "HomeScreen"

    if (route.params != undefined) {
        évènement = route.params
        if (route.params.latitude != undefined || route.params.longitude != undefined) {
            latitudeEvent = route.params.latitude
            longitudeEvent = route.params.longitude
        }
        if (route.params.nom != undefined)
            nom = route.params.nom
        if (route.params.page != undefined)
            page = route.params.page
    }

    const [pin, setPin] = useState({ latitude: initialRegion.latitude, longitude: initialRegion.longitude })
    const [region, setRegion] = useState({ latitude: initialRegion.latitude, longitude: initialRegion.longitude })

    //si le user a cliqué sur "Trouver sur la carte"
    if (évènement != undefined || évènement != null) {

        initialRegion.latitude = latitudeEvent
        initialRegion.longitude = longitudeEvent
        return (
            <View style={{ marginTop: 50, flex: 1 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Header title="carte" />
                    <TouchableOpacity onPress={() => {
                        évènement = null
                        navigation.navigate(page);
                    }}
                        style={styles.boutonRetour}
                    >
                        <Text style={{ textAlign: 'center' }}>
                            Retourner à {nom}
                        </Text>
                    </TouchableOpacity>
                </View>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    provider="google">
                    <MapView.Marker coordinate={{ latitude: latitudeEvent, longitude: longitudeEvent }} />
                </MapView>
            </View>
        )

    }
    else if (évènement == undefined || évènement == null) {
        return (
            <View style={{ marginTop: 50, flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: "distance"
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: API_KEY,
                        language: 'en',
                        components: "country:ca",
                        types: "establishment",
                        radius: 30000,
                        location: `${region.latitude}, ${region.longitude}`
                    }}
                    styles={{
                        container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                        listView: { backgroundColor: "white" }
                    }}
                />
                <MapView
                    style={styles.mapStyle}
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    provider="google">
                    <MapView.Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} draggable
                        onDragEnd={(e) => {
                            setPin({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            })
                        }}>
                    </MapView.Marker>
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
        justifyContent: 'center'
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
    }
});