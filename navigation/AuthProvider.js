import React, { createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/fire';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email,password) => {
                    try{
                        await firebase.auth().signInWithEmailAndPassword(email,password);
                        console.log('Logged in')
                    }catch(e){
                        console.log(e);
                    }
                },
                register: async(email,password) => {
                    try{
                        await firebase.auth().createUserWithEmailAndPassword(email,password);
                        console.log('account reegistered!')
                    }catch(e){
                        console.log(e);
                    }
                },
                logout: async () => {
                    try{
                        await firebase.auth().signOut();
                        console.log('Logout')
                    }catch(e){
                        console.log(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}