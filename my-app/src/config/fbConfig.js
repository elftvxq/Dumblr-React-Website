import firebase, { Storage } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCCd98pmJINn6EnfUvW66xF_oJPBbZZ-TM",
    authDomain: "react-personal-project.firebaseapp.com",
    databaseURL: "https://react-personal-project.firebaseio.com",
    projectId: "react-personal-project",
    storageBucket: "react-personal-project.appspot.com",
    messagingSenderId: "1066658697188",
    appId: "1:1066658697188:web:0b0bf1704ef90a40"
};

firebase.initializeApp(config);
var storage = firebase.storage();
export {
    storage, firebase as default
}