import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import EventButton from './EventButton';
import { Rating, AirbnbRating } from 'react-native-ratings';

const EventGoogle = ({ item, navigation, nomPage }) => {

    let open_hours = ''

    if(item.opening_hours !== undefined){
        open_hours = item.opening_hours
    }


    /*--variables--*/
    let name = item.name;
    let rating = item.rating;
    let location = item.vicinity;
    let type = item.types[1];
    let photo = "";
    let open = open_hours['open_now'];
    if (item.photos != undefined)
        photo = item.photos[0]
    else
        photo = ""
    const API_KEY = "AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U"

    if (open === true) {
        return (
            <View style={styles.item}>
                <View style={{ flexDirection: 'column' }}>

                    {/* titre */}
                    <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: '#dcdcdc', borderBottomWidth: 1, alignItems: 'center' }}>
                        <Text style={styles.titre}>{name}</Text>

                        <View style={{ flexDirection: 'row' }}>
                        </View>
                    </View>

                    {/* Image */}
                    <View style={{ width: 200, height: 90, }}>
                        <Image style={{ width: 200, height: 100 }}
                            source={{
                                uri:
                                    ('https://maps.googleapis.com/maps/api/place/photo' +
                                        '?maxwidth=400' +
                                        '&photo_reference=+' + photo.photo_reference +
                                        '&key=' + API_KEY)
                            }} />
                    </View>
                    {/* description */}
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                        <Text style={{ fontSize: 20, alignItems: 'center' }}>{location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 0, paddingBottom: 10, width: '100%' }}>
                        {/* <Text style={{fontSize: 20}}>Rating: {rating}</Text> */}
                        <AirbnbRating
                            count={5}
                            defaultRating={rating}
                            isDisabled={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                        <Text style={{ fontSize: 20,fontWeight:'bold',color:'#00b300' }}>OUVERT</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%',borderTopColor:'#dcdcdc',borderTopWidth:1 }}>
                        <EventButton navigation={navigation} item={item} nomPage={nomPage} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                </View>
            </View>
        )
    }else if(open === false){
        return (
            <View style={styles.item}>
                <View style={{ flexDirection: 'column' }}>

                    {/* titre */}
                    <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: '#dcdcdc', borderBottomWidth: 1, alignItems: 'center' }}>
                        <Text style={styles.titre}>{name}</Text>

                        <View style={{ flexDirection: 'row' }}>
                        </View>
                    </View>

                    {/* Image */}
                    <View style={{ width: 200, height: 90, }}>
                        <Image style={{ width: 200, height: 100 }}
                            source={{
                                uri:
                                    ('https://maps.googleapis.com/maps/api/place/photo' +
                                        '?maxwidth=400' +
                                        '&photo_reference=+' + photo.photo_reference +
                                        '&key=' + API_KEY)
                            }} />
                    </View>
                    {/* description */}
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                        <Text style={{ fontSize: 20, alignItems: 'center' }}>{location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 0, paddingBottom: 10, width: '100%' }}>
                        {/* <Text style={{fontSize: 20}}>Rating: {rating}</Text> */}
                        <AirbnbRating
                            count={5}
                            defaultRating={rating}
                            isDisabled={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                        <Text style={{ fontSize: 20,fontWeight:'bold',color:'#991f00' }}>FERMER</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%',borderTopColor:'#dcdcdc',borderTopWidth:1 }}>
                        <EventButton navigation={navigation} item={item} nomPage={nomPage} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.item}>
                <View style={{ flexDirection: 'column' }}>

                    {/* titre */}
                    <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: '#dcdcdc', borderBottomWidth: 1, alignItems: 'center' }}>
                        <Text style={styles.titre}>{name}</Text>

                        <View style={{ flexDirection: 'row' }}>
                        </View>
                    </View>

                    {/* Image */}
                    <View style={{ width: 200, height: 90, }}>
                        <Image style={{ width: 200, height: 100 }}
                            source={{
                                uri:
                                    ('https://maps.googleapis.com/maps/api/place/photo' +
                                        '?maxwidth=400' +
                                        '&photo_reference=+' + photo.photo_reference +
                                        '&key=' + API_KEY)
                            }} />
                    </View>
                    {/* description */}
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                        <Text style={{ fontSize: 20, alignItems: 'center' }}>{location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 0, paddingBottom: 10, width: '100%' }}>
                        {/* <Text style={{fontSize: 20}}>Rating: {rating}</Text> */}
                        <AirbnbRating
                            count={5}
                            defaultRating={rating}
                            isDisabled={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%',borderTopColor:'#dcdcdc',borderTopWidth:1 }}>
                        <EventButton navigation={navigation} item={item} nomPage={nomPage} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                </View>
            </View>
        )
    }
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