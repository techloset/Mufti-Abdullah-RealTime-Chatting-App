import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-notifications';

export default function useMessageScreen({route}: any) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser;
  const {userDetails} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  function getCurrentDate() {
    var currentDate = new Date();
    var day = String(currentDate.getDate()).padStart(2, '0');
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
    var year = currentDate.getFullYear();

    return day + ' /' + month + ' /' + year;
  }
  const handleSubmit = async () => {
    try {
      await addMessageToChat(userDetails.uid, message);
      Toast.show('message send', {type: 'success', placement: 'top'});
      setMessage('');
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  const randomId = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);

  const addMessageToChat = async (receiverId: string, message: string) => {
    const currentUser = auth().currentUser;
    if (!currentUser || !currentUser?.uid || !receiverId || !message) return;

    try {
      const chatRef = firestore().collection('chats').doc(randomId);
      const chatDoc = await chatRef.get();
      const chatMessages = firestore().collection('chatMessages').doc(randomId);
      const messageRef = chatMessages.collection('messages').doc();
      const usersChat = firestore().collection('usersChats').doc();
      await usersChat.set({
        chatId: randomId,
        receiverId: userDetails.uid,
        sendby: currentUser.uid,
      });
      await chatMessages.set({
        sentBy: currentUser.uid,
        reciver: userDetails.uid,
        messageDate: getCurrentDate(),
        messageTime: new Date().toLocaleTimeString(),
        message: message,
      });
      if (!chatDoc.exists) {
        await chatRef.set(
          {
            members: [currentUser.uid, receiverId],
            lastMessageSent: '',
          },
          {merge: true},
        );
      }

      await chatRef.update({
        lastMessageSent: messageRef.id,
        members: firestore.FieldValue.arrayUnion(receiverId),
      });
    } catch (error) {
      console.error('Error adding message to chat:', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || !userDetails) return;

      try {
        const querySnapshot = await firestore()
          .collection('chatMessages')
          .where('reciver', 'in', [currentUser.uid, userDetails.uid])
          .where('sentBy', 'in', [currentUser.uid, userDetails.uid])
          .orderBy('messageDate', 'desc')
          .orderBy('messageTime', 'asc')
          .get();
        const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
        setMessages(fetchedMessages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentUser, userDetails, messages]);

  return {
    currentUser,
    userDetails,
    messages,
    loading,
    navigation,
    message,
    setMessage,
    setMessages,
    handleSubmit,
  };
}
