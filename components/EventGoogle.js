import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import EventButton from './EventButton';
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as firebase from 'firebase';


const EventGoogle = ({ item, navigation, nomPage }) => {

    /*--variables--*/
    let name = item.name
    let rating = item.rating
    let location = item.vicinity
    let type = item.types[1]
    let photo = item.photos

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'column' }}>

                {/* titre */}
                <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: '#dcdcdc', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={styles.titre}>{name}</Text>
                    
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                </View>
                {/* description */}
                <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                    <Text style={{ fontSize: 20, alignItems: 'center' }}>{location}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                    {/* <Text style={{fontSize: 20}}>Rating: {rating}</Text> */}
                    <Rating
                        type='star'
                        ratingCount={rating}
                        imageSize={20}
                        showRating
                        readonly
                    />
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                    <Text style={{ fontSize: 20 }}>Type :{type}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                    <EventButton navigation={navigation} item={item} nomPage={nomPage} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                </View>
            </View>
        </View>
    )
}

export default EventGoogle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    liste: {
        flexDirection: "column",
        backgroundColor: '#dcdcdc'
    },
    titre: {
        fontSize: 25,
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    item: {
        margin: 0,
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%'
    },
    boutonCRUD: {
        paddingHorizontal: 2,
        paddingVertical: 10,
        marginRight: 45,
    },
    logo: {
        width: 66,
        height: 58,
    }
})