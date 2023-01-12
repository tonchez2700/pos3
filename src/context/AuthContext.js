

import createDataContext from './createDataContext'
import httpClient from '../services/httpClient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as rootNavigation from '../helpers/rootNavigation';
import moment from 'moment';

const initialState = {
  error: false,
  message: null,
  fetchingData: false,
  user: null,
  isVisible: false
}

const loginReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'CLEAR_STATE':
      return initialState
    case 'FETCHING_DATA':
      return {
        ...state,
        error: false,
        message: null,
        fetchingData: action.payload.fetchingData
      }
    case 'SIGNIN':
      return {
        ...state,
        error: false,
        message: null,
        fetchingData: false,
        user: action.payload.user
      }
    case 'SIGNOUT':
      return { ...state, user: null, message: null }
    case 'SET_RESPONSE_ERROR':
      return {
        ...state,
        error: true,
        message: action.payload.message,
        fetchingData: false,
        user: null
      }
    case 'SET_REQUEST_ERROR':
      return {
        ...state,
        error: true,
        message: action.payload.message,
        fetchingData: false,
        user: null
      }
    case 'CHANGE_VISIBLE_MODAL':
      let visibleCheck = !state.isVisible
      return {
        ...state,
        isVisible: visibleCheck
      }

    default:
      return state
  }

}

const clearState = (dispatch) => {
  return () => {
    dispatch({ type: 'CLEAR_STATE' });
  }
}

const tryLocalSignin = (dispatch) => {
  return async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'SIGNIN', payload: { user } });
      rootNavigation.navigate('WrapperInnerScreens')
    } else {
      rootNavigation.navigate('AuthScreen')
    }
  }
}

const signin = (dispatch) => {
  return async ({ email, password }) => {
    dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
    try {
      tryAuth(email, password, dispatch);
    } catch (error) {
      dispatch({
        type: 'SET_REQUEST_ERROR',
        payload: {
          error: true,
          message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
        }
      });
    }
  }
}

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem('user')
    dispatch({ type: 'SIGNOUT' });
    rootNavigation.navigate('AuthScreen')
  }
}

const addUserNotificationToken = (dispatch, currentState) => {
  return async (phone_token) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      const token = user.token;
      const data = {
        user_id: currentState.user.id_user,
        phone_token
      }
      const response = await httpClient.post(
        'user-phone-token.php',
        data,
        { 'Authorization': `Bearer ${token}` }
      );
      return response
    } catch (error) {
      console.log('Ha ocurrido un error al guardar el token: ', error.message)
    }
  }
}

const tryAuth = async (email, password, dispatch) => {
  dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });

  const response = await httpClient.post('ws_entidad_credisuenos_users.php', { User: email, Pass: password })
  if (response != null) {
    const user = {
      id_user: response[0].id_user,
      username: response[0].username,
      token: response[0].token,
      modulo: response[0].modulo,
      cuenta: response[0].cuenta,
      solicitud: response[0].username
    }
    await AsyncStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: 'SIGNIN', payload: { user } });
    rootNavigation.navigate('WrapperInnerScreens')
  } else {
    dispatch({
      type: 'SET_RESPONSE_ERROR',
      payload: {
        error: true,
        message: 'Los accesos son incorrectos, favor de verificarlos.'
      }
    });
  }
}

const isVisibleModal = (dispatch) => {
  return async () => {
    dispatch({
      type: 'CHANGE_VISIBLE_MODAL',
    })
  }
}
export const { Context, Provider } = createDataContext(
  loginReducer,
  {
    signin,
    signout,
    clearState,
    tryLocalSignin,
    addUserNotificationToken,
    isVisibleModal
  },
  initialState
);