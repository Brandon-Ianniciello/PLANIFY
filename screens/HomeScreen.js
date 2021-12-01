import React, { useContext, useState, useEffect } from 'react';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import FlatListGoogleEvents from "../components/FlatListGoogleEvents"
import FestivalsScreen from './FestivalsScreen';

const HomeScreen = ({ navigation, route }) => {

    function divGenerator(screenName, nom, navigation, img) {
        img = img.toString()
        return (
            <View>
                <View style={{ flexDirection: "row", paddingHorizontal: 20, width: "100%", alignItems: "center" }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17, color: "#585a61" }}>{nom}</Text>
                        <View style={{
                            height: 4,
                            backgroundColor: "b1e5d3",
                            width: 115,
                            marginTop: -5
                        }}>
                        </View>
                    </View>

                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 300 }}>
                    <LinearGradient
                        colors={["rgba(0,210,109,0.09)", "transparent"]}
                        style={{ position: "absolute", left: 0, right: 0, height: 100, marginTop: 220, top: 0 }} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(screenName);
                        }}
                        style={{
                            height: 240,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../assets/resto.jpg')}
                            //source={require(img)}
                            //ne s'affiche pas quand on utilise la variable img
                            style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                        />

                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }


    if (route.params != undefined || route.params != null) {
        if (route.params.event != null) {
            const event = route.params.event
            return (
                <View style={styles.container}>
                    <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: 'bold' }}>Évènements proches</Text>
                    <FlatListGoogleEvents data={event.results} eventClique={route.params.eventClique}
                        details={route.params.details} navigation={navigation} />
                </View>)
        }


    }
    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={{ backgroundColor: "#05386B", height: "15%", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingHorizontal: 20 }}>
                <Image
                    source={require('../assets/1.png')}
                    style={{
                        height: 10,
                        width: 20,
                        marginTop: 50
                    }}
                />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    width: "100%"
                }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{
                            fontSize: 28,
                            color: "#edf5e1",
                            fontWeight: "bold"
                        }}>Bienvenue sur Planify</Text>
                    </View>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <Image
                            source={require('../assets/CalendarV3.png')}
                            style={{ height: 60, width: 60 }}
                        />
                    </View>
                </View>
            </View>

            <View>
            {/* RESTAURANTS */}
                <View>
                    <View style={{ flexDirection: "row", paddingHorizontal: 20, width: "100%", alignItems: "center" }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 17, color: "#585a61" }}>RESTAURANTS</Text>
                            <View style={{
                                height: 4,
                                backgroundColor: "b1e5d3",
                                width: 115,
                                marginTop: -5
                            }}>
                            </View>
                        </View>

                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 300 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("RestaurantScreen");
                            }}
                            style={{
                                height: 240,
                                elevation: 2,
                                backgroundColor: "#FFF",
                                marginLeft: 20,
                                marginTop: 20,
                                borderRadius: 15,
                                marginBottom: 10,
                                width: 160
                            }}
                        >
                            <Image
                                source={require('../assets/resto.jpg')}
                                //source={require(img)}
                                //ne s'affiche pas quand on utilise la variable img
                                style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                            />

                        </TouchableOpacity>
                    </ScrollView>
                </View>
                {/* FESTIVALS */}
                <View>
                    <View style={{ flexDirection: "row", paddingHorizontal: 20, width: "100%", alignItems: "center" }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 17, color: "#585a61" }}>ACTIVITÉS</Text>
                            <View style={{
                                height: 4,
                                backgroundColor: "b1e5d3",
                                width: 115,
                                marginTop: -5
                            }}>
                            </View>
                        </View>

                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 300 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("FestivalsScreen");
                            }}
                            style={{
                                height: 240,
                                elevation: 2,
                                backgroundColor: "#FFF",
                                marginLeft: 20,
                                marginTop: 20,
                                borderRadius: 15,
                                marginBottom: 10,
                                width: 160
                            }}
                        >
                            <Image
                                source={require('../assets/festivals3.jpg')}
                                //source={require(img)}
                                //ne s'affiche pas quand on utilise la variable img
                                style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                            />

                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* ATTRACTIONS */}
                <View>
                    <View style={{ flexDirection: "row", paddingHorizontal: 20, width: "100%", alignItems: "center" }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 17, color: "#585a61" }}>ATTRACTIONS</Text>
                            <View style={{
                                height: 4,
                                backgroundColor: "b1e5d3",
                                width: 115,
                                marginTop: -5
                            }}>
                            </View>
                        </View>

                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 300 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("AttractionScreen");
                            }}
                            style={{
                                height: 240,
                                elevation: 2,
                                backgroundColor: "#FFF",
                                marginLeft: 20,
                                marginTop: 20,
                                borderRadius: 15,
                                marginBottom: 10,
                                width: 160
                            }}
                        >
                            <Image
                                source={require('../assets/attraction.jpg')}
                                //source={require(img)}
                                //ne s'affiche pas quand on utilise la variable img
                                style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                            />

                        </TouchableOpacity>
                    </ScrollView>
                </View>

            </View>
        </ScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
    },
    rangée: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bouton: {
        flexDirection: 'column',
        padding: '13%',
        alignItems: 'center'
    }
});