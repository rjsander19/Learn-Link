import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAgLf-pm9dTMV9lPmELs3Fzs7DKwiodQhc",
    authDomain: "learnlink-f0746.firebaseapp.com",
    projectId: "learnlink-f0746",
    storageBucket: "learnlink-f0746.appspot.com",
    messagingSenderId: "312768904603",
    appId: "1:312768904603:web:7e8f850f2f750b32f9753e",
    measurementId: "G-68HSY6RZTQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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