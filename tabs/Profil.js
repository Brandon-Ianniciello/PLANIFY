import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import PlanifyIndicator from "../components/PlanifyIndicator"
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as firebase from 'firebase';

const Profil = ({navigation}) => {
    const { user, logout } = useContext(AuthContext);
    const { colors } = useTheme();

    const [userInfo, setUserInfo] = useState()

    //informations utilisateurs
    const [City, setCity] = useState(undefined)
    const [Country, setCountry] = useState(undefined)
    const [Email, setEmail] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [firstName, setFirstName] = useState(undefined)
    const [imageProfil, setImageProfil] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [password, setPassword] = useState(undefined)
    const [phone, setPhone] = useState(undefined)
    const [sex, setSex] = useState(undefined)
    const db = firebase.firestore();

    const getUserInfo = () => {
        setUserInfo(null)
        const ref = db.collection("users").doc(user.uid);
        ref.get().then((doc) => {
            setUserInfo(doc.data())
        })
    }

    function userIsNotNull() {
        if (userInfo != null || userInfo != undefined)
            return true
        return false
    }

    function setValues() {
        getUserInfo()
        if (userIsNotNull()) {
            if(userInfo.Image == null || userInfo.Image == "")
                setImageProfil("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            setCity(userInfo.City)
            setCountry(userInfo.Country)
            setEmail(userInfo.Email)
            setLastName(userInfo.LastName)
            setFirstName(userInfo.FirstName)
            setPassword(userInfo.Password)
            setPhone(userInfo.Phone)
            setSex(userInfo.Sex)
        }
    }

    function editValues(firstName, lastName, phone, email, country, city, sex, img, password) {
        console.log("Submit the edit for user#:", userInfo.id)
        // RECRÉATION DE COMPTE SI BESOIN DE RAJOUTER UN CHAMP
        if(img=="")
            img = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        else
            img = imageProfil
        return db.collection('users').doc(userInfo.id).set({
            FirstName: firstName,
            LastName: lastName,
            Phone: phone,
            Email: email,
            Country: country,
            City: city,
            Sex: sex,
            Image: img,
            Password: password,
            isAdmin: userInfo.isAdmin,
            id: userInfo.id
        })
    }

    useEffect(() => {
        getUserInfo()
        setValues()
    }, []);

    if (userIsNotNull() && userInfo != undefined) {
        let placeholderEmail = "Email"
        let placeholderFirstName = "Firstname"
        let placeholderLastName = "Lastname"
        let placeholderPhone = "Phone"
        let placeholderCity = "City"
        let placeholderCountry = "Country"


        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                    <View style={styles.profileInfos}>
                        {/* image de profil */}
                        <TouchableOpacity onPress={() => {navigation.navigate("SelectPhotos",{photoUrl:imageProfil})}}>
                            <Image style={styles.image} source={{ uri: imageProfil }} />
                        </TouchableOpacity>
                        {/* nom de l'utilisateur */}
                        <View style={styles.name}>
                            <Text style={styles.nameChar}>{firstName} {lastName}</Text>
                            <Text style={styles.email}>{user.email}</Text>
                        </View>

                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.refreshBouton} onPress={() => {getUserInfo();setValues()}}>
                            <FontAwesome name="retweet" color='#0099ff' size={20} style={{ marginBottom: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                                <FontAwesome name="sign-out" color='#ff3300' size={20}/>
                        </TouchableOpacity>
                    </View>
                    {/* modification du prénom */}
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color={colors.text} size={20} style={{ marginBottom: 5 }} />
                        <TextInput
                            placeholder={placeholderFirstName}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                            value={firstName}
                            onChangeText={(txt) => setFirstName(txt)}
                        />
                    </View>

                    {/* modification du nom de famille */}
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color={colors.text} size={20} style={{ marginBottom: 5 }} />
                        <TextInput
                            placeholder={placeholderLastName}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                            value={lastName}
                            onChangeText={(txt) => setLastName(txt)}
                        />
                    </View>

                    {/* modification du num de tel */}
                    <View style={styles.action}>
                        <Feather name="phone" color={colors.text} size={20} style={{ marginBottom: 5 }} />
                        <TextInput
                            placeholder={placeholderPhone}
                            placeholderTextColor="#666666"
                            keyboardType="number-pad"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                            value={phone}
                            onChangeText={(txt) => setPhone(txt)}
                        />
                    </View>

                    {/* modification du courriel */}
                    <View style={styles.action}>
                        <FontAwesome name="envelope-o" color={colors.text} size={20} style={{ marginBottom: 5 }} />
                        <TextInput
                            placeholder={placeholderEmail}
                            placeholderTextColor="#666666"
                            keyboardType="email-address"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                            value={Email}
                            onChangeText={(txt) => setEmail(txt)}
                        />
                    </View>
                    {/* modification du pays */}
                    <View style={styles.action}>
                        <FontAwesome name="globe" color={colors.text} size={20} style={{ marginBottom: 5 }} />
                        <TextInput
                            placeholder={placeholderCountry}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                            value={Country}
                            onChangeText={(txt) => setCountry(txt)}
                        />
                    </View>
                    {/* modification de la ville */}
                    <View style={styles.action}>
                        <Icon name="map-marker-outline" color={colors.text} size={20} style={{ marginBottom: 5 }} />
                        <TextInput
                            placeholder={placeholderCity}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                            value={City}
                            onChangeText={(txt) => setCity(txt)}
                        />
                    </View>

                    <TouchableOpacity style={styles.commandButton} onPress={() => editValues(firstName, lastName, phone, Email, Country, City, sex, imageProfil, password)}>
                        <Text style={styles.panelButtonTitle}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )

    }
    else if (!userIsNotNull()) {
        return (
            <View style={styles.container}>
                <PlanifyIndicator />
                <TouchableOpacity style={styles.commandButton, { backgroundColor: 'red' }} onPress={() => logout()}>
                    <Text style={styles.panelButtonTitle}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Profil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop:20
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
        borderWidth: 1
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
    refreshBouton: {
        backgroundColor: 'green',
        width: 70,
        borderRadius: 10,
        marginLeft: 170,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    logoutButton: {
        marginLeft: 70,
    },
    refreshBouton: {
        marginLeft: 170,
    },
})