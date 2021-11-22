import React, { useContext, useState,useEffect } from 'react';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


/*
--futur homgepage--

const FetchNearestEvent = (rayon = 50) => {

    const [data, setData] = useState(null);
    let location = useGeoLocation()
    const latitude = location.latitude; // you can update it with user's latitude & Longitude
    const longitude = location.longitude;
    let radMetter = rayon * 1000; // Search withing 2 KM radius

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
        latitude + ',' + longitude + '&radius=' + radMetter +'&type=restaurant'+ '&key=' + 'AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U'

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(url);
            const data = await resp.json();
            setData(data)
        }
        fetchData()
    }, [])

    return data;
}

const HomeScreen = ({ navigation }) => {
    let data = FetchNearestEvent()
    console.log(data)
    return (
        <View style={styles.container}>
            <FlatListGoogleEvents data={data.result} navigation={navigation} />
        </View>
    )
}


*/

const HomeScreen = ({ navigation }) => {

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

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 400 }}>
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
                            source={require('../assets/festivals3.jpg')}
                            //source={require(img)}
                            //ne s'affiche pas quand on utilise la variable img
                            style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                        />

                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }


    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={{ backgroundColor: "#5cdb95", height: "7%", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingHorizontal: 20 }}>
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
                {/* FESTIVALS */}
                <View>
                    {divGenerator("FestivalsScreen", "FESTIVALS", navigation, '../assets/festivals3.jpg')}
                </View>
                {/* RESTAURANTS */}
                <View>
                    {divGenerator("RestaurantScreen", "RESTAURANTS", navigation, '../assets/festivals.jpg')}
                </View>
                {/* PARTYS */}
                <View>
                    {divGenerator("PartyScreen", "PARTYS", navigation, '../assets/festivals3.jpg')}
                </View>
                {/* DATE */}
                <View>
                    {divGenerator("IdéeDateScreen", "RENCARDS", navigation, '../assets/festivals3.jpg')}
                </View>
                {/* ATTRACTIONS */}
                <View>
                    {divGenerator("AttractionScreen", "ATTRACTIONS", navigation, '../assets/festivals3.jpg')}
                </View>
                {/* SPORTS */}
                <View>
                    {divGenerator("sportsScreen", "SPORTS", navigation, '../assets/festivals3.jpg')}
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
        padding: '15%',
        justifyContent: 'center',
    },
    bouton: {
        flexDirection: 'column',
        padding: '13%',
        alignItems: 'center'
    }
});