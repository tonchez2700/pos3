import React, { useContext, useEffect, useRef } from 'react'
import { SafeAreaView, View, Alert, StyleSheet } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { navigationRef } from '../helpers/rootNavigation';

import { Provider as AccountDataProvider } from '../context/AccountDataContext';
import { Context as AuthContext } from '../context/AuthContext';
import { Provider as PaymentsContext } from '../context/PaymentsContext';

import CardPaymentScreen from './CardPaymentScreen';
import AccountStatementScreen from './AccountStatementScreen';
import PaymentsScreen from './PaymentsScreen';
import CashPaymentScreen from './CashPaymentScreen';
import CardDepositScreen from './CardDepositScreen';
import QuestionsMarkScreen from './QuestionsMarkScreen';
import ChatScreen from './ChatScreen';

import tw from 'tailwind-react-native-classnames';
import Images from '@assets/images';
import NavBar from '../components/NavBar'
import SimpleNavBar from '../components/SimpleNavBar'
import HomeScreen from './HomeScreen';
import { getPushNotificationToken } from './../helpers/notifications';
import * as Notifications from 'expo-notifications';

const Drawer = createDrawerNavigator();

const WrapperInnerScreens = () => {

  const { signout, addUserNotificationToken } = useContext(AuthContext);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    /**
     * Initialize notification service
     */
    initNotificationsService()
      .then(token => {
        return addUserNotificationToken(token)
      })
      .then(res => {
        if (res.error) {
          Alert.alert(
            "Error al configurar notificaciones",
            res.message,
          );
        }
      })
      .catch(error => console.log("Error con la sincronizacion de token: ", error.message))

    return () => {
      notificationListener.current.remove()
      responseListener.current.remove()
    }

  }, [])

  const initNotificationsService = async () => {
    try {
      const notificationToken = await getPushNotificationToken();
      if (!notificationToken)
        return '';

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //console.log("Se recibio la notificación ", notification.request.content);
      });

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //console.log("El cliente presiono la notificacion: ", response.notification.request);
      });

      return notificationToken;

    } catch (error) {
      console.log("Error al configurar las notificaciones: ", error.message)
    }
  }



  const CustomDrawerContent = (props) => {
    return (
      <View style={[tw`flex-1`, { backgroundColor: '#ECECEC' }]}>

        <SimpleNavBar />
        <DrawerContentScrollView {...props}
          style={{ paddingVertical: 0, marginTop: -5, backgroundColor: '#ECECEC' }}>
          <DrawerItem
            label="Inicio"
            onPress={() => props.navigation.navigate('Inicio')}
          />
          <DrawerItem
            label="Estado de Cuenta"
            onPress={() => props.navigation.navigate('AccountStatementScreen')}
          />
          <DrawerItem
            label="Preguntas Frecuentes"
            onPress={() => props.navigation.navigate('QuestionsMarkScreen')}
          />
          <DrawerItem
            label="Salir"
            onPress={() => {
              signout()
              props.navigation.closeDrawer()
            }}
          />

        </DrawerContentScrollView>

      </View>
    )
  }

  return (
    <SafeAreaView style={[tw`flex-1 `, { backgroundColor: '#ECECEC' }]}>
      <AccountDataProvider>
        <PaymentsContext>
          <Drawer.Navigator
            screenOptions={{
              drawerActiveBackgroundColor: '#005691',
              drawerInactiveBackgroundColor: '#FFFFFF',
              drawerActiveTintColor: '#FFFFFF',
              drawerInactiveTintColor: '#23233C',
              header: (...props) => (

                <NavBar navigation={props[0].navigation} />
              )
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            useLegacyImplementation>
            <Drawer.Screen name="Inicio" component={HomeScreen} />
            <Drawer.Screen name="Chat" component={ChatScreen} />
            <Drawer.Screen name="PaymentsScreen" component={PaymentsScreen} />
            <Drawer.Screen name="QuestionsMarkScreen" component={QuestionsMarkScreen} />
            <Drawer.Screen name="CardPaymentScreen" component={CardPaymentScreen} />
            <Drawer.Screen name="CashPaymentScreen" component={CashPaymentScreen} />
            <Drawer.Screen name="CardDepositScreen" component={CardDepositScreen} />
            <Drawer.Screen name="AccountStatementScreen" component={AccountStatementScreen} />
          </Drawer.Navigator>
        </PaymentsContext>
      </AccountDataProvider>
    </SafeAreaView>
  )
}

export default WrapperInnerScreens

const styles = StyleSheet.create({
  card_content: {
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
    shadowColor: 'black',
  },
  content_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})