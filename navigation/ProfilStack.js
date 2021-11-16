import React from "react";
import { View, StyleSheet } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";

import SelectPhotos from '../screens/SelectPhotos'
import forum from "../screens/Forum";
import Profil from "../tabs/Profil";

const ProfilStack = createStackNavigator();

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

const AppStack = () => {
    return (
        <ProfilStack.Navigator styles={styles.container}>
            <ProfilStack.Screen
                name="Profil"
                component={Profil}
                options={{ headerShown: false }}
            />
            <ProfilStack.Screen
                name="SelectPhotos"
                component={SelectPhotos}
                options={headerManager("PHOTO")}
            />
        </ProfilStack.Navigator>
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