import React, { useContext, useState } from 'react'
import { View, StatusBar, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as ProductsContext } from '../../context/ProductsContext';
import { Icon } from 'react-native-elements';
import { ShopListSytle } from '../../../theme/customTheme';
import { Context as AuthContext } from '../../context/AuthContext';
import ModalAlert from '../Modal/ModalIngredients';


const ShoppingList = ({ data }) => {

    const navigation = useNavigation();
    const { state, getIngredients, } = useContext(ProductsContext);

    return (
        <View style={styles.table}>
            {data.map((item) => (

                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Image
                            style={ShopListSytle.tinyLogo}
                            source={{ uri: `https://cpxproject.com/pos3/${item.url_image}` }}
                        />
                    </View>
                    <View style={styles.cell}>
                        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>{item.name}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>${item.price_base}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>{item.price_base}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>${item.price_base}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Icon
                            name='basket-remove'
                            size={35}
                            type='material-community'
                            color='red' />
                    </View>
                </View>
                // <TouchableOpacity
                //     key={item.id}
                //     style={ShopListSytle.itemProduct}
                //     onPress={() => getIngredients(item, state.count)}>
                //     <Image
                //         style={ShopListSytle.tinyLogo}
                //         source={{ uri: `https://cpxproject.com/pos3/${item.url_image}` }}
                //     />
                //     <Text style={ShopListSytle.itemText}>{item.name}</Text>
                // </TouchableOpacity>
            ))
            }
        </View >

    );
};
export default ShoppingList

const styles = StyleSheet.create({

    table: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#D0D3D6'
    },
    cell: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
})