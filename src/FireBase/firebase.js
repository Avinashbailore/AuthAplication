import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBCQVxXDhRVTu78ndG8jIrhH9u-_QoelOQ",
    authDomain: "create-react-app-aaf1d.firebaseapp.com",
    projectId: "create-react-app-aaf1d",
    storageBucket: "create-react-app-aaf1d.appspot.com",
    messagingSenderId: "621777912791",
    appId: "1:621777912791:web:af5961b20cc95bd7e70192",
    measurementId: "G-W7Q9JLLRFK"
};
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();


export default firebase;