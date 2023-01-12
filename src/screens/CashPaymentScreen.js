import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, Dimensions, TextInput, Image
} from 'react-native';
import { Icon, Button, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../context/AccountDataContext';
import Images from '@assets/images';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment';

const { width } = Dimensions.get('window');
const CashPaymentScreen = (props) => {

    const { route: { params: { amount, customer, payment_method, agreement, currency } } } = props

    const navigation = useNavigation();
    const { state
    } = useContext(AccountDataContext);
    return (

        <View style={{ flex: 1, backgroundColor: '#ECECEC', padding: 17, marginTop: 4, }}>
            <ScrollView style={{ backgroundColor: '#FFFFFF', width: '100%', padding: 19 }}>
                <Text style={{
                    fontWeight: 'bold', textAlign: 'center',
                    fontSize: 35, color: '#004480',
                }}>${amount}<Text style={{ color: '#004480', fontSize: 14 }}>{currency}</Text></Text>
                <Text style={styles.titlleText}>Monto en efectivo</Text>
                <Text style={styles.titlle2Text}>Se cobrará una comisión adicional al momento de realizar el pago</Text>
                <Image
                    source={Images.logo}
                    accessible={true}
                    style={{ width: 259, height: 60, marginVertical: 10, marginBottom: 18, alignSelf: 'center' }}
                    resizeMode="contain"
                />

                <View>
                    <Image
                        source={{ uri: payment_method.barcode_url }}
                        accessible={true}
                        style={{ width: 259, height: 60, marginVertical: 10, marginBottom: 18, alignSelf: 'center' }}
                        resizeMode="contain"
                    />
                </View>


                <Text style={styles.titlleText}>No. de referencia</Text>
                <Text style={styles.titlle2Text}>{payment_method.reference}</Text>

                <Text style={{ fontSize: 10, textAlign: 'center' }}>Al completar el pago recibirás un correo confirmando tu pago</Text>

                <Text style={styles.InsText}>Instrucciones:</Text>

                <Text style={styles.InsDataText}>1.- Acude a cualquier tienda afiliada.</Text>
                <Text style={styles.InsDataText}>2.- Entrega al cajero el código de barras y menciona que realizarás un pago de servicio paynet.</Text>
                <Text style={styles.InsDataText}>3.- Realizar el pago en efectivo por $(la cantidad) MXN.</Text>
                <Text style={styles.InsDataText}>4.- Conserva el ticket para cualquier aclaración.</Text>

                <Text style={styles.InsText}>Instrucciones para el cajero:</Text>
                <Text style={styles.InsDataText}>1.- Ingresar al menú de pago de servicios.</Text>
                <Text style={styles.InsDataText}>2.- Seleccionar Paynet.</Text>
                <Text style={styles.InsDataText}>3.- Escanea el código de barras o ingresar el número de referencia.</Text>
                <Text style={styles.InsDataText}>4.- Ingresa la cantidad total a pagar.</Text>
                <Text style={styles.InsDataText}>5.- Confirma la transacción y entrega el ticket al cliente.</Text>


                <Button
                    onPress={() => {
                        navigation.navigate('PaymentsScreen')
                    }}
                    title={'Continuar'}
                    buttonStyle={{ backgroundColor: '#004480', marginVertical: 30, borderRadius: 9 }}
                />

            </ScrollView >
        </View >
    )
}

export default CashPaymentScreen

const styles = StyleSheet.create({

    titlleText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 2
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
        marginBottom: 7
    },
})
