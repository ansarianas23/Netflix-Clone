import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD4NLIP8P6mC-MSamsJMT_DOMmRmNuM7SE",
    authDomain: "netflix-clone-a4db2.firebaseapp.com",
    projectId: "netflix-clone-a4db2",
    storageBucket: "netflix-clone-a4db2.appspot.com",
    messagingSenderId: "355165406760",
    appId: "1:355165406760:web:35a0529afa789a213e171d"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()

export {auth}
export default db;