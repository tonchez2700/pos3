

import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addChatMessage, getChatMessagesByUserId, onSnapshotUserChatMessages } from './../services/ChatService';

const initialState = {
  error: false,
  currentUser: null,
  fetchingData: false,
  messages: [],
}

const chatReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'CLEAR_STATE':
      return initialState
    case 'SET_INITIAL_CHAT_DATA':
      return { ...state, messages: action.payload.messages, currentUser: action.payload.currentUser }
    case 'ADD_MESSAGE':
      return { ...state, messages: [action.payload.message, ...state.messages] }
    default:
      return state
  }

}

const clearState = (dispatch) => {
  return () => {
    dispatch({ type: 'CLEAR_STATE' });
  }
}

const sendChatMessage = (dispatch) => {
  return async (messages) => {
    try {
      if(messages.length > 0){
        const chatData = messages[0];
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        await addChatMessage(user.id_user, chatData);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

const initChatData = (dispatch) => {
  return async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      /***
       * Fetch messagges from firebase
       */
      return onSnapshotUserChatMessages(user.id_user, (messages) => {
        dispatch({
          type: 'SET_INITIAL_CHAT_DATA',
          payload: {
            currentUser: user,
            messages
          }
        });
      });
    } catch (error) {
      console.log("Ocurrio un error al inicializar los datos del chat: ", error.message)
    }
  }
}

export const { Context, Provider } = createDataContext(
  chatReducer,
  { sendChatMessage, initChatData },
  initialState
);