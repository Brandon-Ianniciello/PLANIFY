import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

import GetData from '../utils/GetData';
import * as firebase from 'firebase';

import FlatListEvent from '../components/FlatListEvent';

const IdéesDateScreen = ({ navigation }) => {
    //Création de la base de données
    const [dates, setDates] = useState([])

    const getDates = async () => {
        const db = firebase.firestore();
        const response = db.collection('Rencards');
        const data = await response.get();
        let R = []
        data.docs.forEach(item => {
            R.push(item.data())
        })
        setDates(R)
    }

    useEffect(() => {
        setDates(null)
        //setFestivals(GetData('Festivals'))
        getDates()
    }, []);

    if (dates != undefined || dates != null) {
        return (
            <View style={styles.container}>
                <FlatListEvent navigation={navigation} nomPage={"IdéeDateScreen"} data={dates}/>
            </View>
        )
    }
    else if (dates == undefined || dates == null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} color="black" size="large" />
            </View>
        )
    }
}


export default IdéesDateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});