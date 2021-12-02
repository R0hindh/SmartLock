import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Platform, Image, StyleSheet, Alert} from 'react-native';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import SocialButton from '../Components/SocialButton';
import auth from '@react-native-firebase/auth';
import {AppColor} from '../Constants/constants'

export default LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('rohindh@gmail.com');
  const [password, setPassword] = useState('Test1234$');
  const [errorText, setErrorText] = useState(null);
  const onClickSignIn = ()=>{
    if (
      !(
        email &&
        email.includes('@') &&
        email.includes('.com') &&
        email.length > 8
      )
    ) {
      setErrorText('Invalid email ID');
      return;
    }
    if (!(password && email.length > 8)) {
      setErrorText('Invalid password');
      return;
    }
    auth().signInWithEmailAndPassword(email, password)
  }
  return (
    <View style={styles.container}>
      <Image source={require('../Asset/no_slogan.png')} style={styles.logo} />
      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : (
        <Text style={styles.errorText}> </Text>
      )}
      <FormButton buttonTitle="Sign In" onPress={() => onClickSignIn()}/>
      
      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => {
          navigation.navigate('SignUp')
          console.log("Vavigated : SignUp")
          }}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Click here
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    flex:1
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3386EB',
    fontFamily: 'Lato-Regular',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'red',
  },
});
