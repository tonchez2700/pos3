import React, { useContext, useState } from 'react'
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as ProductsContext } from '../../context/ProductsContext';
import { Chip, Icon } from 'react-native-elements';
import { ItemListSytle } from '../../../theme/customTheme';
import { Context as AuthContext } from '../../context/AuthContext';
import ModalAlert from '../Modal/ModalIngredients';


const IngredientsList = ({ data }) => {

    const navigation = useNavigation();
    const { getIngredients, isVisibleModal, } = useContext(ProductsContext);

    return (
        <View style={ItemListSytle.container}>
            {
                data.map((item) => (


                    item.ingredient != null ?
                        <TouchableOpacity
                            key={item.id}
                            style={ItemListSytle.itemProduct}
                            onPress={() => getIngredients(item.id)}>
                            <Image
                                style={ItemListSytle.tinyLogo}
                                source={{ uri: `https://cpxproject.com/pos3/${item.ingredient.url_image}` }}
                            />
                            <Text style={ItemListSytle.itemText}>{item.ingredient.name}</Text>
                        </TouchableOpacity>
                        :
                        null

                ))
            }
        </View >

    );
};
export default IngredientsList
