import React from "react";
import { View, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import calendrier from '../tabs/Calendrier';
import carte from '../tabs/Carte';
import profil from '../tabs/Profil';
import AppStack from './AppStack'
import ForumStack from "./ForumStack"


/*icons*/
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator styles={styles.container}
            screenOptions={({ route }) => ({
                activeTintColor: '#3EB489',
                inactiveTintColor: 'gray',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Carte')
                        iconName = focused ? 'md-map' : 'md-map-outline';
                    else if (route.name === 'Calendrier')
                        iconName = focused ? 'calendar-outline' : 'calendar-outline';
                    else if (route.name === 'Forum')
                        iconName = focused ? 'search-circle' : 'search-circle-outline';
                    else if (route.name === 'Profil')
                        iconName = focused ? 'ios-person' : 'person-circle';
                    else if (route.name == "Accueil")
                        iconName = focused ? "grid" : "home"

                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: '#3EB489',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Calendrier" component={calendrier} options={{ headerShown: false }} />
            <Tab.Screen name="Forum" component={ForumStack} options={{ headerShown: false }} />
            <Tab.Screen name="Accueil" component={AppStack} options={{ headerShown: false }} />
            <Tab.Screen name="Carte" component={carte} options={{ headerShown: false }} />
            <Tab.Screen name="Profil" component={profil} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default TabStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})