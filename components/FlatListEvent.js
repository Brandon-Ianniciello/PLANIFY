import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import EventButton from './EventButton';

const deleteEventById = async (id) => {
    await firebase.firestore().collection("Ajouts").doc(id).delete();
    return id;
}

const Event = ({ item, navigation, nomPage, id, userInfo }) => {
    /*--variables--*/
    let description = ""

    if (item.Description != null || item.Description != undefined)
        description = item.Description
    else
        description = ""
        return (
            <View style={styles.item}>
                <View style={{ flexDirection: 'column' }}>
                    {/* titre */}
                    <View style={{flexDirection:'row', width:'100%', borderBottomColor:'#dcdcdc', borderBottomWidth:1,}}>
                        <Text style={styles.titre}>{item.nom}</Text>
                        <View style={{ flexDirection: 'row' }}>
                {/* Bouton pour lenlever' */}
                <TouchableOpacity style={styles.boutonCRUD} onPress={() => deleteEventById(id)}>
                    <Text>🗑️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boutonCRUD} onPress={() => navigation.navigate("EditEventScreen", { id: item.nom })}>
                    <Text>✎</Text>
                </TouchableOpacity>
            </View>
                        {/* Bouton pour lenlever' */}
                        {/* <TouchableOpacity style={styles.boutonDelete} onPress={()=>console.log("delete",item.nom)}>
                            <Text>🗑️</Text>
                        </TouchableOpacity> */}
                    </View>
                    {/* description */}
                    <View style={{ flexDirection: 'row',paddingLeft:10,paddingTop:10,paddingBottom:10,width:'100%' }}>
                        <Text >
                            {description}
                        </Text>
                    </View>
                    <View style={{borderTopColor:'#dcdcdc',borderTopWidth:1}}>
                        <EventButton navigation={navigation} item={item} nomPage={nomPage} />
                    </View>
                </View>
            </View>
        )
    }

const FlatListEvent = ({ data, navigation,userInfo, nomPage }) => {
    const D = data
    console.log("DAns la flatlist:",userInfo)
    id = 1

    if (D != null || D != undefined) {
        return (
            <View style={styles.container}>
                <View style={styles.liste}>
                    <FlatList
                        data={D}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Event item={item} navigation={navigation} nomPage={nomPage} id={id++} userInfo={userInfo} />
                            )
                        }
                        }
                    />
                </View>
            </View>
        )
    }
    else if ((D == null || D == undefined) && (userInfo == null || userInfo == undefined)) {
        return (<ActivityIndicator animating={true} color="black" size="large" />)
    }
}

export default FlatListEvent;

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
        fontSize:25,
        paddingLeft:5
    },
    item: {
        borderColor:'black',
        margin:0,
        marginTop:15,
        flexDirection:'row',
        backgroundColor: 'white',
        width:'100%'
    },
    boutonCRUD: {
        paddingHorizontal: 2,
        paddingVertical: 10,
        marginRight: 45,
    }
})