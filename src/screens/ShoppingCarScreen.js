import React from 'react'
import { StyleSheet, View, ScrollView, Text, ImageBackground, FlatList } from 'react-native';
import { Icon, Chip, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'



const ShoppingCarScreen = () => {
    const navigation = useNavigation();
    const [selectedChips, setSelectedChips] = React.useState([]);



    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, padding: 5 }}>

            <Text style={{ width: '20%', fontSize: 14, color: '#131D26' }}> Cantidad</Text>


        </ScrollView >
    )
}
export default ShoppingCarScreen

const styles = StyleSheet.create({})
