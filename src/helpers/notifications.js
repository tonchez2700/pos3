import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
});

export const getPushNotificationToken = async () => {
  const response = configurePushNotification();
  if (!response) {
    return '';
  }
  
  const { data: pushTokenData } = await Notifications.getExpoPushTokenAsync();
  return pushTokenData;

}

export const configurePushNotification = async () => {
  /**
   * Verify if is physical device
   */
  if (!Device.isDevice) {
    Alert.alert(
      'Error al configurar las notificaciones',
      'No es posible recibir notificaciones push en un emulador, es necesario ejecutarlo en un dispositivo físico.'
    );
    return false;
  }

  /**
   * Request permission notifications
   */
  const hasPerm = await requireNotificationPermissions();
  if (!hasPerm) {
    Alert.alert(
      'Error al configurar las notificaciones',
      'No se otorgaron los permisos necesarios para las notificaciones.'
    );
    return false;
  }

  /**
   * Set default configs for android
   */
  switch(Platform.OS){
    case 'android':
      await setAndroidMobileDeviceNotificationsConfigs();
      break;
    case 'ios':
      await setIosMobileDeviceNotificationsConfigs();
      break;
  }

  return true;

}

export const requireNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (finalStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false
  }

  return true
}

export const setAndroidMobileDeviceNotificationsConfigs = async() => {
  await Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.DEFAULT
  });
}

export const setIosMobileDeviceNotificationsConfigs = async() => {
  // Set notif configs for ios devices
}