import React, { useState, useContext, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Textarea from 'react-native-textarea';
import * as firebase from 'firebase';
import { AuthContext } from '../navigation/AuthProvider';

const EditEventScreen = ({ route, navigation,userInfo }) => {
    const [event, setEventInfo] = useState(route.params.event)
    const [ancienTitre, setAncienTitre] = useState(route.params.event.nom)
    const [titre, setTitre] = useState(route.params.event.nom)
    const [description, setDescription] = useState(route.params.event.Description)
    const [catégorie, setCatégorie] = useState(route.params.event.Catégorie)

    function editEvent(titre, description, catégorie, userInfo) {
        const db = firebase.firestore();

        db.collection('Ajouts').doc(ancienTitre).set({
            Description: description,
            nom: titre,
            Catégorie: catégorie,
            Date: new Date(),
            user: userInfo.id
        })
    }

    function setValues() {
        setAncienTitre(event.nom)
        setCatégorie(event.Catégorie)
        setTitre(event.nom)
        setDescription(event.Description)
    }

    function erase() {
        setDescription("")
        setTitre("")
        setCatégorie("")
        navigation.navigate("Forum")
    }

    useEffect(() => {
        if (route.params != undefined)
            setEventInfo(route.params.event)
        //charge les infos de l'event
        setValues()
    }, []);

    return (
        <View style={styles.container}>
            {/* Titre de l'event */}
            <View style={styles.action}>
                <TextInput
                    value={titre}
                    onChangeText={(txt) => setTitre(txt)}
                    style={styles.input}
                    numberOfLines={1}
                    placeholder={"Titre"}
                    placeholderTextColor="#666"
                />
            </View>
            {/* à remplacer par une dropdownlist de tout les catégorie */}
            <View style={styles.action}>
                <TextInput
                    value={catégorie}
                    onChangeText={(txt) => setCatégorie(txt)}
                    style={styles.input}
                    numberOfLines={1}
                    placeholder={"Catégorie"}
                    placeholderTextColor="#666"
                />
            </View>

            {/* Description */}
            <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={(txt) => setDescription(txt)}
                defaultValue={description}
                maxLength={120}
                placeholder={'Description...'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
            />
            <TouchableOpacity style={styles.bouton} onPress={() => { editEvent(titre, description, catégorie, userInfo); erase() }}>
                <Text>Modifier</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditEventScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    bouton: {
        backgroundColor: "#00a46c",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        color: 'white',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'sans-serif',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    action: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    textarea: {
        textAlignVertical: 'top',
        height: 170,
        fontSize: 14,
        color: '#333',
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    }
})