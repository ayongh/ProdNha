import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB4fLjYK4YvTHw3kyKMqesVhSy5K4yQ1FM",
    authDomain: "nhadb-c07ce.firebaseapp.com",
    databaseURL: "https://nhadb-c07ce.firebaseio.com",
    projectId: "nhadb-c07ce",
    storageBucket: "nhadb-c07ce.appspot.com",
    messagingSenderId: "474315936004",
    appId: "1:474315936004:web:10b9969ba82f181b1d0051",
    measurementId: "G-EGQWPT52CN"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default}