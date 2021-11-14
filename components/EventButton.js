import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const EventButton = ({ navigation, item, nomPage }) => {
    let boutonCarte = <View></View>
    if (item.localisation != undefined) {
        boutonCarte = (
            <View style={styles.bouton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Carte", {
                        nom: item.nom,
                        page: nomPage,
                        longitude: item.localisation.longitude,
                        latitude: item.localisation.latitude
                    })}>
                    <Ionicons name={'md-map'} size={20} color={'gray'} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {boutonCarte}
            <View style={styles.bouton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Calendrier", {
                        page: nomPage,
                        event: item
                    })} >
                    <Ionicons name={'calendar-outline'} size={20} color={'gray'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EventButton

const styles = StyleSheet.create({
    bouton: {
        paddingHorizontal: 90,
        paddingVertical: 5,
        borderRadius: 15,
        color: 'white'
    }
});