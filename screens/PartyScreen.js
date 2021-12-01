import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import PlanifyIndicator from "../components/PlanifyIndicator";
import FlatListGoogleEvents from '../components/FlatListGoogleEvents';

const PartyScreen = ({ navigation, route }) => {
    if (route.params != undefined) {
        if (barsAndCasino != undefined || barsAndCasino != null) {
            return (
                <View style={styles.container}>
                    <FlatListGoogleEvents data={barsAndCasino.results} navigation={navigation} />
                </View>
            )
        }
    }
    else if (route.params == undefined || route.params == null) {
        return (
            <View style={styles.container}>
                <PlanifyIndicator />
            </View>
        )
    }
}
export default PartyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});