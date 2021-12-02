import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import OTPScreen from '../Screens/OTPScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from '@ant-design/react-native';
import {PrimaryColor} from '../Constants/Color';

const Tab = createBottomTabNavigator();

export default function HomeRoute() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            if(focused){
              return <AntDesign name={'home'} size={25} color={PrimaryColor} />
            }else{
              return <AntDesign name={'home'} size={25} />
            }
          }else if(route.name === 'OTP'){
            if(focused){
              return <Ionicons name={'key-outline'} size={25} color={PrimaryColor} />
            }else{
              return <Ionicons name={'key-outline'} size={25} />
            }
          }else if(route.name === 'History'){
            if(focused){
              return <Ionicons name={'list'} size={25} color={PrimaryColor} />
            }else{
              return <Ionicons name={'list'} size={25} />
            }
          }else if(route.name === 'Profile'){
            if(focused){
              return <Ionicons name={'person-outline'} size={25} color={PrimaryColor} />
            }else{
              return <Ionicons name={'person-outline'} size={25} />
            }
          } 
        },headerShown:false
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="OTP" component={OTPScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}