import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import FormButton from '../Components/FormButton'

const ProfileScreen = () => {

    const onClickLogout = (props)=>{
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <View style={styles.container}>
            <FormButton onPress={()=>onClickLogout()} buttonTitle={'Logout'} customStyle={{width:'50%', borderRadius:50}}/>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
        justifyContent:'center',
        alignItems:'center'
    },
})
