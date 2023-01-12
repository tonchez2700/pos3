import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as rootNavigation from '../helpers/rootNavigation';
import { INVITED_ENTRY_TYPE, PROVIDER_ENTRY_TYPE, SERVICE_ENTRY_TYPE } from '../config/defines';
import moment from 'moment';
import { Value } from 'react-native-reanimated';

const initialState = {
    error: false,
    message: "",
    amount: '',
    isVisible: false,
    fetchingData: false,
    typePayment: '',
}

const PaymentsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'FETCHING_DATA':
            return { ...state, fetchingData: action.payload.fetchingData }
        case 'SET_REQUEST_ERROR':
            let visible = !state.isVisible
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false,
                isVisible: visible
            }
        case 'CHANGE_TYPE_PAYMENT':
            return {
                ...state,
                typePayment: action.payload.type
            }
        case 'CHANGE_AMOUNT_PAYMENT':
            let type = action.payload.type
            let amount = toString(action.payload.num)
            return {
                ...state,
                [type]: action.payload.num
            }
        case 'CHANGE_VISIBLE_MODAL':
            let visibleCheck = !state.isVisible
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
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

const TypeChange = (dispatch) => {
    return async (type) => {

        dispatch({
            type: 'CHANGE_TYPE_PAYMENT',
            payload: { type }
        })
    }
}


const TypeSelection = (dispatch) => {
    return async (type, DatosPersonales, EstadoCuenta, Recibo, amount) => {
        dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token;
        const userID = user.userID;
        const date = new Date();
        const TodayDate = moment(DatosPersonales.FechaLimitePago).format('YYYY-MM-DD')
        const idAccount = `${user.modulo}-${user.cuenta}-${moment(date).format('YYYY')}-${Recibo.NumRecibo}`;

        switch (type) {
            case 1:
                const dataCard = {
                    method: 'card',
                    amount: amount,
                    description: 'Cargo con banco',
                    order_id: idAccount,
                    due_date: TodayDate,
                    customer:
                    {
                        name: DatosPersonales.nombre,
                        email: Recibo.mail,
                        phone_number: DatosPersonales.Celular,
                        requires_account: false
                    },
                    confirm: false,
                    send_email: false,
                    redirect_url: 'http://www.openpay.mx/index.html'
                }
                const responseCard = await httpClient.post(
                    `Credisuenos_Cargo_Tarjeta.php`,
                    dataCard,
                    {
                        'Authorization': `Bearer ${token}`,
                    }
                );
                if (!responseCard.error_code) {
                    dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
                    rootNavigation.navigate('CardPaymentScreen', responseCard);
                } else {
                    let message = responseCard.description
                    dispatch({
                        type: 'SET_REQUEST_ERROR',
                        payload: { message }
                    })
                }

                break;
            case 2:

                const dataCardDeposit = {
                    method: 'bank_account',
                    amount: amount,
                    description: 'Cargo con tarjeta',
                    order_id: idAccount,
                    due_date: TodayDate,
                    customer:
                    {
                        name: DatosPersonales.nombre,
                        email: Recibo.mail,
                        phone_number: DatosPersonales.Celular,
                        requires_account: false,
                    },
                }
                const responseCardDeposit = await httpClient.post(
                    `Credisuenos_Cargo_Banco.php?${userID}`,
                    dataCardDeposit,
                    {
                        'Authorization': `Bearer ${token}`,
                    }
                );
                if (!responseCardDeposit.error_code) {
                    dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
                    rootNavigation.navigate('CardDepositScreen', responseCardDeposit);
                } else {
                    let message = responseCardDeposit.description
                    dispatch({
                        type: 'SET_REQUEST_ERROR',
                        payload: { message }
                    })
                }
                break;
            case 3:

                const user = JSON.parse(await AsyncStorage.getItem('user'));
                const dataCash = {
                    method: 'store',
                    amount: amount,
                    description: 'cargo por tienda',
                    order_id: idAccount,
                    due_date: TodayDate,
                    customer:
                    {
                        name: DatosPersonales.nombre,
                        email: Recibo.mail,
                        phone_number: DatosPersonales.Celular,
                        requires_account: false,
                    },
                }
                const responseCash = await httpClient.post(
                    `Credisuenos_Cargo_Banco.php?${userID}`,
                    dataCash,
                    {
                        'Authorization': `Bearer ${token}`,
                    }
                );
                // console.log(JSON.stringify(responseCash, null, 2));
                if (!responseCash.error_code) {
                    dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
                    rootNavigation.navigate('CashPaymentScreen', responseCash);
                } else {
                    let message = responseCash.description
                    dispatch({
                        type: 'SET_REQUEST_ERROR',
                        payload: { message }
                    })
                }
                break;

            default:
                break;
        }
    }
}

const isVisibleModal = (dispatch) => {
    return async (message) => {
        dispatch({
            type: 'CHANGE_VISIBLE_MODAL',
            payload: { message }
        })
    }
}

const AmountChange = (dispatch) => {
    return async (value, type) => {

        let num = value
        if (value == '' || value == undefined) {
            num = '  '
        } else {
            num = value
        }
        dispatch({
            type: 'CHANGE_AMOUNT_PAYMENT',
            payload: { num, type }
        })
    }
}

export const { Context, Provider } = createDataContext(
    PaymentsReducer,
    {
        clearState,
        TypeChange,
        TypeSelection,
        AmountChange,
        isVisibleModal,



    },
    initialState
);