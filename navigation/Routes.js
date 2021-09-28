import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import auth from '@react-native-firebase/auth'
import firebase from "../firebase/fire"

import AppStack from './AppStack'
import AuthStack from "./AuthStack";

const Routes = () => {

    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if(initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    if(initializing) return null;

    return(
        <NavigationContainer>
            { user ? <AppStack/> : <AuthStack/> }
        </NavigationContainer>
    )
}

export default Routes;