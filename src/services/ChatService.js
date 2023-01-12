import { db, doc, getDoc, getDocs, onSnapshot, query, collection, setDoc, orderBy } from './../database/firebase';

export const addChatMessage = async (userId, chatData) => {
  try {
    const docRef = doc(collection(db, 'chats', `user_${userId}`, 'messages'));
    return await setDoc(docRef, chatData);
  } catch (error) {
    return { error: true, message: error.message }
  }
}

export const getChatById = async (chatId) => {
  try {
    const docRef = doc(db, 'chats', chatId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists())
      return null;

    return docSnap.data();
  } catch (error) {
    return { error: true, message: `No ha sido posible obtener el chat con el id: ${chatId} ` }
  }
}

export const getChatMessagesByUserId = async (userId) => {
  try {
    const docRef = collection(db, 'chats', `user_${userId}`, 'messages');
    const q = query(docRef, orderBy("createdAt", "desc"));
    const docSnap = await getDocs(q);
    return sanitizeChatResponse(docSnap);
  } catch (error) {
    return { error: true, message: error.message }
  }
}

export const onSnapshotUserChatMessages = async (userId, callback) => {
  try {
    const docRef = collection(db, 'chats', `user_${userId}`, 'messages');
    const q = query(docRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (doc) => callback( sanitizeChatResponse(doc) ));
    
  } catch (error) {
    return { error: true, message: error.message }
  }
}

const sanitizeChatResponse = (data) => {
  const d = formatChatResponse(data);
  return formatDates(d);
}

const formatChatResponse = (data) => {
  let result = [];
  data.forEach((doc) => {
    result = [...result, doc.data()]

  });
  return result;
}

const formatDates = (data, dateField = 'createdAt') => {
  data.forEach(item => {
    item.createdAt = new Date(item[dateField].seconds * 1000 + item[dateField].nanoseconds / 1000000)
  })
  return data;
}

const getUserIdFromKeyName = (keyName) => {
  const result = keyName.split("_")
  return result[result.length - 1]
}