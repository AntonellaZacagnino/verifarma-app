import { initializeApp } from 'firebase/app';


const app = initializeApp({
    apiKey: "AIzaSyDJzgVCjad3h8V5Oc0soVIoQntnkFIOFQw",
    authDomain: "verifarma-app.firebaseapp.com",
    databaseURL: "https://verifarma-app-default-rtdb.firebaseio.com",
    projectId: "verifarma-app",
    storageBucket: "verifarma-app.appspot.com",
    messagingSenderId: "244818681082",
    appId: "1:244818681082:web:8b037b03018e23e4cefd43",
    measurementId: "G-N9E8CGTVS2"
});

export function getFirebase(){
    return app;
}

export function getFirestore() {
    return firebase.firestore(app)
}