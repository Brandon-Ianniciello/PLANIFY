import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";

import AppStack from './AppStack'
import AuthStack from "./AuthStack";

const Routes = () => {
    return(
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    )
}

export default Routes;