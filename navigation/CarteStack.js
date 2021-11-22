import React from "react";
import { View, StyleSheet } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import sportsScreen from '../screens/sportsScreen';
import AttractionScreen from "../screens/AttractionScreen";
import FestivalsScreen from "../screens/FestivalsScreen";
import IdéeDateScreen from "../screens/IdéeDateScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import PartyScreen from "../screens/PartyScreen";
import carte from "../tabs/Carte";

const Carte = createStackNavigator();

const AppStack = () => {
    return (
        <Carte.Navigator styles={styles.container}>
            <Carte.Screen
                name="Carte"
                component={carte}
                options={{ headerShown: false }}
            />
            <Carte.Screen
                name="sportsScreen"
                component={sportsScreen}
                options={{ headerShown: false }}
            />
            <Carte.Screen
                name="AttractionScreen"
                component={AttractionScreen}
                options={{ headerShown: false }}
            />
            <Carte.Screen
                name="FestivalsScreen"
                component={FestivalsScreen}
                options={{ headerShown: false }}
            /><Carte.Screen
                name="IdéeDateScreen"
                component={IdéeDateScreen}
                options={{ headerShown: false }}
            />
            <Carte.Screen
                name="RestaurantScreen"
                component={RestaurantScreen}
                options={{ headerShown: false }}
            />
            <Carte.Screen
                name="PartyScreen"
                component={PartyScreen}
                options={{ headerShown: false }}
            />
        </Carte.Navigator>
    )
}

export default AppStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})