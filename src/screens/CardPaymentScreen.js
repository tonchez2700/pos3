import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View
} from 'react-native';
import { Icon, Button, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../context/AccountDataContext';
import WebView from 'react-native-webview';

const CardPaymentScreen = (props) => {

    const navigation = useNavigation();
    const { state
    } = useContext(AccountDataContext);

    return (

        <View style={{ flex: 1, backgroundColor: '#ECECEC', padding: 17, marginTop: 4, }}>
            <WebView
                style={{ marginTop: 20 }}
                startInLoadingState={true}
                useWebKit={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={true}
                automaticallyAdjustContentInsets={true}
                source={{
                    uri: props.route.params.payment_method.url
                }}
                onNavigationStateChange={(webViewState) => {
                    if (webViewState.url != props.route.params.payment_method.url) {
                        //navigate or close webview
                        navigation.navigate('Inicio')
                    }
                }}
            />
        </View >
    )
}

export default CardPaymentScreen

const styles = StyleSheet.create({

})
