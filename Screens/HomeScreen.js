import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../Components/FormButton';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

export default HomeScreen = () => {

  const onClickLogout = (props)=>{
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        // style={styles.lockAnimation}
        source={require('../src/lock-animation.json')}
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lockAnimation:{
    width:100,
    height:100
  }
})
