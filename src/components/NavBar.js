import React, { useContext } from 'react'
import { TouchableOpacity, StatusBar, Text } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ProductsContext } from '../context/ProductsContext';
import { useNavigation } from '@react-navigation/native';
import Logo from './Logo';
import Images from '@assets/images';

const NavBar = (navigation) => {
    const { state } = useContext(ProductsContext);
    const navigations = useNavigation();
    const open = () => {
        navigation.navigation.openDrawer();
    }
    console.log(state.shopingProduct);
    return (
        <Header
            backgroundColor="#00ABE3"
            barStyle="default"
            containerStyle={{ height: 85 }}
            leftContainerStyle={{ justifyContent: 'center' }}
            rightContainerStyle={{ justifyContent: 'center' }}
            rightComponent={
                <TouchableOpacity
                    onPress={() => navigations.navigate('ShoppingCarScreen')}
                    style={{ position: 'absolute' }}>
                    <Icon
                        name='shopping-cart'
                        size={25}
                        type='font-awesome'
                        color='white' />
                    {
                        state.shopingProduct.length != 0
                            ?
                            <Badge value={state.shopingProduct.length} status="error" containerStyle={{ position: 'absolute', top: -4, right: -4, }} />
                            :
                            null
                    }
                </TouchableOpacity>
            }
            leftComponent={
                <TouchableOpacity
                    onPress={() => open()}
                    style={{ position: 'absolute' }}>
                    <Icon
                        name='bars'
                        size={25}
                        type='font-awesome'
                        color='white' />
                </TouchableOpacity>
            }
        />

    )
}

export default NavBar
