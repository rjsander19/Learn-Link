import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDUPoWgkY_npLIMj4K3lv6_ZZsCGEm07xY",
    authDomain: "learnlink-904f8.firebaseapp.com",
    projectId: "learnlink-904f8",
    storageBucket: "learnlink-904f8.appspot.com",
    messagingSenderId: "181613345494",
    appId: "1:181613345494:web:ce093a6a22bbf802e5a777",
    measurementId: "G-5FX9WMN4DF"
  };

//activate firebase app
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

//set up provider
const provider = new firebase.auth.GoogleAuthProvider();

function login() {
    return auth.signInWithPopup(provider);

}
function logout() {
    return auth.signOut();
}

export { login, logout, auth };