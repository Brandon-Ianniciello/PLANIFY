import React, { useState, useContext } from "react";

import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Textarea from 'react-native-textarea';
import * as firebase from 'firebase';
import { AuthContext } from '../navigation/AuthProvider';
//import Geolocation from '@react-native-community/geolocation';

const AddEventScreen = ({ navigation, route }) => {
    /*
        1.Titre de l'évènement
        2.Date
        3.Id du user, mais cachée
        4.Contenu
        5.image, facultatif
        6.Description
        7.Localisation
        8.Catégorie
    */
    const [titre, setTitre] = useState("")
    const [catégorie, setCatégorie] = useState("")
    const [description, setDescription] = useState("")
    const { user, logout } = useContext(AuthContext);

    const uid = user.uid;


    // let id = route.params.id
    // console.log(id)
    //Geolocation.getCurrentPosition(info => console.log(info));
    function erase() {
        setDescription("")
        setTitre("")
        setCatégorie("")
        navigation.navigate("Forum")
    }

    function addEvent(titre, description, catégorie, user) {
        console.log('test')
        const db = firebase.firestore();
        if (titre == "" || titre == undefined || titre == null) {
            alert("TITRE VIDE...🤔")
            navigation.navigate("AddEventScreen")
            return
        }
        else if (description == "" || description == undefined || description == null) {
            alert("DESCRIPTION VIDE... 🤔")
            navigation.navigate("AddEventScreen")
            return
        }
        else if (catégorie == "" || catégorie == undefined || catégorie == null) {
            alert("CATÉGORIE VIDE... 🤔")
            navigation.navigate("AddEventScreen")
            return
        }

        console.log(titre, " add in db")
        return db.collection('Ajouts').doc(titre).set({
            nom: titre,
            Description: description,
            Date: new Date(),
            User: uid,
            // Catégorie: "catégorie"
            //localisation:{longitude:,latitude} de son cell
        })
    }

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
            <TouchableOpacity style={styles.bouton} onPress={() => { addEvent(titre, description, user); erase() }}>
                <Text>Ajouter</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddEventScreen;

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