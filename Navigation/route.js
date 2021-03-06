import React,{useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import HomeRoute from '../Navigation/HomeRoute'
import LoginScreen from '../Screens/LoginScreen'
import SignUpScreen from '../Screens/SignUpScreen'
import SplashScreen from '../Screens/Splash';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import AppContext from '../Components/AppContext'
import Authentication from '../Screens/Authentication'
import database from '@react-native-firebase/database';

const stack = createNativeStackNavigator();

export default Route = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [AdminPinDB, setAdminPinDB] = useState(null)
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    if(user){
      database()
        .ref(`/Users/${user.uid}/adminPin`)
        .once('value')
        .then(snapshot => {
          console.log('Admin PIN: ', snapshot.val());
          setAdminPinDB(snapshot.val())
        });
    }
  }, [user])
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  },[]);

  if(isLoading){
      return <SplashScreen setIsLoading={setIsLoading}/>
  }
  
  if (initializing) return null;

  const AuthNavigator=(props)=>{
    return(
      <stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown:false
        }}
      >
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="SignUp" component={SignUpScreen} />
      </stack.Navigator>
    )
  }

  const AppNavigator=(props)=>{
    return(
      <stack.Navigator
        initialRouteName="HomeRoute"
        screenOptions={{
          headerShown:false
        }}
      >
        <stack.Screen name="HomeRoute" component={HomeRoute} />
      </stack.Navigator>
    )
  }

  const AuthenticationNavigator=(props)=>{
    return(
      <stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{
          headerShown:false
        }}
      >
        <stack.Screen name="Authentication" component={Authentication} />
      </stack.Navigator>
    )
  }

  const MainNavigator = (props)=>{
    if (!firebase.apps.length) {
      let credentials = {
        apiKey: "AIzaSyAOPuXn919kGNCuVIc7uSmkkfla_GtfJXU",
        authDomain: "smartlock-project.firebaseapp.com",
        databaseURL: "https://smartlock-project-default-rtdb.firebaseio.com/",
        projectId: "smartlock-project",
        storageBucket: "smartlock-project.appspot.com",
        messagingSenderId: "956610815555",
        appId: '1:956610815555:android:92ff7aa56e1446564496f6',
      };
      firebase.initializeApp(credentials);
    }
    return(
      <NavigationContainer>
        {user?
          isAuthenticated?<AppNavigator/>:<AuthenticationNavigator/>
          :<AuthNavigator/>}
      </NavigationContainer>
    )
  }
  const GlobeStateSetting ={
    isAuthenticated: isAuthenticated,
    AdminPinDB:AdminPinDB,
    setIsAuthenticated:setIsAuthenticated
  }
  return(
    <AppContext.Provider value={GlobeStateSetting}>
      <MainNavigator/>
    </AppContext.Provider>
  )
};
