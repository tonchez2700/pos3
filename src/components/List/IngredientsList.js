import React, { useContext, useState, useEffect } from 'react'
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as ProductsContext } from '../../context/ProductsContext';
import Aux from './Auxd';


const IngredientsList = ({ data }) => {

    const navigation = useNavigation();
    const { state, clearStateIndredients, getIngredientsByCategory, } = useContext(ProductsContext);

    useEffect(() => {
        clearStateIndredients()
        if (state.ingredients != '') {
            state.ingredients.map((item) => (
                getIngredientsByCategory(item)
            ))
        }
    }, [state.ingredients])

    // console.log(JSON.stringify(data.id, null, 2));

    return (
        <View style={{ flex: 1, padding: 5 }}>
            {
                state.CategoryIndredients != ''
                    ?
                    state.CategoryIndredients.map((item, index) => (
                        <View key={index}>
                            <Text>{item.name}</Text>
                            <Aux data={item.products} />
                        </View>
                    ))
                    :
                    null
            }
        </View >

    );
};
export default IngredientsList
