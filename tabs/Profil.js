import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
// import firebase from '../firebase/fire';
import FormButton from '../components/FormButton';
import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, name, email, imageUrl, phone) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        displayName: name,
        email: email,
        photoURL: imageUrl,
        phoneNumber: phone
    });
}

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
    let phoneDisplay = formInputGenerator(num, setNum, "Numéro de téléphone", "phone", "phone", "none", false)
    let displayName = formInputGenerator(name, setName, "Nom", "profile", "default", "none", false)


    return (
        <SafeAreaView style={styles.container}>
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
                <FormButton buttonTitle='Logout' onPress={() => logout} />
            </View>
        </SafeAreaView>
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
    }
});
