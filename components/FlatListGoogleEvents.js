import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import Event from '../components/Event';
import EventGoogle from '../components/EventGoogle';
import { AuthContext } from '../navigation/AuthProvider';

const FlatListGoogleEvents = ({ eventClique,data, navigation }) => {
    const D = data

    if(eventClique==undefined)
        eventClique = "vous"
    else if(eventClique!=undefined)
        eventClique = eventClique.description
    if (D != null || D != undefined) {
        return (
            <View style={styles.container}>
                <View style={styles.liste}>
                    <Text style={{fontSize: 25,paddingLeft: 5,fontWeight: 'bold',marginTop:10}}>Proche de {eventClique}</Text>
                    <FlatList
                        data={D}
                        refreshing={true}
                        keyExtractor={item => item.place_id}
                        renderItem={({ item }) => {
                            return (
                                <EventGoogle item={item} navigation={navigation}/>
                            )
                        }
                        }
                    />
                </View>
            </View>
        )
    }
    return (<ActivityIndicator animating={true} color="black" size="large" />)

}


export default FlatListGoogleEvents;

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
})