import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as firebase from 'firebase';

const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const Profil = () => {
    const { user, logout } = useContext(AuthContext);
    const { colors } = useTheme();

    const [userInfo, setUserInfo] = useState()

    const getUserInfo = () => {
        const db = firebase.firestore();

        const ref = db.collection("users").doc(user.uid);

        ref.get().then((doc) => {
            setUserInfo(doc.data())
        })
    }

    useEffect(() => {
        getUserInfo()
        console.log(userInfo)
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Profile' />
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}>

                <View style={styles.profileInfos}>
                    <Image style={styles.image} source={{ uri: url }} />
                    <View style={styles.name}>
                        <Text style={styles.nameChar}>Name Name</Text>
                        <Text style={styles.email}>{user.email}</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                            <Text style={styles.panelButtonTitle}>Logout</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} style={{ marginBottom: 5}}/>
                    <TextInput
                        placeholder={"à remplacer par le nom wesh"}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} style={{ marginBottom: 5}}/>
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="phone" color={colors.text} size={20} style={{ marginBottom: 5}} />
                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={colors.text} size={20} style={{ marginBottom: 5}}/>
                    <TextInput
                        placeholder={user.email}
                        placeholderTextColor="#666666"
                        keyboardType="email-address"
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="globe" color={colors.text} size={20} style={{ marginBottom: 5}}/>
                    <TextInput
                        placeholder="Country"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <Icon name="map-marker-outline" color={colors.text} size={20} style={{ marginBottom: 5}}/>
                    <TextInput
                        placeholder="City"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={() => { console.log("Submit has been pressed")}}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )

}

export default Profil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    profileInfos: {
        marginTop: 16,
        paddingHorizontal: 30,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: '#dddddd',
        borderWidth: 1,
        backgroundColor: '#dcdcdc'
    },
    name: {
        marginLeft: 25,
        marginTop: 30
    },
    nameChar: {
        fontWeight: 'bold',
        fontSize: 23
    },
    email: {
        color: 'gray'
    },
    action: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#3EB489',
        alignItems: 'center',
        marginTop: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    logoutButton: {
        backgroundColor: "#e88832",
        width: 70,
        borderRadius: 10,
        marginLeft: 170,
    },
})