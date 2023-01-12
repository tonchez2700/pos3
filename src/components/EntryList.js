import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const EntryList = ({ data }) => {

    const navigation = useNavigation();
    return (

        <View>
            {
                data.map((e) =>
                    <View key={e.NumRecibo} style={[tw`flex-row`, { backgroundColor: 'white' }]}>
                        <Text style={[styles.TextTableItems, { width: '25%' }]}>{e.NumRecibo}</Text>
                        <Text style={[styles.TextTableItems, { width: '50%' }]}>{moment(e.FechaCobro).format('DD/MM/YYYY')}</Text>
                        <Text style={[styles.TextTableItems, { width: '25%' }]}>${e.Importe}</Text>
                    </View>
                )
            }
        </View>
    )
}

export default EntryList

const styles = StyleSheet.create({

    TextTableItems: {
        fontSize: 13,
        padding: 10,
        textAlign: 'center',
        color: '#000000',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1

    },
})
