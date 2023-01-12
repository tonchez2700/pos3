import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as PaymentsContext } from '../../context/PaymentsContext';
import tw from 'tailwind-react-native-classnames'
import { Icon, Button } from 'react-native-elements'


const { width } = Dimensions.get("window");
const ModalAlert = () => {

    const navigation = useNavigation();

    const { state,
        clearState,
        isVisibleModal
    } = useContext(PaymentsContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearState()

        });
        return unsubscribe;
    }, [navigation]);
    return (
        <View style={styles.body}>
            <Modal
                visible={state.isVisible}
                hardwareAccelerated
                animationType="slide"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() =>
                    isVisibleModal()
                }>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Ocurrió un problema!</Text>
                        <Text style={styles.textbody}>{state.message}</Text>
                        <View >
                            <Button
                                onPress={() => {
                                    isVisibleModal()
                                }}
                                titleStyle={{ fontSize: 17 }}
                                title={'Aceptar'}
                                buttonStyle={{ backgroundColor: '#004480', borderRadius: 9, width: '100%' }}
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
        color: '#004480',
        fontWeight: 'bold',
        fontSize: 25,
    },
    textbody: {
        color: 'black',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 17,
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
