import React from "react";
import { View, StyleSheet } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";

import AddEventScreen from '../screens/AddEventScreen'
import forum from "../screens/Forum";

function headerManager(title){
    return(
        {
            headerStyle: {
                backgroundColor: "black"
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                textTransform: "uppercase",
                color: "white"
            },
            title:title
        }
    )
}

const Forum = createStackNavigator();

const AppStack = () => {
    return (
        <Forum.Navigator styles={styles.container}>
            <Forum.Screen
                name="Forum"
                component={forum}
                options={{ headerShown: false }}
            />
            <Forum.Screen
                name="AddEventScreen"
                component={AddEventScreen}
                options={headerManager("Ajout d'un Planify")}
            />

        </Forum.Navigator>
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