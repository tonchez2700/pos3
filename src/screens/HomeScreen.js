import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, ActivityIndicator
} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../context/AccountDataContext';
import tw from 'tailwind-react-native-classnames'
import EntryList from '../components/EntryList';
import moment from 'moment';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { state,
        clearState,
        setDataAccount,
        setDataPayment,
        setDataState
    } = useContext(AccountDataContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setDataAccount()
            setDataPayment()
            setDataState()
        });
        return unsubscribe;

    }, []);
    const colorTittle = state.AccountState?.EstatusRecibo != 1 ? '#F28000' : '#004480'
    const renderContent = () => {

        return (
            <View style={{ flex: 1, backgroundColor: '#ECECEC', justifyContent: 'flex-start', padding: 10 }}>
                <ScrollView>
                    <View style={tw`my-5`}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 8, fontSize: 19 }}>Bienvenido {state.data?.nombre}</Text>
                        <View style={[tw`p-2 `, {
                            shadowColor: 'black',
                            shadowOpacity: 0.26,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 10,
                            elevation: 3,
                            backgroundColor: 'white',
                            borderRadius: 4
                        }]}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 8, fontSize: 15 }}>Datos de la cuenta</Text>
                            <View style={tw`flex-col  justify-between p-5`}>
                                <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                    <Text style={styles.TextItems}>Sucursal:</Text>
                                    <Text style={{ textAlign: 'left', width: '50%' }}>{state.data?.Modulo}</Text>
                                </View>
                                <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                    <Text style={styles.TextItems}>No de cuenta:</Text>
                                    <Text style={{ textAlign: 'left', width: '50%' }}>{state.data?.cuenta}</Text>
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
                            </View>
                            {
                                state.AccountState.EstatusRecibo != 1
                                    ?
                                    <View>
                                        <Text style={{ paddingHorizontal: 14, textAlign: 'center', fontSize: 20, color: '#EE3232', fontWeight: 'bold' }}>{state.data?.MensajeSugerido}</Text>
                                        <Button
                                            onPress={() => {
                                                navigation.navigate('PaymentsScreen', state.data)
                                            }}
                                            title={'Realizar el pago'}
                                            buttonStyle={{ backgroundColor: '#004480', marginHorizontal: 10, marginTop: 12, marginBottom: 42, borderRadius: 9 }}
                                        />
                                    </View>
                                    :
                                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 20, color: '#148710', fontWeight: 'bold' }}>Su cuenta se encuentra al corriente.</Text>
                            }
                        </View>
                    </View>

                    <View style={tw`my-1`}>
                        <View style={[tw`p-2 pb-6`, {
                            shadowColor: 'black',
                            shadowOpacity: 0.26,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 10,
                            elevation: 3,
                            backgroundColor: 'white',
                            borderRadius: 4
                        }]}>
                            <View style={[tw`my-5`]}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Últimos 3 pagos</Text>
                            </View>
                            <View style={[tw` flex-row justify-between`, { width: '100%', marginTop: 8 }]}>
                                <Text style={[styles.TextTable, { width: '25%', backgroundColor: colorTittle }]}>Recibo</Text>
                                <Text style={[styles.TextTable, { width: '50%', backgroundColor: colorTittle }]}>Fecha</Text>
                                <Text style={[styles.TextTable, { width: '25%', backgroundColor: colorTittle }]}>Importe</Text>
                            </View>
                            <EntryList
                                data={state.payments}
                            />
                        </View>
                    </View>


                </ScrollView>
            </View >

        );
    }

    return (
        !state.fetchingData
            ?
            !state.error
                ?
                renderContent()
                :
                <View style={tw`flex-1 p-5 justify-center items-center`}>
                    <Text style={tw`text-center text-lg mb-3`}>
                        {state.message}
                    </Text>
                    <Button
                        containerStyle={{ width: 120 }}
                        buttonStyle={[{ backgroundColor: '#118ea6' }]}
                        title="Actualizar"
                        onPress={() => setDataAccount()}
                    />
                </View>
            :
            <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
    )
}
export default HomeScreen

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
        color: 'white',
    },
})
