import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as rootNavigation from '../helpers/rootNavigation';
import { INVITED_ENTRY_TYPE, PROVIDER_ENTRY_TYPE, SERVICE_ENTRY_TYPE } from '../config/defines';
import moment from 'moment';

const initialState = {
    error: false,
    message: null,
    fetchingData: false,
    payments: [],
    AccountState: '',
    StateAccount: '',
    data: '',

}

const AccountDataReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'FETCHING_DATA':
            return { ...state, fetchingData: action.payload.fetchingData }
        case 'SET_REQUEST_ERROR':
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false
            }
        case 'SET_REQUEST_DATA':
            return {
                ...state,
                data: action.payload.response[0],
                AccountState: action.payload.AccountStatement[0],
                fetchingData: false
            }
        case 'SET_REQUEST_PAYMENTS':
            return {
                ...state,
                payments: action.payload.response,
                fetchingData: false
            }
        case 'SET_REQUEST_STATE':
            return {
                ...state,
                StateAccount: action.payload.response,
                fetchingData: false
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

const setDataAccount = (dispatch) => {
    return async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const data = {
                Modulo: user.modulo,
                Cuenta: user.cuenta,
            }
            const token = user.token;
            const response = await httpClient.post(
                'ws_entidad_credisuenos_datos_personales.php',
                data,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            const AccountStatement = await httpClient.post(
                'ws_entidad_credisuenos_recibo.php',
                data,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            console.log(response);
            dispatch({
                type: 'SET_REQUEST_DATA',
                payload: {
                    response, AccountStatement
                }
            })
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            })
        }
    }
}

const setDataPayment = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const data = {
                Modulo: user.modulo,
                Cuenta: user.cuenta,
                Cantidad: 3
            }
            const token = user.token;
            const response = await httpClient.post(
                'ws_entidad_credisuenos_pagos.php',
                data,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            dispatch({
                type: 'SET_REQUEST_PAYMENTS',
                payload: {
                    response
                }
            })
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            })
        }
    }
}


const setDataState = (dispatch) => {
    return async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const data = {
                Modulo: user.modulo,
                Cuenta: user.cuenta
            }
            const token = user.token;
            const response = await httpClient.post(
                'ws_entidad_credisuenos_estado_cuenta.php',
                data,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            dispatch({
                type: 'SET_REQUEST_STATE',
                payload: {
                    response
                }
            })
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            })
        }
    }
}


const handleInputChange = (dispatch) => {
    return async (value, typedata) => {
        dispatch({
            type: 'SET_ORDER_NUMBER',
            payload: { value, typedata }
        })
    }
}


export const { Context, Provider } = createDataContext(
    AccountDataReducer,
    {
        clearState,
        setDataAccount,
        setDataPayment,
        setDataState,
        handleInputChange,

    },
    initialState
);