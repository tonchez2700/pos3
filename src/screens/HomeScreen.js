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

    const { state, getProducts, getTags, handleInputChange } = useContext(ProductsContext);

    const messages = {
        name: 'sasdas',
        description: 'sdasd',
    }
    // https://cpxproject.com/pos3
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTags();
            getProducts();
        });
        return unsubscribe;
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, padding: 5 }}>
            {
                state.tagsProduct == undefined || state.products == undefined
                    ?
                    <View>
                        <ChipList data={state.tagsProducts} />
                        <ItemsList data={state.products} />
                    </View>
                    :
                    null
            }
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
