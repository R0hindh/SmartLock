import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import SocialButton from '../Components/SocialButton';
import {AppColor} from '../Constants/constants';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';

export default SignUpScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [errorText, setErrorText] = useState(null);
  const [username, setUsername] = useState('');

  const onClickSignUp = () => {
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
    if (!(adminPin && adminPin > 6)) {
      setErrorText('Invalid Admin Pin');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        user.updateProfile({displayName : username});
        console.log('user:', user);
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

        firebase.app().database('https://smartlock-project-default-rtdb.firebaseio.com/')
          .ref()
          .child('Users/')
          .child(user.uid)
          .set({
            username,
            adminPin,
            lockStatus:false,
            deviceStatus:false});
        props.navigation.navigate('Login');
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  //   const {login, googleLogin, fbLogin} = useContext(AuthContext);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={username}
        onChangeText={userName => setUsername(userName)}
        placeholderText="Username"
        iconType="user"
        autoCapitalize="words"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={adminPin}
        onChangeText={adminPin => setAdminPin(adminPin)}
        placeholderText="Admin Pin (Min - 6 digit)"
        iconType="lock"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : (
        <Text style={styles.errorText}> </Text>
      )}

      <FormButton buttonTitle="Sign Up" onPress={() => onClickSignUp()} />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'red',
  },
});
