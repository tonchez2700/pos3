import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as ProductsContext } from '../../context/ProductsContext';
import { ModalIngredientsSytle } from '../../../theme/customTheme';
import { Icon, Button, Header } from 'react-native-elements'
import IngredientsList from '../List/IngredientsList';
import tw from 'tailwind-react-native-classnames'


const { width } = Dimensions.get("window");
const ModalIngredients = ({ messages }) => {

    const navigation = useNavigation();

    const {
        state,
        clearState,
        isVisibleModal,
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
                visible={state.isVisible}
                hardwareAccelerated
                animationType="slide"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() => isVisibleModal()}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <View style={ModalIngredientsSytle.header}>
                            <Text style={styles.text}>Sabores restantes: {state.ingredients_amount}</Text>
                            <Button
                                onPress={() => console.log("pato")}
                                titleStyle={{ fontSize: 17 }}
                                title={'Ingrediente Extra'}
                                buttonStyle={{ backgroundColor: '#D00053', borderRadius: 4, }}
                            />
                        </View>

                        <IngredientsList
                            data={state.ingredients}
                        />
                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
                            <Button
                                onPress={() => isVisibleModal()}
                                titleStyle={{ fontSize: 14 }}
                                title={'Cancelar'}
                                buttonStyle={[ModalIngredientsSytle.ButtonBottom, { backgroundColor: '#C42228' }]}
                            />
                            <Button
                                onPress={() => { isVisibleModal()}}
                                titleStyle={{ fontSize: 14 }}
                                title={'Reiniciar'}
                                buttonStyle={[ModalIngredientsSytle.ButtonBottom, { backgroundColor: '#26A9E1' }]}
                            />
                            <Button
                                onPress={() => console.log("pato")}
                                titleStyle={{ fontSize: 14 }}
                                title={'Terminar'}
                                buttonStyle={[ModalIngredientsSytle.ButtonBottom, { backgroundColor: '#228032' }]}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalIngredients

const styles = StyleSheet.create({

    text: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontSize: 19.36,
    },
    textbody: {
        color: 'black',
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 14.52,
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
        justifyContent: "space-between",
        position: "absolute",
        top: "26%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        width: width * 0.8,
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
    },
})
