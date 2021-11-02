import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const EventButton = ({navigation,item,nomPage}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.bouton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Carte", {
                        nom: item.nom,
                        page: nomPage,
                        longitude: item.localisation.longitude,
                        latitude: item.localisation.latitude
                    })}>
                    <Text>Trouver sur la carte</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bouton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Calendrier", {
                        page: nomPage,
                        event: item
                    })} >
                    <Text>Ajouter sur le calendrier</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EventButton

const styles = StyleSheet.create({
    bouton: {
        backgroundColor: "#00a46c",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        color: 'white'
    }
});