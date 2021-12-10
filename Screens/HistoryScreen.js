import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text>History Screen</Text>
        </View>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
        justifyContent:'center',
        alignItems:'center'
    },
})
