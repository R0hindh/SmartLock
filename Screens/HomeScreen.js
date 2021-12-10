import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated, Easing} from 'react-native';
import FormButton from '../Components/FormButton';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import database from '@react-native-firebase/database';


export default HomeScreen = () => {

  const onClickLogout = (props)=>{
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  
  const lockAnimations = useRef(null)
  const [lockStatus, setLockStatus] = useState(true)
  const [firstRun, setFirstRun] = useState(true)
  const [progress, setProgress] = useState(new Animated.Value(0))
  const [user, setUser] = useState(null)
  const [deviceStatus, setDeviceStatus] = useState(false)

  // start and lock animation changes
  useEffect(() => {
    if(user == null){
      setUser(auth().currentUser)
    }
    if(firstRun ){
      if(lockStatus){
        lockAnimations.current.play(100,100)
      }else{
        lockAnimations.current.play(0,0)
      }
      setFirstRun(false)
    }else if(lockStatus){
      lockAnimations.current.play(0,100)
    }else{
      lockAnimations.current.play(100,0)
    }
    console.log("Lock status : ",lockStatus)
    console.log("Lock status : ",user)
  }, [lockStatus])

    // DB watchers
  useEffect(() => {
    if(user){
      const onLockStatusChange = database()
        .ref(`/Users/${user.uid}/lockStatus`)
        .on('value', snapshot => {
          console.log('Lock Status - DB: ', snapshot.val());
          setLockStatus(snapshot.val())
        });
      
      const onDeviceStatusChange = database()
        .ref(`/Users/${user.uid}/deviceStatus`)
        .on('value', snapshot => {
          console.log('Device Status - DB: ', snapshot.val());
          setDeviceStatus(snapshot.val())
        });

      // Stop listening for updates when no longer required
      return () => {
        database().ref(`/Users/${user.uid}/lockStatus`).off('value', onLockStatusChange)
        database().ref(`/Users/${user.uid}/deviceStatus`).off('value', onDeviceStatusChange)
        };
    }
  }, [user]);

  const toggleLockStatus = ()=>{
    database()
      .ref(`/Users/${user.uid}`)
      .update({
        lockStatus: !lockStatus,
      })
      .then(() => console.log('lock Status updated to',lockStatus));
  }
  return (
    <View 
      style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Smart Lock</Text>
        <Text style={styles.slogan}>Your place is under our Security</Text>
      </View>
      <View style={{flexDirection: "row",justifyContent: "flex-end"}}>
        <View style={styles.deviceStatusContainer}>
          <Text style={styles.deviceStatus}>Device Status : </Text>
          {deviceStatus?
            <View style={styles.statusIndicator}>
              <Text>     </Text>
            </View>
            :<View style={{...styles.statusIndicator, backgroundColor:'red'}}>
              <Text>     </Text>
            </View>
          }
        </View>
      </View>
      <View style={styles.lockAnimation}>
        <LottieView
            style={{
              width: 400,
              height: 400
            }}
            source={require('../src/lock-animation.json')}
            autoPlay={false}
            loop={false}
            ref={lockAnimations}
          />
      </View>
      
      <TouchableOpacity style={styles.buttonContainer} onPress={() => toggleLockStatus()}>
        <Text style={styles.buttonText}>{lockStatus?"Locked":"Unlocked"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#3da1f2',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
  lockAnimation:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:90
  },
  title:{
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  slogan:{
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleContainer:{
    marginTop:10,
    backgroundColor: '#3da1f2',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  deviceStatusContainer:{
    padding: 4,
    marginTop:20,
    backgroundColor: '#aaa',
    borderRadius: 5,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'

  },
  deviceStatus:{
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  statusIndicator:{
    backgroundColor: 'green',
    borderRadius: 11,
  }
})
