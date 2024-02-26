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

  const addMessageToChat = async (receiverId: string, message: string) => {
    const currentUser = auth().currentUser;
    if (!currentUser || !currentUser?.uid || !receiverId || !message) return;

    const chatRef = firestore().collection('chats');
    await chatRef.add({
      senderId: currentUser.uid,
      receiverId,
      message,
      timestamp: new Date().toLocaleTimeString(),
      Date: new Date().toLocaleDateString(),
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || !userDetails) return;

      try {
        const querySnapshot = await firestore()
          .collection('chats')
          .where('receiverId', 'in', [currentUser.uid, userDetails.uid])
          .where('senderId', 'in', [currentUser.uid, userDetails.uid])
          .orderBy('Date', 'asc')
          .orderBy('timestamp', 'asc')
          .get();

        const fetchedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentUser, userDetails, messages]);

  // Render the date only when it changes
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
            const formattedDate = message.Date;
            let showDate = false;

            // Check if the current date is different from the previous one
            if (formattedDate !== prevDate) {
              showDate = true;
              prevDate = formattedDate;
            }

            return (
              <View key={index}>
                {showDate && <Text style={styles.text}>{formattedDate}</Text>}
                {message.senderId !== currentUser?.uid ? (
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
                      <Text style={styles.time}>{message.timestamp}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.me}>
                    <Text style={styles.myText}>{message.message}</Text>
                    <Text style={styles.time}>{message.timestamp}</Text>
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
