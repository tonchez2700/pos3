import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView,
    Text, Dimensions, TextInput, Image
} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../context/AccountDataContext';
import Images from '@assets/images';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment';

const { width } = Dimensions.get('window');
const QuestionsMarkScreen = () => {


    const navigation = useNavigation();
    const { state
    } = useContext(AccountDataContext);
    return (

        <View style={{ flex: 1, backgroundColor: '#ECECEC', padding: 17, marginTop: 4, }}>
            <Text style={styles.titlleText}>Preguntas frecuentes</Text>

            <ScrollView style={{ backgroundColor: '#FFFFFF', width: '100%', padding: 19 }}>

            </ScrollView >
        </View >
    )
}

export default QuestionsMarkScreen

const styles = StyleSheet.create({

    titlleText: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 9
    },
    titlle2Text: {
        textAlign: 'center',
        fontSize: 12,
        marginBottom: 15
    },
    InsText: {
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 2
    },
    InsDataText: {
        textAlign: 'left',
        fontSize: 12,
        marginBottom: 2
    },
})
