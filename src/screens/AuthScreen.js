import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext';

const AuthScreen = () => {
    const { state, signin, clearState } = useContext(AuthContext);


    return (
        <View>
            <Text>sdasd</Text>
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
