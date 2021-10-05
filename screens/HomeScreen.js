import React, { useContext } from 'react';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header';
const HomeScreen = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1
        }}>
            <View style={{
                backgroundColor: "#5cdb95",
                height: "28%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                paddingHorizontal: 20
            }}>
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
            <LinearGradient
                colors={["rgba(0,210,109,0.4)", "transparent"]}
                style={{
                    left: 0,
                    right: 0,
                    height: 90,
                    marginTop: -15
                }}
            >
                <View style={{
                    backgroundColor: "#fff",
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    marginHorizontal: 20,
                    borderRadius: 15,
                    marginTop: 0,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TextInput
                        placeholder="Recherche"
                        placeholderTextColor="b1e5d"
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            width: 320
                        }}
                    />
                    <Image
                        source={require('../assets/Loop.png')}
                        style={{ height: 20, width: 20 }}
                    />
                </View>
            </LinearGradient>
                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    width: "100%",
                    alignItems: "center"
                }}>
                    <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color:"#585a61"
                        }}>Festivals</Text>
                        <View style={{
                            height:4,
                            backgroundColor:"b1e5d3",
                            width:115,
                            marginTop:-5
                        }}>

                        </View>

                    </View>
                    <View style={{width:"50%",alignItems:"flex-end"}}>
                        <View style={{
                            backgroundColor:"#00a46c",
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                color:"#FFF"
                            }}>
                                More
                            </Text>
                        </View>
                    </View>
                </View>
                
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height:400}}
                >
                    <LinearGradient
                        colors={["rgba(0,210,109,0.09)", "transparent"]}
                        style={{
                            position:"absolute",
                            left:0,
                            right:0,
                            height:100,
                            marginTop:220,
                            top:0
                        }}
                    />
                    <TouchableOpacity
                        onPress={()=>navigation.navigate("FestivalsScreen")}
                        style={{
                            height:240,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:160
                        }}
                    >
                        <Image
                            source={require('../assets/festivals3.jpg')}
                            style={{borderTopRightRadius:15,borderTopLeftRadius:15}}
                        />

                    </TouchableOpacity>
                </ScrollView>

                
                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    width: "100%",
                    alignItems: "center"
                }}>
                    <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color:"#585a61"
                        }}>Activiter</Text>
                        <View style={{
                            height:4,
                            backgroundColor:"b1e5d3",
                            width:115,
                            marginTop:-5
                        }}>

                        </View>

                    </View>
                    <View style={{width:"50%",alignItems:"flex-end"}}>
                        <View style={{
                            backgroundColor:"#00a46c",
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                color:"#FFF"
                            }}>
                                More
                            </Text>
                        </View>
                    </View>
                </View>
            
        </View>
    )
}

// const HomeScreen = ({ navigation }) => {
//     const Stack = createNativeStackNavigator();
//     const { user, logout } = useContext(AuthContext);

//     return (
//         <SafeAreaView>
//             <Header title="ACCUEIL" />
//             <View style={styles.container}>
//                 <Text>Ready to explore {user.email} ?</Text>
//                 <View style={{ flex: 1, flexDirection: 'column' }}>
//                     <View style={styles.container}>
//                         <View style={styles.rangée}>
//                             <View style={styles.bouton}>
//                                 <FormButton buttonTitle='SPORTS' onPress={() => navigation.navigate("sportsScreen")} />
//                             </View>
//                             <View style={styles.bouton}>
//                                 <FormButton buttonTitle='RESTAURANTS' onPress={() => navigation.navigate("RestaurantScreen")} />
//                             </View>
//                         </View>
//                         <View style={styles.rangée}>
//                             <View style={styles.bouton}>
//                                 <FormButton buttonTitle='FESTIVALS' onPress={() => navigation.navigate("FestivalsScreen")} />
//                             </View>
//                             <View style={styles.bouton}>
//                                 <FormButton buttonTitle='PARTYS' onPress={() => navigation.navigate("PartyScreen")} />
//                             </View>
//                         </View>
//                         <View style={styles.rangée}>
//                             <View style={styles.bouton}>
//                                 <FormButton buttonTitle='ATTRACTIONS' onPress={() => navigation.navigate("AttractionScreen")} />
//                             </View>
//                             <View style={styles.bouton}>
//                                 <FormButton buttonTitle='RENCARD ♥' onPress={() => navigation.navigate("IdéeDateScreen")} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     )
// }

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