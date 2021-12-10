import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView} from 'react-native'
import FormButton from '../Components/FormButton'
import AppContext from '../Components/AppContext'
import {windowHeight, windowWidth} from '../utils/Dimentions';

const Authentication = () => {
    const [adminPin, setAdminPin] = useState('')
    const context = useContext(AppContext)
    const [errorText, setErrorText] = useState(null);

    console.log("111111",context)
    const checkPin = () =>{
        console.log("2222",adminPin)
        if(adminPin.toString() == context.AdminPinDB){
            context.setIsAuthenticated(true)
            setErrorText("");
            console.log("Authentication - success")
        }else{
            setErrorText("Invalid PIN");
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Text style={{color:"#3386EB"}}>Enter PIN</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={adminPin}
                    style={styles.input}
                    numberOfLines={1}
                    // placeholder={"Enter the Admin PIN"}
                    // placeholderTextColor="#3386EB"
                    keyboardType={"number-pad"}
                    onChangeText={pin => {
                        if(pin.length <= 6)
                            setAdminPin(pin)
                        }}
                    letterSpacing={45}
                />
            </View>
            {errorText ?
                <Text style={styles.errorText}>{errorText}</Text>
                :
                <Text style={styles.errorText}> </Text>
            }
            <FormButton buttonTitle={"Unlock"} onPress={()=>{checkPin()}}/>
        </KeyboardAvoidingView>
    )
}

export default Authentication

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 15,
        borderColor: '#3386EB',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#3386EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'red',
    },
})
