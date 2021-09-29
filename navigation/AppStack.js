import React from "react";
import { View, StyleSheet } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../screens/HomeScreen'
import sportsScreen from '../screens/sportsScreen';
import AttractionScreen from "../screens/AttractionScreen";
import FestivalsScreen from "../screens/FestivalsScreen";
import IdéeDateScreen from "../screens/IdéeDateScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import PartyScreen from "../screens/PartyScreen";

const App = createStackNavigator();

const AppStack = () => {
    return (
        <App.Navigator styles={styles.container}>
            <App.Screen
             name="HomeScreen"
             component={HomeScreen}
             options={{headerShown: false}}
            />
            <App.Screen
             name="sportsScreen"
             component={sportsScreen}
            />
            <App.Screen
             name="AttractionScreen"
             component={AttractionScreen}
            />
            <App.Screen
             name="FestivalsScreen"
             component={FestivalsScreen}
            /><App.Screen
             name="IdéeDateScreen"
             component={IdéeDateScreen}
            />
            <App.Screen
             name="RestaurantScreen"
             component={RestaurantScreen}
            />
             <App.Screen
             name="PartyScreen"
             component={PartyScreen}
            />
            
        </App.Navigator>
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