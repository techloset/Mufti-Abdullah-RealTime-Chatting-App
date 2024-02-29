import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {CHATICON, HEADERICON} from '../../../constants/assets/AllImages';
import User from '../../../components/contactUserInfo/User';
import {styles} from './MessageScreenStyling';

export default function MessageScreen({route}: any) {
  const navigation = useNavigation();
  const currentUser = auth().currentUser;
  const {userDetails} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  const handleSubmit = async () => {
    try {
      await addMessageToChat(userDetails.uid, message);
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
      // Check if the chat document exists, if not, create it
      const chatRef = firestore().collection('chats').doc(randomId);
      const chatDoc = await chatRef.get();

      if (!chatDoc.exists) {
        // Create the chat document
        await chatRef.set(
          {
            members: [currentUser.uid, receiverId],
            lastMessageSent: '',
          },
          {merge: true},
        );
      }
      const chatMessages = firestore().collection('chatMessages').doc(randomId);
      // Add message to 'chatMessages' collection
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
        messageDate: new Date().toLocaleDateString(),
        messageTime: new Date().toLocaleTimeString(),
        message: message,
      });

      // Update lastMessageSent in 'chats' collection
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
          .orderBy('messageDate', 'asc')
          .orderBy('messageTime', 'asc')
          .get();
        const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentUser, userDetails, messages]);
  // console.log('randomId', randomId);
  // Render the date only when it changes
  console.log('messages', messages);
  let prevDate = '';
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <HEADERICON.ArrowBlack style={styles.icons} width={30} height={30} />
        </TouchableOpacity>
        <User
          photoURL={userDetails.photoURL}
          username={userDetails.username}
          status={'Active Now'}
        />
      </View>
      <ScrollView>
        <View style={styles.main}>
          {messages.map((message, index) => {
            const formattedDate = message.messageDate;
            let showDate = false;

            // Check if the current date is different from the previous one
            if (formattedDate !== prevDate) {
              showDate = true;
              prevDate = formattedDate;
            }

            return (
              <View key={index}>
                {showDate && <Text style={styles.text}>{formattedDate}</Text>}
                {message.sentBy !== currentUser?.uid ? (
                  <View style={styles.MainUser}>
                    <View style={styles.user}>
                      <Image
                        source={{uri: userDetails.photoURL}}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.userMessage}>
                      <Text style={styles.Description}>
                        {userDetails.username}
                      </Text>
                      <Text style={styles.MessageText}>{message.message}</Text>
                      <Text style={styles.time}>{message.messageTime}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.me}>
                    <Text style={styles.myText}>{message.message}</Text>
                    <Text style={styles.time}>{message.messageTime}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <CHATICON.Attachment style={styles.attachment} />
        <View style={styles.bootomView}>
          <TextInput
            placeholder="write Your Message"
            placeholderTextColor={'#797C7B80'}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSubmit}
            style={styles.bottomInput}
          />
          <CHATICON.File />
        </View>
        <CHATICON.Camera style={styles.camera} />
      </View>
    </>
  );
}
