import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
// import firebase from '../firebase/fire';
import { getDatabase, ref, set } from "firebase/database";

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

// function writeUserData(userId, name, email, imageUrl, phone) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {
//         displayName: name,
//         email: email,
//         photoURL: imageUrl,
//         phoneNumber: phone
//     });
// }

function formInputGenerator(labelValue, f, placeholderText, iconType, keyboardType, autoCapitalize, autoCorrect) {
    return (
        <FormInput
            labelValue={labelValue}
            onChangeText={(data) => f(data)}
            placeholderText={placeholderText}
            iconType={iconType}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
        />
    )
}

const profil = () => {
    /*USER AND HIS LOGOUT*/
    const { user, logout } = useContext(AuthContext);

    /*CONSTANTES*/
    const informations = []

    //Mettre les informations dans le tableau
    user['providerData'].forEach(element => {
        informations.push(element)
    });

    const [emailDéfinitif, setEmail] = useState(informations[0]['email']);
    const [password, setPassword] = useState();
    const [num, setNum] = useState(informations[0]['phoneNumber'])
    const [name, setName] = useState(informations[0]["displayName"])

    let emailDisplay = formInputGenerator(emailDéfinitif, setEmail, "Email", "user", "email-address", "none", false)
    let phoneDisplay = formInputGenerator(num, setNum, "Numéro de téléphone", "phone", "phone-pad", "none", false)
    let displayName = formInputGenerator(name, setName, "Nom", "profile", "default", "none", false)

    let url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

    /*--photo--*/
    if (informations[0]['photoURL'] != null || informations[0]['photoURL'] != undefined)
        url = informations[0]['photoURL']
    return (
        <View style={{ flexDirection: "column" }}>
            <View style={styles.header}>
                <Image source={{ uri: url }} style={styles.photoDisplay} />     
                                                                          {/*à changer pour le nom  */}
                <Text style={{textTransform:"uppercase",color:"white"}}>{emailDéfinitif}</Text> 
            </View>
            <SafeAreaView>
                <View style={styles.emailDisplay}>
                    {emailDisplay}
                </View>

                <View style={styles.phoneDisplay}>
                    {phoneDisplay}
                </View>

                <View>
                    {displayName}
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <FormButton buttonTitle='Logout' onPress={() => logout()} />
                </View>
            </SafeAreaView>
        </View>
    )
}



export default profil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    phoneDisplay: {
        flexDirection: 'row'
    },
    emailDisplay: {
        flexDirection: 'row'
    },
    photoDisplay: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "red",
        backgroundColor:"white"
    },
    header:{
        backgroundColor: "black",
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row"
    }
});
