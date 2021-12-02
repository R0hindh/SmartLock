import firebase from '@react-native-firebase/app';

let config = {
    apiKey: "AIzaSyAOPuXn919kGNCuVIc7uSmkkfla_GtfJXU",
    authDomain: "smartlock-project.firebaseapp.com",
    databaseURL: "https://smartlock-project-default-rtdb.firebaseio.com/",
    projectId: "smartlock-project",
    storageBucket: "smartlock-project.appspot.com",
    messagingSenderId: "956610815555",
    appId: '1:956610815555:android:92ff7aa56e1446564496f6',
};

firebase.initializeApp(credentials, config);