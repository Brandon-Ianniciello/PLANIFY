import React, { useState, useContext } from "react";

import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Textarea from 'react-native-textarea';
import * as firebase from 'firebase';
import { AuthContext } from '../navigation/AuthProvider';
import useGeoLocation from "../utils/getGeoLocation";

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
    const db = firebase.firestore();

    function addEvent(titre, description, catégorie, user) {
        if (titre == "" || titre == undefined || titre == null) {
            alert("TITRE VIDE...🤔")
        }
        else if (catégorie == "" || catégorie == undefined || catégorie == null) {
            alert("CATÉGORIE VIDE... 🤔")
        }
        //let loc = useGeoLocation()
        try {
            return db.collection('Ajouts').doc(titre).set({
                nom: titre,
                Description: description,
                Date: new Date().toISOString().split('T')[0],
                User: user.uid,
                Catégorie: catégorie
                //localisation: loc
            }).then(
                console.log(titre, " add in db")
            ).catch(
                console.log("ERREUR DANS L'AJOUT D'UN EVENT:", e)
            )
        } catch (e) {
            console.log("ERREUR DANS L'AJOUT D'UN EVENT:", e)
        }
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
            <TouchableOpacity style={styles.bouton} onPress={() => { addEvent(titre, description, catégorie, user); navigation.navigate('Forum') }}>
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