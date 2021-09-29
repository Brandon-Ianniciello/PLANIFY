import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Polygon, Polyline, Marker } from 'react-native-maps';

const initialRegion = {
    longitude: -73.8446587,
    latitude: 45.6422237,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
}

const carte = () => {
    return (
        <MapView
            style={styles.mapStyle}
            initialRegion={initialRegion}>
        </MapView>
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