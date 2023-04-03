import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as rootNavigation from '../helpers/rootNavigation';
import moment from 'moment';
import { log } from 'react-native-reanimated';

const initialState = {
    error: false,
    message: null,
    isVisible: false,
    isVisibleAlert: false,
    fetchingData: false,
    ShoppingCar: [],
    ShoppingCarAmount: 0,
    count: 0,
    ingredients_amount: 0,
    tagsProducts: [],
    products: [],
    ingredients: [],
    CategoryIndredients: []

}

const ProductsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'CLEAR_STATE_INGREDIENTS':
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                CategoryIndredients: []
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
        case 'GET_TAG_PRODUCTS':
            return {
                ...state,
                tagsProducts: action.payload.tags,
                fetchingData: false
            }
        case 'GET_CATEGORY_INGREDIENTS':
            let CategoryIndredientsAux
            if (state.CategoryIndredients === undefined) {
                CategoryIndredientsAux = [action.payload.response];
            } else {
                CategoryIndredientsAux = [...state.CategoryIndredients, action.payload.response]
            }
            return {
                ...state,
                CategoryIndredients: CategoryIndredientsAux,
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
        case 'SET_TAG_PRODUCTS':
            return {
                ...state,
                tagsProducts: action.payload.updatedState,
                products: action.payload.response,
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

const clearStateIndredients = (dispatch) => {
    return () => {
        dispatch({ type: 'CLEAR_STATE_INGREDIENTS' });
    }
}

const isVisibleModal = (dispatch) => {
    return async (message) => {
        dispatch({
            type: 'CHANGE_VISIBLE_MODAL',
            payload: { message: '' }
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
const getTags = (dispatch) => {
    return async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token;
            const response = await httpClient.get(`categories`,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            const tags = response.map((item) => ({
                id: item.id, name:
                    item.name, selected: false,
                color: item.color
            }))
            dispatch({
                type: 'GET_TAG_PRODUCTS',
                payload: {
                    tags
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

const getIngredientsByCategory = (dispatch) => {
    return async (item) => {
        try {
            if (item.ingredient_id === null) {
                const user = JSON.parse(await AsyncStorage.getItem('user'));
                const token = user.token;
                const response = await httpClient.get(`categories/${item.category_id}`,
                    {
                        'Authorization': `Bearer ${token}`,
                    }
                );
                dispatch({
                    type: 'GET_CATEGORY_INGREDIENTS',
                    payload: {
                        response
                    }
                })
            } else {
                null
            }
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
    return async (products) => {

        try {
            let ingredients = products.product_ingredients.filter(product => product.ingredient_id === null)
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

const handleChipPress = (dispatch) => {
    return async (id, tagsProducts) => {
        const updatedState = [...tagsProducts];
        const chipIndex = updatedState.findIndex((chip) => chip.id === id);
        updatedState[chipIndex] = {
            ...updatedState[chipIndex],
        }
        updatedState.forEach((chip, index) => {
            if (index === chipIndex) {
                chip.selected = !chip.selected;
              } else {
                chip.selected = false;
              }
        });
        const result = updatedState.filter(item => item.selected == true);
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token;
        if (result.length != 0) {
            const response = await httpClient.get(`products?category_id=${id}`,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            dispatch({
                type: 'SET_TAG_PRODUCTS',
                payload: {
                    updatedState, response: response
                }
            })
        } else {
            const response = await httpClient.get(`products`,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            dispatch({
                type: 'SET_TAG_PRODUCTS',
                payload: {
                    updatedState, response
                }
            })
        }

    }
}


export const { Context, Provider } = createDataContext(
    ProductsReducer,
    {
        clearState,
        clearStateIndredients,
        isVisibleModal,
        isVisibleModalAlert,
        getProducts,
        getTags,
        getIngredients,
        getIngredientsByCategory,
        handleInputChange,
        handleChipPress,
        store

    },
    initialState
);