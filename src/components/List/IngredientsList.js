import React, { useContext, useState, useEffect } from 'react'
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as ProductsContext } from '../../context/ProductsContext';
import { ItemListSytle } from '../../../theme/customTheme';
import Aux from './Auxd';
import { log } from 'react-native-reanimated';


const IngredientsList = ({ data }) => {

    const navigation = useNavigation();
    const { state, clearStateIndredients, getIngredientsByCategory, AddIngredient } = useContext(ProductsContext);

    useEffect(() => {
        clearStateIndredients()
        if (state.ingredients != '') {
            state.ingredients.map((item) => (
                getIngredientsByCategory(item)
            ))
        }
    }, [state.ingredients])

    // console.log(JSON.stringify(state.AddIngredientsList, null, 2));
    return (
        <View style={{ flex: 1, padding: 5 }}>
            {
                state.CategoryIndredients != ''
                    ?
                    <View>
                        {
                            state.ShoppingCarAmount <= state.CategoryIndredients.length - 1
                                ?
                                <View>
                                    <Text style={{ fontSize: 24 }}>Selecciona: {state.CategoryIndredients[state.ShoppingCarAmount].name}</Text>
                                    <View style={ItemListSytle.container}>
                                        {
                                            state.CategoryIndredients[state.ShoppingCarAmount].products.map((item) => (
                                                <TouchableOpacity
                                                    key={item.id}
                                                    style={ItemListSytle.itemProduct}
                                                    onPress={() => {
                                                        AddIngredient(item, state.Direction)
                                                    }}>
                                                    <Image
                                                        style={ItemListSytle.tinyLogo}
                                                        source={{ uri: `https:cpxproject.com/pos3/${item.url_image}` }}
                                                    />
                                                    <Text style={ItemListSytle.itemText}>{item.name}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View >
                                </View>
                                :
                                <Text style={{ fontSize: 24 }}>No hay más ingredientes</Text>
                        }
                    </View>
                    :
                    null
            }
        </View >
    );
};
export default IngredientsList
