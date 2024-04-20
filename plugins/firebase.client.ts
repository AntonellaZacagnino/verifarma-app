import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(nuxtApp => {
    const firebaseConfig = {
        apiKey: "AIzaSyDJzgVCjad3h8V5Oc0soVIoQntnkFIOFQw",     
        authDomain: "verifarma-app.firebaseapp.com",
        databaseURL: "https://verifarma-app-default-rtdb.firebaseio.com",   
        projectId: "verifarma-app",      
        storageBucket: "verifarma-app.appspot.com",      
        messagingSenderId: "244818681082",      
        appId: "1:244818681082:web:8b037b03018e23e4cefd43",      
        measurementId: "G-N9E8CGTVS2"      
      };
      
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const firestore = getFirestore(app)

    return {
      provide: {
        auth, firestore
      }
    }
})