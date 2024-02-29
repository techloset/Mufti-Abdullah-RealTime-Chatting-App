import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import User from '../../../components/contactUserInfo/User';
import {styles} from './ContactStyle';
import LinearGradient from 'react-native-linear-gradient';
import {HEADERICON} from '../../../constants/assets/AllImages';
import {HeaderStyles} from '../../../styles/headerStyling/HeaderStyling';
import {StackNavigationProp} from '@react-navigation/stack';
import {ContactStackParamsList} from '../../../constants/Types';
import useContact from './useContact';
import Model from '../../../components/model/Model';
interface UserData {
  confirmPassword: string;
  creationTime: string;
  email: string;
  password: string;
  photoURL: string;
  uid: string;
  profileImage: string;
  username: string;
  status: string;
  lastActive: string;
}

interface navigationProps {
  navigation: StackNavigationProp<ContactStackParamsList, 'CONTACTPAGE'> & {
    navigate(screen: string, params: {userDetails: UserData}): void;
  };
}
export default function Contact({navigation}: navigationProps) {
  const {users} = useContact();
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <LinearGradient
        style={HeaderStyles.mainContainer}
        colors={['#000', '#43116A']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={HeaderStyles.container}>
          <View style={HeaderStyles.topbar}>
            <TouchableOpacity
              style={HeaderStyles.iconContainer}
              onPress={() => {
                navigation.navigate('SEARCH');
              }}>
              <HEADERICON.search style={HeaderStyles.imageSearch} />
            </TouchableOpacity>
            <Text style={HeaderStyles.screenName}>Contact</Text>
            <TouchableOpacity onPress={toggleModal}>
              <View style={HeaderStyles.image}>
                <HEADERICON.AddUser />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={HeaderStyles.main}>
          {Object.entries(users).map(([letter, users]) => (
            <View key={letter} style={styles.LettersView}>
              <Text style={styles.LetterText}>{letter}</Text>
              {users.map((user, index) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('CHATSCREEN', {userDetails: user});
                  }}>
                  <User
                    key={index}
                    photoURL={user.photoURL}
                    username={user.username}
                    status={user.status}
                  />
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
      <Model isVisible={isModalVisible} />
    </>
  );
}
