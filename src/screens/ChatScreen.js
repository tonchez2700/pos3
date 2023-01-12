import { View } from 'react-native'
import React, { useEffect, useCallback, useContext, useRef } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Context as ChatContext } from '../context/ChatContext';

const ChatScreen = () => {
  const chatListener = useRef(null);
  const { state, sendChatMessage, initChatData } = useContext(ChatContext);

  useEffect(() => {
    /**
     * Add initial chat values and set the realtime listener
     */
    initChatData()
      .then((onSnapshot) => {
        chatListener.current = onSnapshot
      })
      .catch(error => console.log("Error al inicializar los datos del chat: ",error.message))

    return () => chatListener.current();

  }, [])

  const onSend = useCallback((messages = []) => {
    sendChatMessage(messages)
  }, [])

  return (
    <View style={{ flex:1 }}>
      {
        state.currentUser?.id_user
        ? <GiftedChat
            placeholder="Escriba su mensaje"
            isLoadingEarlier={true}
            messages={state.messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: state.currentUser?.id_user,
              name: state.currentUser?.username,
            }}
          />
        : null
      }
      
    </View>
  )
}

export default ChatScreen