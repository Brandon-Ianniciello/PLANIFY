import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import MapView, { Polygon, Polyline, Marker } from 'react-native-maps';
import Header from '../components/Header';

/*-------*/
const carte = ({ route, navigation }) => {

    let évènement = route.params
    let DELTA = 0.02
    let LAT = 45.6422237
    let LONG = -73.8446587
    let initialRegion = {
        longitude: LONG,
        latitude: LAT,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA
    }

    const erase = () => {
        initialRegion.latitude = 45.6422237
        initialRegion.longitude = -73.8446587
    }

    if (évènement != undefined || évènement != null) {
        let latitudeEvent = évènement.latitude
        let longitudeEvent = évènement.longitude
        let nom = évènement.nom
        let page = évènement.page
        initialRegion.latitude = latitudeEvent
        initialRegion.longitude = longitudeEvent

        return (
            <View>
                <Header title="carte" />
                <Button title={'⬅️ Retour à ' + nom} onPress={() => { navigation.navigate(page); }} />
                {/* <Button title={'CLEAR'} onPress={() => { return }} /> */}
                <MapView
                    style={styles.mapStyle}
                    initialRegion={initialRegion}>
                    <MapView.Marker coordinate={{ latitude: latitudeEvent, longitude: longitudeEvent }} />
                </MapView>

            </View>
        )
    }

    return (
        <View>
            <Header title="carte" />
            <MapView
                style={styles.mapStyle}
                initialRegion={initialRegion}>
            </MapView>
        </View>
    )


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
    }
});