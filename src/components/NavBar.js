import React, { useContext } from 'react'
import { TouchableOpacity, StatusBar } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Logo from './Logo';
import Images from '@assets/images';

const NavBar = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  const open = () => {
    navigation.openDrawer();
  }

  return (
    <Header
      backgroundColor="#004480"
      barStyle="default"
      centerComponent={<Logo size='sm' />}
      leftContainerStyle={{ justifyContent: 'center' }}
      rightContainerStyle={{ justifyContent: 'center' }}
      leftComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={{ position: 'absolute', }}>
          <Icon
            name='envelope'
            size={25}
            type='font-awesome'
            color='white' />
        </TouchableOpacity>
      }
      rightComponent={
        <TouchableOpacity
          onPress={() => open()}
          style={{ position: 'absolute', }}>
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
