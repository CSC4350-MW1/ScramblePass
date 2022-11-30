import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdT0BRCM0zb6Yk4MX3m7uw-1QDoY5wF74",
    authDomain: "scrambler-pass.firebaseapp.com",
    projectId: "scrambler-pass",
    storageBucket: "scrambler-pass.appspot.com",
    messagingSenderId: "80955080449",
    appId: "1:80955080449:web:82af3cee283f52bcea6500"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Authentication exports
export const auth = firebase.auth()

// Firestore exports
export const firestore = firebase.firestore();