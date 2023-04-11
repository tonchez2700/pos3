import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Modal, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
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
        deleteIngredient,
        storeProduct,
        setDirectionChange,
    } = useContext(ProductsContext);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearState()

        });
        return unsubscribe;
    }, [navigation]);

    // console.log(JSON.stringify(state.AddIngredientsList, null, 2));

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
                    <ScrollView
                        nestedScrollEnabled
                        style={styles.modalView}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="handled"
                        contentInsetAdjustmentBehavior="automatic">
                        <View style={ModalIngredientsSytle.header}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => setDirectionChange('Abajo')}
                                    containerStyle={{ marginLeft: '5%' }}
                                    style={[ModalIngredientsSytle.ButtonDirection, state.Direction === 'Abajo' ? { backgroundColor: "#D00053", marginRight: '2%' } : { marginRight: '2%' }]}>
                                    <Text style={{ fontSize: 17, color: '#A7A7A7' }}>Abajo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setDirectionChange('Medio')}
                                    containerStyle={{ marginLeft: '5%' }}
                                    style={[ModalIngredientsSytle.ButtonDirection, state.Direction === 'Medio' ? { backgroundColor: "#D00053", marginRight: '2%' } : { marginRight: '2%' }]}>
                                    <Text style={{ fontSize: 17, color: '#A7A7A7' }}>En medio</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setDirectionChange('Arriba')}
                                    containerStyle={{ marginLeft: '5%' }}
                                    style={[ModalIngredientsSytle.ButtonDirection, state.Direction === 'Arriba' ? { backgroundColor: "#D00053" } : null]}  >
                                    <Text style={{ fontSize: 17, color: '#A7A7A7' }}>Arriba</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.text}>Sabores restantes: {state.ingredients_amount}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[ModalIngredientsSytle.itemSelectContainer, state.Direction === 'Abajo' ? {
                                borderColor: '#26A9E1', borderRightWidth: 5, borderBottomWidth: 5, borderLeftWidth: 5,
                            } : { borderBottomWidth: 1, borderRightWidth: 1, }]}>
                                <Text style={{ fontSize: 24 }}> Abajo: </Text>
                                {
                                    state.AddIngredientsList.map((item, index) => (
                                        item.Direction == "Abajo"
                                            ?
                                            <TouchableOpacity
                                                key={index}
                                                style={ModalIngredientsSytle.itemSelectIng}
                                                onPress={() => deleteIngredient(index, 'Abajo')}>
                                                <Image
                                                    style={ModalIngredientsSytle.tinyLogo}
                                                    source={{ uri: `https://cpxproject.com/pos3/${item.url_image}` }}
                                                />
                                                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 18, }}> {item.name} X</Text>
                                            </TouchableOpacity>
                                            : null
                                    ))
                                }
                            </View>
                            <View style={[ModalIngredientsSytle.itemSelectContainer, state.Direction === 'Medio' ? {
                                borderColor: '#26A9E1', borderRightWidth: 5, borderBottomWidth: 5, borderLeftWidth: 5,
                            } : { borderBottomWidth: 1, borderRightWidth: 1, }]}>
                                <Text style={{ fontSize: 24 }}> Medio: </Text>
                                {
                                    state.AddIngredientsList.map((item, index) => (
                                        item.Direction == "Medio"
                                            ?
                                            <TouchableOpacity
                                                key={index}
                                                style={ModalIngredientsSytle.itemSelectIng}
                                                onPress={() => deleteIngredient(index, 'Medio')}>
                                                <Image
                                                    style={ModalIngredientsSytle.tinyLogo}
                                                    source={{ uri: `https://cpxproject.com/pos3/${item.url_image}` }}
                                                />
                                                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 18, }}> {item.name} X</Text>
                                            </TouchableOpacity>
                                            : null
                                    ))
                                }
                            </View>
                            <View style={[ModalIngredientsSytle.itemSelectContainer, state.Direction === 'Arriba' ? {
                                borderColor: '#26A9E1', borderRightWidth: 5, borderBottomWidth: 5, borderLeftWidth: 5,
                            } : {
                                borderBottomWidth: 1,
                                borderRightWidth: 1,
                            }]}>
                                <Text style={{ fontSize: 24 }}> Arriba: </Text>
                                {
                                    state.AddIngredientsList.map((item, index) => (
                                        item.Direction == "Arriba"
                                            ?
                                            <TouchableOpacity
                                                key={index}
                                                style={ModalIngredientsSytle.itemSelectIng}
                                                onPress={() => deleteIngredient(index, 'Arriba')}>
                                                <Image
                                                    style={ModalIngredientsSytle.tinyLogo}
                                                    source={{ uri: `https://cpxproject.com/pos3/${item.url_image}` }}
                                                />
                                                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 18, }}> {item.name} X</Text>
                                            </TouchableOpacity>
                                            : null
                                    ))
                                }
                            </View>
                        </View>
                        <IngredientsList
                            data={state.ingredient}
                        />
                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
                            <Button
                                onPress={() => isVisibleModal()}
                                titleStyle={{ fontSize: 14 }}
                                title={'Cancelar'}
                                buttonStyle={[ModalIngredientsSytle.ButtonBottom, { backgroundColor: '#C42228' }]}
                            />
                            <Button
                                onPress={() => { isVisibleModal() }}
                                titleStyle={{ fontSize: 14 }}
                                title={'Reiniciar'}
                                buttonStyle={[ModalIngredientsSytle.ButtonBottom, { backgroundColor: '#26A9E1' }]}
                            />
                            <Button
                                onPress={() => storeProduct(state.AddIngredientsList, state.selectProduct)}
                                titleStyle={{ fontSize: 14 }}
                                title={'Terminar'}
                                buttonStyle={[ModalIngredientsSytle.ButtonBottom, { backgroundColor: '#228032' }]}
                            />
                        </View>
                    </ScrollView>
                </View>
            </Modal >
        </View >
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
        position: "absolute",
        top: "20%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -80 }],
        width: width * 0.8,
        height: '80%',
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
    },
})
