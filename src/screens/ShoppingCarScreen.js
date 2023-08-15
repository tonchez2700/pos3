import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text, ImageBackground, FlatList } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements'
import { Context as ProductsContext } from '../context/ProductsContext';
import { useNavigation } from '@react-navigation/native';
import { ShopListSytle } from '../../theme/customTheme';
import ShoppingList from '../components/List/ShoppingList';
import tw from 'tailwind-react-native-classnames'



const ShoppingCarScreen = () => {
    const navigation = useNavigation();
    const { state, clearState, handleInputChange } = useContext(ProductsContext);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, padding: 10 }}>

            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={ShopListSytle.itemTextTittle}>Producto</Text>
                    <Text style={ShopListSytle.itemTextTittle}>Descripción</Text>
                    <Text style={ShopListSytle.itemTextTittle}>Cantidad</Text>
                    <Text style={ShopListSytle.itemTextTittle}>Total</Text>
                </View>
                <ShoppingList
                    data={state.shopingProduct}
                />

                <View style={{ justifyContent: 'flex-end', padding: 10, }}>
                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: '20%', fontSize: 25, color: '#131D26' }}>Tarjeta de regalo: </Text>
                        <View style={{ width: '80%' }}>
                            <Input
                                value={state.count}
                                textAlign='center'
                                keyboardType='numeric'
                                onChangeText={(value) => handleInputChange(value, 'count')}
                                inputContainerStyle={{ borderWidth: 1, borderColor: '#CED4DA', top: 15 }}
                                style={ShopListSytle.inputCount}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                        <View style={{ flexDirection: 'column', width: '80%' }}>
                            <Text style={ShopListSytle.itemText}>Total :</Text>
                            <Text style={ShopListSytle.itemText}>Descuento :</Text>
                            <Text style={[ShopListSytle.itemText, { fontWeight: '700' }]}>Nuevo Total :</Text>
                        </View>
                        {/* #EFF2F7 */}
                        <View style={{ flexDirection: 'column', width: '20%' }}>
                            <Text style={[ShopListSytle.itemText, { textAlign: 'center' }]}>$ {state.shopingProduct.reduce((suma, obj) => suma + obj.price_base, 0)}</Text>
                            <Text style={[ShopListSytle.itemText, { textAlign: 'center' }]}>$ 0</Text>
                            <Text style={[ShopListSytle.itemText, { fontWeight: '700', textAlign: 'center' }]}>$ {state.shopingProduct.reduce((suma, obj) => suma + obj.price_base, 0)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            onPress={() => { clearState(), navigation.goBack() }}
                            titleStyle={{ fontSize: 25 }}
                            title={'Cancelar'}
                            buttonStyle={[ShopListSytle.ButtonBottom, { backgroundColor: '#C42228' }]}
                        />

                        <Button
                            onPress={() => console.log("pato")}
                            titleStyle={{ fontSize: 25 }}
                            title={'Terminar'}
                            buttonStyle={[ShopListSytle.ButtonBottom, { backgroundColor: '#228032' }]}
                        />
                    </View>

                </View>
            </View>
        </ScrollView >
    )
}
export default ShoppingCarScreen

const styles = StyleSheet.create({

    table: {
        flexDirection: 'column',
    },
    row: {
        backgroundColor: '#26A9E1',
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        backgroundColor: '#26A9E1'
    },

})
