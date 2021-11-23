import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import EventButton from './EventButton';
import * as firebase from 'firebase';

const deleteEventById = async (id) => {
    try {
        await firebase.firestore().collection("Ajouts").doc(id).delete();
        alert(`${id} supprimé`)//nom de l'event à mettre dans l'alert
    }
    catch (e) {
        console.log("Erreur dans la suppression d'un event dans le forum:\n", e)
        return
    }
    finally {
        console.log("delete event:", id)
    }
}

const generateUserEvent = (id) => {
    //console.log(id)
    const db = firebase.firestore();
    let tabInfos = []
    const [user, setUser] = useState()
    const ref = db.collection("users").doc(id);

    ref.get().then((doc) => {
        setUser(doc.data())
    })

    if (user != undefined) {
        if (user.image == "")
            user.image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60,
                            borderColor: '#dddddd',
                            borderWidth: 1,
                            flexDirection: 'row'
                        }}
                        source={{ uri: user.Image }} />
                    <Text>{user.FirstName} {user.LastName}</Text>
                </View>
            </View>
        )
    }
}

const Event = ({ item, navigation, nomPage, userInfo, uid }) => {
    /*--variables--*/
    let description = ""
    let deleteButton = <View></View>
    let editButton = <View></View>
    let infosUser = <View></View>

    if (item.Description != null || item.Description != undefined)
        description = item.Description
    else
        description = ""

    /*ADMIN OU SON PROPRE EVENT */
    if (userInfo != undefined) {
        if ((userInfo.isAdmin || userInfo.id == uid) && nomPage != "Calendrier") {
            deleteButton = (
                <View>
                    {/* Bouton pour lenlever' */}
                    <TouchableOpacity style={styles.boutonDelete} onPress={() => {
                        deleteEventById(item.nom);
                        navigation.navigate("Forum")
                        }}>
                        <Text>🗑️</Text>
                    </TouchableOpacity>
                </View>)
            editButton = (
                <View>
                    <TouchableOpacity style={styles.boutonEdit} onPress={() => navigation.navigate("EditEventScreen", { id: item.nom })}>
                        <Text>✎</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        if (nomPage != "Calendrier") {
            //si c'est lui même
            if (userInfo.Image == "")
                userInfo.Image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

            if (userInfo.id == uid) {
                infosUser = (
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Par vous</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 60,
                                    borderColor: '#dddddd',
                                    borderWidth: 1,
                                    flexDirection: 'row',
                                    backgroundColor: 'grey'
                                }}
                                source={{ uri: userInfo.Image }} />
                        </View>
                    </View>

                )
            }
            else {
                infosUser = (generateUserEvent(uid))
            }
        }
    }

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'column', width: '100%' }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    {infosUser}
                </View>
                {/* titre */}
                <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: '#dcdcdc', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={styles.titre}>{item.nom}</Text>
                    {/* <Text>{item.Date}</Text> */}
                </View>

                {/* description */}
                <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                    <Text>
                        {description}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <EventButton navigation={navigation} item={item} nomPage={nomPage} />
                    {/* EDIT */}
                    {editButton}
                    {/* DELETE */}
                    {deleteButton}
                </View>
            </View>
        </View>
    )
}

export default Event;

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
    }
})