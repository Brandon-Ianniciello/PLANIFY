import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import EventButton from './EventButton';
import { AuthContext } from '../navigation/AuthProvider';

const deleteEventById = async (id) => {
    console.log("delete event:",id)
    await firebase.firestore().collection("Ajouts").doc(id).delete();
    return id;
}

const Event = ({ item, navigation, nomPage, userInfo, uid }) => {
    /*--variables--*/
    let description = ""
    let crudButton = <View></View>

    if (item.Description != null || item.Description != undefined)
        description = item.Description
    else
        description = ""

    /*ADMIN OU SON PROPRE EVENT */
    if (userInfo != undefined) {
        if (userInfo.isAdmin || userInfo.id == uid) {
            crudButton = (
                <View style={{ flexDirection: 'row' }}>
                    {/* Bouton pour lenlever' */}
                    <TouchableOpacity style={styles.boutonDelete} onPress={() => deleteEventById(item.nom)}>
                        <Text>🗑️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boutonEdit} onPress={() => navigation.navigate("EditEventScreen", { id: item.nom })}>
                        <Text>✎</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'column' }}>

                {/* titre */}
                <View style={{flexDirection:'row', width:'100%', borderBottomColor:'#dcdcdc', borderBottomWidth:1,}}>
                    <Text style={styles.titre}>{item.nom}</Text>
                </View>
                   


                {/* description */}
                <View style={{ flexDirection: 'row',paddingLeft:10,paddingTop:10,paddingBottom:10,width:'100%' }}>
                    <Text>
                        {description}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {/* Bouton pour modifier et supprimer un event*/}
                    {crudButton}
                    <EventButton navigation={navigation} item={item} nomPage={nomPage} />

                </View>
            </View>
        </View>
    )
}

const FlatListEvent = ({ data, navigation, nomPage }) => {
    const D = data
    id = 1

    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState()

    const getUserInfo = async () => {
        const db = firebase.firestore();
        const ref = db.collection("users").doc(user.uid);

        ref.get().then((doc) => {
            setUserInfo(doc.data())
        })
    }

    useEffect(() => {
        setUserInfo(null)
        getUserInfo()
    }, []);

    if (D != null || D != undefined) {
        getUserInfo()
        return (
            <View style={styles.container}>
                <View style={styles.liste}>
                    <FlatList
                        data={D}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Event item={item} navigation={navigation} nomPage={nomPage} userInfo={userInfo} uid={item.User} />
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