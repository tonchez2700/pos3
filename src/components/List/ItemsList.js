import React, { useContext, useState } from 'react'
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as ProductsContext } from '../../context/ProductsContext';
import { Chip, Icon } from 'react-native-elements';
import { ItemListSytle } from '../../../theme/customTheme';


const ItemsList = ({ data }) => {
    const navigation = useNavigation();
    const { state, getIngredients, } = useContext(ProductsContext);

    return (
        <View style={ItemListSytle.container}>
            {data.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={ItemListSytle.itemProduct}
                    onPress={() => getIngredients(item)}>
                    <Image
                        style={ItemListSytle.tinyLogo}
                        source={{ uri: `https://cpxproject.com/pos3/${item.url_image}` }}
                    />
                    <Text style={ItemListSytle.itemText}>{item.name}</Text>
                </TouchableOpacity>
            ))
            }
        </View >

    );
};
export default ItemsList
