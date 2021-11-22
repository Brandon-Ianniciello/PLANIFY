import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import firebase from '../firebase/fire';
import { AuthContext } from '../navigation/AuthProvider';


const Signup = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const {register,errorRegister} = useContext(AuthContext)

    let champErreur = null

    if(errorRegister == null)
      champErreur = <View></View>
    else if (errorRegister != null)
      champErreur = <View><Text style={{color:"red",  fontSize: 15  }}>{errorRegister.toString()}</Text></View>

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Créer un compte Planify</Text>

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Courriel"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Mot de passe"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirmer le mot de passe"
                iconType="lock"
                secureTextEntry={true}
            />
            <View>
                {champErreur}
            </View>

            <FormButton
                buttonTitle="S'enregistrer"
                onPress={() => register(email,password)}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    En vous enregistrant, vous acceptez nos {' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        conditions
                    </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> et nos </Text>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                    politiques
                </Text>
            </View>
          

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Déjà un compte ? Connectez-vous ici</Text>
            </TouchableOpacity>
        </View>
    );
};


export default Signup;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9fafd',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    text: {
      fontFamily: 'sans-serif',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'sans-serif',
    },
    textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 35,
      justifyContent: 'center',
    },
    color_textPrivate: {
      fontSize: 13,
      fontWeight: '400',
      fontFamily: 'sans-serif',
      color: 'grey',
    },
  });