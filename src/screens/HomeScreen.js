import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text, ImageBackground, FlatList } from 'react-native';
import { Icon, Chip, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as ProductsContext } from '../context/ProductsContext';
import ModalIngredients from '../components/Modal/ModalIngredients';
import ModalAlert from '../components/Modal/ModalAlert';
import Images from '@assets/images';
import tw from 'tailwind-react-native-classnames'
import ItemsList from '../components/List/ItemsList';
import ChipList from '../components/ChipList';
import { general } from '../../theme/customTheme';



const HomeScreen = () => {
    const navigation = useNavigation();

    const { state, getProducts, handleInputChange } = useContext(ProductsContext);
    const data = [
        { id: 1, name: 'Yogurth', color: 'red' },
        { id: 2, name: 'Raspados', color: 'blue' },
        { id: 3, name: 'Empleados', color: 'green' },
        { id: 4, name: 'Uber Eats', color: 'purple' },
        { id: 5, name: 'Didi Food', color: 'orange' },
        { id: 6, name: 'Extras', color: 'orange' },
        { id: 7, name: 'Suvenir', color: 'orange' },
        { id: 8, name: 'Tarjeta de Regalo', color: 'orange' },
        { id: 9, name: 'Promociones de nieves', color: 'orange' },
    ];
    const messages = {
        name: 'sasdas',
        description: 'sdasd',
    }

    // https://cpxproject.com/pos3
    useEffect(() => {
        getProducts();
    }, [])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, padding: 5 }}>
            <View >
                <ChipList
                    data={data}
                />
                <ItemsList
                    data={state.products}
                />
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ width: '20%', fontSize: 14, color: '#131D26' }}>Cantidad</Text>
                <View style={{ width: '80%' }}>
                    <Input
                        value={state.count}
                        textAlign='center'
                        keyboardType='numeric'
                        onChangeText={(value) => handleInputChange(value, 'count')}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#CED4DA', top: 15 }}
                        style={general.inputCount}
                    />
                </View>
            </View>
            <ModalIngredients
                messages={messages}
            />
            <ModalAlert />

        </ScrollView >
    )
}
export default HomeScreen

const styles = StyleSheet.create({})
