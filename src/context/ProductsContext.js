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
    isVisible: false,
    isVisibleAlert: false,
    fetchingData: false,
    ShoppingCar:[],
    ShoppingCarAmount: 0,
    count: 0,
    ingredients_amount: 0,
    products: [],
    ingredients: [],

}

const ProductsReducer = (state = initialState, action) => {

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
        case 'CHANGE_VISIBLE_MODAL':
            let visibleCheck = !state.isVisible
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                isVisible: visibleCheck
            }
        case 'CHANGE_VISIBLE_MODAL_ALERT':
            let visibleCheckAlert = !state.isVisibleAlert
            return {
                ...state,
                error: false,
                message: action.payload.message,
                fetchingData: false,
                isVisibleAlert: visibleCheckAlert
            }
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload.response,
                fetchingData: false
            }
        case 'GET_INGREDIENTS':
            return {
                ...state,
                ingredients: action.payload.ingredients,
                ingredients_amount: action.payload.ingredients_amount,
                fetchingData: false,
                isVisible: true
            }
        case 'SET_ANSWER':
            let typeValue = action.payload.type
            return {
                ...state,
                [typeValue]: action.payload.value
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

const isVisibleModal = (dispatch) => {
    return async (message) => {
        dispatch({
            type: 'CHANGE_VISIBLE_MODAL',
            payload: { message: ''}
        })
    }
}


const isVisibleModalAlert = (dispatch) => {
    return async (message) => {
        dispatch({
            type: 'CHANGE_VISIBLE_MODAL_ALERT',
            payload: { message }
        })
    }
}

const getProducts = (dispatch) => {
    return async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token;
            const response = await httpClient.get(`products`,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            dispatch({
                type: 'GET_PRODUCTS',
                payload: {
                    response
                }
            })
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el getUserQuestionnaires no está disponible, inténtelo mas tarde.'
                }
            })
        }
    }
}

const getIngredients = (dispatch) => {
    return async (products, count) => {
        if (count == 0) {
            dispatch({
                type: 'CHANGE_VISIBLE_MODAL_ALERT',
                payload: { message: 'Lo siento, debe seleccionar una cantidad antes de agregar el producto' }
            })
        } else {
            try {
                let ingredients = products.product_ingredients
                let ingredients_amount = products.ingredients_amount
                dispatch({
                    type: 'GET_INGREDIENTS',
                    payload: {
                        ingredients, ingredients_amount
                    }
                })
            } catch (error) {
                console.log(error);
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'Por el momento el getUserQuestionnaires no está disponible, inténtelo mas tarde.'
                    }
                })
            }
        }
    }
}

const handleInputChange = (dispatch) => {
    return async (value, type) => {
        dispatch({
            type: 'SET_ANSWER',
            payload: {
                type, value
            }
        })
    }
}


const store = (dispatch) => {
    return async (questionnaire_id, question_id, option_id) => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token;
            const id = user.userData.id;

            const data = {
                questionnaire_id: questionnaire_id,
                question_id: question_id,
                option_id: option_id
            }

            const response = await httpClient.post(`users/${id}/answers`, data,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );

        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el getUserQuestionnaires no está disponible, inténtelo mas tarde.'
                }
            })
        }
    }
}


export const { Context, Provider } = createDataContext(
    ProductsReducer,
    {
        clearState,
        isVisibleModal,
        isVisibleModalAlert,
        getProducts,
        getIngredients,
        handleInputChange,
        store

    },
    initialState
);