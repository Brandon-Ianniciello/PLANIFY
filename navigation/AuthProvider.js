import React, { createContext, useState } from 'react';
import * as firebase from 'firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errorRegister, setErrorRegister] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null)
    const [errorLogout, setErrorLogout] = useState(null)
    const db = firebase.firestore();

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                errorLogin,
                errorRegister,
                errorLogout,
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
                            let uid = cred.user.uid
                            return db.collection('users').doc(uid).set({
                                FirstName: '',
                                LastName:'',
                                Phone: '',
                                Email:email,
                                Country:'',
                                City:'',
                                Sex:'',
                                Image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                                Password:password,
                                isAdmin:false,
                                id:uid              
                            })
                        })
                        console.log('account registered!')
                        setErrorRegister(null)
                    } catch (e) {
                        setErrorRegister(e)
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut();
                        setErrorRegister(null)
                        console.log('Logout')
                    } catch (e) {
                        setErrorLogout(e)
                        console.log(e);
                    }
                }
                // ,
                // loginWithGoogle: async () => {
                //     await firebase.auth().signInWithPopup(googleProvider)
                //         .then((result) => {
                //             const credential = GoogleAuthProvider.credentialFromResult(result);
                //             const token = credential.accessToken;
                //             const user = result.user;
                //             console.log(user)
                //         }).catch((error) => {
                //             console.log(error)
                //         });
                // }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}