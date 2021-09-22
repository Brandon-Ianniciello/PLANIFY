import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyABPrAoWwNGSrocGrrni3wabfr0zD58J4s",
    authDomain: "planify-b6b2b.firebaseapp.com",
    projectId: "planify-b6b2b",
    storageBucket: "planify-b6b2b.appspot.com",
    messagingSenderId: "15638435625",
    appId: "1:15638435625:web:29edffe7069fa618500938",
    measurementId: "G-YHXVMDYXRF"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;