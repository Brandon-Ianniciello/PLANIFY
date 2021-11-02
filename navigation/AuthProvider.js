import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
// import firebase from '../firebase/fire';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import * as firebase from 'firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errorRegister, setErrorRegister] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null)
    const db = firebase.firestore();

    //google
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                errorLogin,
                errorRegister,
                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                        console.log('Logged in')
                        setErrorLogin(null)
                    } catch (e) {
                        setErrorLogin(e)
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
                            return db.collection('users').doc(cred.user.uid).set({
                                FirsName: '',
                                LastName:'',
                                Phone: '',
                                Email:email,
                                Country:'',
                                City:'',
                                Password:password                       
                            })
                        })
                        console.log('account reegistered!')
                        setErrorRegister(null)
                    } catch (e) {
                        setErrorRegister(e)
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut();
                        console.log('Logout')
                    } catch (e) {
                        console.log(e);
                    }
                },
                loginWithGoogle: async () => {
                    await firebase.auth().signInWithPopup(googleProvider)
                        .then((result) => {
                            const credential = GoogleAuthProvider.credentialFromResult(result);
                            const token = credential.accessToken;
                            const user = result.user;
                            console.log(user)
                        }).catch((error) => {
                            console.log(error)
                        });
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}