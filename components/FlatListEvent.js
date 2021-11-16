import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import Event from '../components/Event';
import { AuthContext } from '../navigation/AuthProvider';

const deleteEventById = async (id) => {
    console.log("delete event:",id)
    await firebase.firestore().collection("Ajouts").doc(id).delete();
    return id;
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
                        refreshing={true}
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
    }
})