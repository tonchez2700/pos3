import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, Image

} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import * as OpenAnything from 'react-native-openanything';
import { Context as AccountDataContext } from '../context/AccountDataContext';
import tw from 'tailwind-react-native-classnames'
import EntryList from '../components/EntryList';


const AccountStatementScreen = () => {

    const navigation = useNavigation();
    const { state,
        clearState,
        setDataAccount,
        setDataPayment,
        setDataState
    } = useContext(AccountDataContext);

    useEffect(() => {
        setDataAccount()
        setDataPayment()
        setDataState()

    }, []);

    return (

        <View style={{ flex: 1, backgroundColor: '#ECECEC', justifyContent: 'flex-start', padding: 10 }}>
            <ScrollView>
                <View style={tw`my-5 px-3`}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 8, fontSize: 19 }}>Generar estado de cuenta</Text>
                    <View style={[tw`p-2 `, {
                        shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                        elevation: 3,
                        backgroundColor: 'white'
                    }]}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 8, fontSize: 15 }}>Datos de la cuenta</Text>
                        <View style={tw`flex-col  justify-between p-5`}>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={styles.TextItems}>Sucursal:</Text>
                                <Text style={{ textAlign: 'left', width: '50%' }}>{state.data?.Municipio}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={styles.TextItems}>No de cuenta:</Text>
                                <Text style={{ textAlign: 'left', width: '50%' }}>{state.data?.num_cuenta}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={styles.TextItems}>Artículo:</Text>
                                <Text style={{ textAlign: 'left', width: '50%' }}>{state.data?.Articulo}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={styles.TextItems}>Plan:</Text>
                                <Text style={{ textAlign: 'left', width: '50%' }}>{state.data?.Plan}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={styles.TextItems}>Saldo actual:</Text>
                                <Text style={{ textAlign: 'left', width: '50%' }}>${state.data?.SaldoActual}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={[styles.TextItems, { color: '#EE3232' }]}>Semanas de no pago:</Text>
                                <Text style={{ textAlign: 'left', width: '50%' }}>{state.StateAccount?.Acumulado}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Button
                    onPress={() => {
                        // OpenAnything.Pdf(`data:application/pdf;base64,${state.StateAccount?.PDF}`)
                        OpenAnything.Pdf(`${state.StateAccount?.PDF_liga}`)
                    }}
                    title={'Descargar estado de cuenta'}
                    buttonStyle={{ backgroundColor: '#F28000', marginHorizontal: 30, }}
                />

                <View style={tw`my-5 px-3`}>
                    <View style={[tw`p-2 pb-6`, {
                        shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                        elevation: 3,
                        backgroundColor: 'white'
                    }]}>
                        <View style={[tw`my-5`]}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Últimos 3 pagos</Text>
                        </View>
                        <View style={[tw` flex-row justify-between`, { width: '100%', marginTop: 8 }]}>
                            <Text style={[styles.TextTable, { width: '25%' }]}>Recibo</Text>
                            <Text style={[styles.TextTable, { width: '50%' }]}>Fecha</Text>
                            <Text style={[styles.TextTable, { width: '25%' }]}>Importe</Text>
                        </View>
                        <EntryList
                            data={state.payments}
                        />
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

export default AccountStatementScreen

const styles = StyleSheet.create({
    iconBtn: {
        backgroundColor: '#2D5DA0'
    },
    TextItems: {
        width: '50%',
        color: '#23233C',
        fontWeight: 'bold'
    },
    TextTable: {
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
        fontWeight: 'bold',
        backgroundColor: '#004480',
        color: 'white',
    },
    TextTableItems: {
        fontSize: 13,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1

    },
})
