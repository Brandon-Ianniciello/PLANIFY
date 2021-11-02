import React, { useState, useContext } from "react";

import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Textarea from 'react-native-textarea';
import * as firebase from 'firebase';
import { AuthContext } from '../navigation/AuthProvider';


function addEvent(titre,description, user) {
    const db = firebase.firestore();
    return db.collection('Ajouts').doc(titre).set({
        nom: titre,
        Description:description,
        Date: new Date(),
        uId: user.uid
    })
}

const AddEventScreen = ({navigation}) => {
    /*
        1.Titre de l'évènement
        2.Date
        3.Id du user, mais cachée
        4.Contenu
        5.image, facultatif
        6.Description
        7.Localisation
    */
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const { user, logout } = useContext(AuthContext);

    function erase(){
        setDescription("")
        setTitre("")
        navigation.navigate("Forum")
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
            <TouchableOpacity style={styles.bouton} onPress={() => {addEvent(titre,description, user);erase()}}>
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