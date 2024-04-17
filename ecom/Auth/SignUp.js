import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

 const SignUp = () => {
    return (
        <View >
            <Text >SignUp</Text>
            <TextInput />
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center'
    },
    signUpText: {
        fontSize:30,
        textAlign:'center'
    },
    signUpInput: {
        borderBottomWidth:0.5,
        height:48,
        borderBottomColor:"#8393a1",
        marginBottom:30
    }

})