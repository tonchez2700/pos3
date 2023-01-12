import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity, Text, TextInput
} from 'react-native';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as PaymentsContext } from '../context/PaymentsContext';
import { Context as AccountDataContext } from '../context/AccountDataContext';
import AnimetedText from '../components/AnimetedText';
import ModalAlert from '../components/Modal/ModalAlert';
import tw from 'tailwind-react-native-classnames'


const PaymentsScreen = (props) => {

    const navigation = useNavigation();

    const { state,
        clearState,
        TypeChange,
        TypeSelection,
        AmountChange,
    } = useContext(PaymentsContext);
    const { state: stateData } = useContext(AccountDataContext);

    const dollarMask = createNumberMask({
        delimiter: ',',
        separator: '.',
        precision: 0,
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearState()

        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AmountChange(stateData.StateAccount.PagoInicial, 'amount')
        });
        return unsubscribe;
    }, [navigation]);

    return (

        <View style={{ flex: 1, backgroundColor: '#ECECEC', padding: 17, paddingTop: 4 }}>
            <ScrollView>
                <View style={[tw`my-5 px-5 py-5`, { backgroundColor: '#FFFFFF' }]}>
                    <Text style={styles.titlleText}>Selecciona tu método de pago</Text>
                    <TouchableOpacity
                        style={[styles.btnPayments, state.typePayment === 1 ? { backgroundColor: "#004480" } : null]}
                        onPress={() => TypeChange(1)}
                    >
                        <View style={[tw`flex-row`, { width: '100%', paddingHorizontal: 25, alignItems: 'center' }]}>
                            <Icon
                                size={30}
                                name='credit-card'
                                style={{ marginRight: 10 }}
                                type='FontAwesome5'
                                color={state.typePayment === 1 ? "white" : null} />
                            <Text style={[styles.btnText, state.typePayment === 1 ? { color: "white" } : null]}>Tarjetas de débito o crédito</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btnPayments, state.typePayment === 2 ? { backgroundColor: "#004480" } : null]}
                        onPress={() => TypeChange(2)}
                    >
                        <View style={[tw`flex-row`, { width: '100%', paddingHorizontal: 25, alignItems: 'center' }]}>
                            <Icon
                                size={30}
                                name='receipt'
                                style={{ marginRight: 10 }}
                                type='FontAwesome5'
                                color={state.typePayment === 2 ? "white" : null} />
                            <Text style={[styles.btnText, state.typePayment === 2 ? { color: "white" } : null]}>Ficha de depósito</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btnPayments, state.typePayment === 3 ? { backgroundColor: "#004480" } : null]}
                        onPress={() => TypeChange(3)}
                    >
                        <View style={[tw`flex-row`, { width: '100%', paddingHorizontal: 25, alignItems: 'center' }]}>
                            <Icon
                                size={30}
                                name='shop'
                                style={{ marginRight: 10 }}
                                type='entypo'
                                color={state.typePayment === 3 ? "white" : null} />
                            <Text style={[styles.btnText, state.typePayment === 3 ? { color: "white" } : null]}>Pago con efectivo en tiendas</Text>
                        </View>

                    </TouchableOpacity>
                    <View style={[tw`flex-row`, styles.PaymentText]}>
                        <View style={{ width: '40%' }}>
                            <Text style={{
                                textAlign: 'left', fontSize: 15,
                            }}>Total de pago </Text>
                        </View>
                        <View style={{ width: '60%', flexDirection: 'row-reverse', alignItems: 'center' }}>
                            {
                                state.amount != "" ?
                                    < MaskInput
                                        style={{
                                            fontWeight: 'bold', textAlign: 'right',
                                            fontSize: 19, color: '#004480',
                                        }}
                                        value={state.amount}
                                        mask={dollarMask}
                                        keyboardType="numeric"
                                        onChangeText={(masked, unmasked) => AmountChange(unmasked, 'amount')}
                                    />
                                    :
                                    null
                            }
                            <Text style={{
                                fontWeight: 'bold', textAlign: 'right',
                                fontSize: 19, color: '#004480',
                            }}>$</Text>

                        </View>
                    </View>

                    {
                        state.typePayment == ''
                            ?
                            <AnimetedText />
                            :
                            null
                    }
                    <Button
                        onPress={() => TypeSelection(state.typePayment, props.route.params, stateData.StateAccount, stateData.AccountState, state.amount)}
                        title={'Continuar'}
                        loading={state.fetchingData ? true : false}
                        titleStyle={{ color: 'white' }}
                        disabled={state.typePayment === '' ? true : false}
                        buttonStyle={[styles.btnMenu, state.typePayment === '' ? { backgroundColor: '#686F75' } : { backgroundColor: '#004480' }, { marginTop: 30 }]}
                    />
                    <Button
                        onPress={() => navigation.goBack()}
                        title={'Cancelar'}
                        titleStyle={{ color: 'white' }}
                        buttonStyle={[styles.btnMenu, { marginTop: 22, backgroundColor: '#686F75' }]}
                    />
                </View>
                {
                    state.error === true
                        ?
                        <ModalAlert />
                        :
                        null
                }
            </ScrollView >
        </View >
    )
}

export default PaymentsScreen

const styles = StyleSheet.create({

    titlleText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 15
    },
    btnText: {
        fontSize: 15,
    },
    PaymentText: {
        backgroundColor: '#E9E9E9',
        borderRadius: 5,
        padding: 19,
        marginVertical: 15

    },
    btnPayments: {
        borderColor: '#F28000',
        alignItems: 'center',
        borderWidth: 2,
        paddingVertical: 25,
        borderRadius: 10,
        marginVertical: 7,
    },
    btnMenu: {
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
    },
})
