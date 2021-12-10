import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View, Share, Alert, TouchableOpacity} from 'react-native';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const OTPScreen = () => {
    const [OTPPin, setOTPPin] = useState('      ');
    const [name, setName] = useState('')
    const [user, setUser] = useState(null)
    const [errorText, setErrorText] = useState(null);
    // const [OTPPin, setOTPPin] = useState("123456")

    useEffect(() => {
        if(user == null){
            setUser(auth().currentUser)
        }
    }, [])

    const generateOTPPin = () => {

        let num = Math.floor(100000 + Math.random() * 900000);
        setOTPPin(num.toString());
        console.log(OTPPin);
    };

    const onSave = ()=>{
        if(name){
            if(OTPPin != '      '){
                // if(!firebase.apps.length){
                //     let credentials = {
                //     apiKey: "AIzaSyAOPuXn919kGNCuVIc7uSmkkfla_GtfJXU",
                //     authDomain: "smartlock-project.firebaseapp.com",
                //     databaseURL: "https://smartlock-project-default-rtdb.firebaseio.com/",
                //     projectId: "smartlock-project",
                //     storageBucket: "smartlock-project.appspot.com",
                //     messagingSenderId: "956610815555",
                //     appId: '1:956610815555:android:92ff7aa56e1446564496f6',
                //     };
                //     firebase.initializeApp(credentials);
                // }

                firebase.app().database('https://smartlock-project-default-rtdb.firebaseio.com/')
                .ref(`Users/${user.uid}/OTP`)
                .push()
                .set({name,OTPPin}).then(() => {
                    // setName(null)
                    // setOTPPin('      ')
                    // setErrorText(null)
                    console.log("OTP Saved");
                    Alert.alert(
                        'Success',
                        'Your OTP is been successfully Saved. Please use the share button to share the OTP'
                    );
                    })
            }else{
                setErrorText("Please generate the OTP");
            }
        }else{
            setErrorText("Please enter the Name/Cause");
        }
    }

    const onShare = async () => {
        if (OTPPin != '      ') {
        try {
            const result = await Share.share({
            message: `Hi ${name}, Here is your OTP to enter the property ${OTPPin}`,
            });
        } catch (error) {
            alert(error.message);
        }
        } else {
            Alert.alert(
                'Generate OTP',
                'Please Generate OTP before you share'
            );
        }
    };

    const renderOTPBoxes = numbers => {
        OTPBoxes = numbers.map((number, index) => {
        return (
            <View style={styles.OTPBox} key={index}>
            <Text style={{fontSize: 22, color: '#3386EB'}}>{number}</Text>
            </View>
        );
        });
        return OTPBoxes;
    };

    return (
        <View style={styles.container}>
            <FormInput
                labelValue={name}
                onChangeText={name => setName(name)}
                placeholderText="Name/Cause"
                iconType="user"
                autoCapitalize="words"
                autoCorrect={false}
                containerStyle={{borderColor:'#3386EB', borderRadius:5}}
                iconStyle={{borderColor:'#3386EB', borderRadius:5}}
                color='#3386EB'
            />
            <View style={styles.OTPcontainer}>
                {renderOTPBoxes(OTPPin.split(''))}
                <TouchableOpacity style={styles.generateOTPButton} onPress={() => generateOTPPin()}>
                    <FontAwesome name={'gears'} size={25} color="#3386EB" />
                </TouchableOpacity>
            </View>
            {errorText ?
                <Text style={styles.errorText}>{errorText}</Text>
                :
                <Text style={styles.errorText}> </Text>
            }
            <FormButton
                buttonTitle={'Save'}
                customStyle={{borderRadius: 40, marginTop: 50}}
                onPress={() => onSave()}
            />
            <FormButton
                buttonTitle={'Share'}
                customStyle={{borderRadius: 40, width: '50%', marginTop: 20}}
                outLineStyle={true}
                onPress={() => onShare()}
            />
        </View>
    );
};

export default OTPScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    OTPcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        marginBottom: 20,
    },
    OTPBox: {
        margin: 5,
        borderColor: '#3386EB',
        borderWidth: 1,
        borderRadius: 5,
        width: '12%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    generateOTPButton:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    errorText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'red',
    },
});
