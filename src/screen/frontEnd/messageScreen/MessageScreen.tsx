import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {CHATICON, HEADERICON} from '../../../constants/assets/AllImages';
import User from '../../../components/contactUserInfo/User';
import {styles} from './MessageScreenStyling';
import {useNavigation} from '@react-navigation/native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
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
    console.log('messages', messages);
    if (!currentUser || !currentUser?.uid || !receiverId || !message) return;

    const chatRef = firestore()
      .collection('chats')
      .doc(currentUser.uid)
      .collection('messages')
      .add({
        senderId: currentUser.uid,
        receiverId,
        message,
        timestamp: new Date().toLocaleTimeString(),
        Date: new Date().toLocaleDateString(),
      });
    // await chatRef.add({
    //   subchat: {},
    // });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || !userDetails) return;
      try {
        const querySnapshot = await firestore()
          .collection('chats')
          .doc(currentUser.uid)
          .collection('messages')
          .where('receiverId', 'in', [currentUser.uid, userDetails.uid])
          .where('senderId', 'in', [currentUser.uid, userDetails.uid])
          .orderBy('timestamp', 'asc')
          .get();

        const fetchedMessages = querySnapshot.docs.map(doc => doc.data());

        console.log('fetchedMessages', fetchedMessages);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentUser, userDetails, message]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigation.goBack}>
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
          {messages.map((message, index) => (
            <Text key={index} style={styles.text}>
              {message.Date}
            </Text>
          ))}

          {messages.map((message, index) => {
            console.log('Sender ID:', message.senderId);
            console.log('Current User ID:', currentUser?.uid);

            if (message.senderId !== currentUser?.uid) {
              return (
                <View key={index} style={styles.MainUser}>
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
              );
            }
          })}
          {messages.map(
            (message, index) =>
              message.senderId === currentUser?.uid && (
                <View key={index} style={styles.me}>
                  <Text style={styles.myText}>{message.message}</Text>
                  <Text style={styles.time}>{message.timestamp}</Text>
                </View>
              ),
          )}
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
