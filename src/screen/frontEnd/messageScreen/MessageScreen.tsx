import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {CHATICON, HEADERICON} from '../../../constants/assets/AllImages';
import User from '../../../components/contactUserInfo/User';
import {styles} from './MessageScreenStyling';
import Loader from '../../../components/loader/Loader';
import useMessageScreen from './useMessageScreen';
import {COLORS} from '../../../constants/colors/Color';

export default function MessageScreen({route}: any) {
  const {
    currentUser,
    userDetails,
    messages,
    loading,
    navigation,
    message,
    setMessage,
    handleSubmit,
    messageLoading,
  } = useMessageScreen({route});
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
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.main}>
            {messages.map((message, index) => {
              const formattedDate = message.messageDate;
              let showDate = false;
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
                        <Text style={styles.MessageText}>
                          {message.message}
                        </Text>
                        <Text style={styles.time}>
                          {' '}
                          {message.messageTime.split(':').slice(0, 2).join(':')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.me}>
                      <Text style={styles.myText}>{message.message}</Text>
                      <Text style={styles.time}>
                        {message.messageTime.split(':').slice(0, 2).join(':')}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottom}>
        <CHATICON.Attachment style={styles.attachment} />
        <View style={styles.bootomView}>
          <TextInput
            placeholder="write Your Message"
            placeholderTextColor={COLORS.PLACEHOLDER}
            value={message}
            onChangeText={setMessage}
            style={styles.bottomInput}
          />
          {message ? (
            <Pressable onPress={handleSubmit}>
              {messageLoading ? (
                <ActivityIndicator size={'large'} color={COLORS.BLACK} />
              ) : (
                <Text style={styles.Send}>Send</Text>
              )}
            </Pressable>
          ) : (
            ''
          )}
          <CHATICON.File />
        </View>
        <CHATICON.Camera style={styles.camera} />
      </View>
    </>
  );
}
