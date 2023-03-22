import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as ProductsContext } from '../../context/ProductsContext';
import { ModalIngredientsSytle } from '../../../theme/customTheme';
import { Icon, Button, Header } from 'react-native-elements'
import IngredientsList from '../List/IngredientsList';
import tw from 'tailwind-react-native-classnames'


const { width } = Dimensions.get("window");
const ModalAlert = () => {

    const navigation = useNavigation();

    const {
        state,
        clearState,
        isVisibleModalAlert,
    } = useContext(ProductsContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearState()
        });
        return unsubscribe;
    }, [navigation]);


    return (
        <View style={styles.body}>
            <Modal
                visible={state.isVisibleAlert}
                hardwareAccelerated
                animationType="slide"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() => isVisibleModalAlert()}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Ocurrió un problema!</Text>
                        <Text style={styles.textbody}>"{state.message}"</Text>
                        <View >
                            <Button
                                onPress={() => { isVisibleModalAlert() }}
                                titleStyle={{ fontSize: 17 }}
                                title={'Aceptar'}
                                buttonStyle={{ backgroundColor: '#00ABE3', borderRadius: 9, width: '100%' }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalAlert

const styles = StyleSheet.create({

    text: {
        color: '#00ABE3',
        fontWeight: 'bold',
        fontSize: 25,
    },
    textbody: {
        color: 'black',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 20,
    },
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: "40%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 200,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
})
