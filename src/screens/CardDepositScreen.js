import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, Dimensions, TextInput, Image
} from 'react-native';
import { Icon, Button, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../context/AccountDataContext';
import WebView from 'react-native-webview';
import Images from '@assets/images';
import MaskInput, { Masks } from 'react-native-mask-input';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment';

const { width } = Dimensions.get('window');

const CardDepositScreen = (props) => {

    const { route: { params: { amount, customer, payment_method, agreement, currency } } } = props
    const navigation = useNavigation();
    const { state
    } = useContext(AccountDataContext);

    return (
        <View style={{ flex: 1, backgroundColor: '#ECECEC', padding: 17, marginTop: 4, }}>
            <ScrollView style={{ backgroundColor: '#FFFFFF', width: '100%', padding: 19 }}>
                <Text style={styles.titlleText}>Ficha de deposito</Text>

                <Image
                    source={Images.logo}
                    accessible={true}
                    style={{ width: 259, height: 60, marginVertical: 10, marginBottom: 18, alignSelf: 'center' }}
                    resizeMode="contain"
                />

                <View style={{ borderColor: '#F28000', borderWidth: 2, padding: 5, borderRadius: 4, borderStyle: 'dashed' }}>
                    <Image
                        source={Images.bbvaLogo}
                        accessible={true}
                        style={{ width: 150, height: 40, marginVertical: 10, marginBottom: 18, alignSelf: 'flex-start' }}
                        resizeMode="contain"
                    />
                    <Text style={styles.RefereText}>Tipo de moneda: <Text style={styles.Refere2Text}>{currency}</Text></Text>
                    <Text style={styles.RefereText}>No. de referencia: <Text style={styles.Refere2Text}>{payment_method.agreement}</Text></Text>
                    <Text style={styles.RefereText}>Clabe: <Text style={styles.Refere2Text}>{payment_method.clabe}</Text></Text>
                    <Text style={styles.RefereText}>Titular: <Text style={styles.Refere2Text}>{customer.name}</Text></Text>
                    <Text style={styles.RefereText}>Cantidad a depositar: <Text style={styles.Refere2Text}>$ {amount}</Text></Text>

                    <Text style={{ fontSize: 10, textAlign: 'center', marginVertical: 10 }}>Al completar el pago recibirás un correo confirmando tu pago</Text>
                </View>
                <Text style={styles.titlle2Text}>Se cobrará una comisión adicional al momento de realizar el pago</Text>
               
                <Button
                    onPress={() => {
                        navigation.navigate('Inicio')
                    }}
                    title={'Continuar'}
                    buttonStyle={{ backgroundColor: '#004480', marginVertical: 30, borderRadius: 9 }}
                />
               
            </ScrollView >
        </View >
    )
}

export default CardDepositScreen

const styles = StyleSheet.create({

    titlleText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15
    },
    titlle2Text: {
        textAlign: 'center',
        fontSize: 11,
        marginVertical: 15
    },
    RefereText: {
        fontSize: 17,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    Refere2Text: {
        paddingLeft: 10,
        fontSize: 13,
        marginBottom: 15,
    },
    InputText: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 12,
    },
    DataText: {
        textAlign: 'left',
        fontSize: 12,
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
        marginBottom: 7
    },
    InputPayments: {
        borderWidth: 1,
        height: 35,
        paddingVertical: 9,
        paddingLeft: 9,
        borderRadius: 4,
        borderColor: '#707070',
        marginTop: 4,
        marginBottom: 6,
    },
})
