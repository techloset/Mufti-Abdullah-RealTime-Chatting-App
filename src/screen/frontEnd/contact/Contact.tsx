import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import User from '../../../components/contactUserInfo/User';
import {styles} from './ContactStyle';
import ContactHeader from '../../../components/tabHeader/ContactHeader';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {HEADERICON} from '../../../constants/assets/AllImages';
import {HeaderStyles} from '../../../styles/headerStyling/HeaderStyling';

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

export default function Contact() {
  const [users, setUsers] = useState<{[key: string]: UserData[]}>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();
        const userData = usersSnapshot.docs.map(doc => doc.data() as UserData);
        const groupedUsers: {[key: string]: UserData[]} = {};
        userData.forEach(user => {
          const firstLetter = user.username.charAt(0).toUpperCase();
          if (!groupedUsers[firstLetter]) {
            groupedUsers[firstLetter] = [];
          }
          groupedUsers[firstLetter].push(user);
        });
        setUsers(groupedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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
                // Handle search icon press
              }}>
              <HEADERICON.search style={HeaderStyles.imageSearch} />
            </TouchableOpacity>
            <Text style={HeaderStyles.screenName}>Contact</Text>
            <View style={HeaderStyles.image}>
              <HEADERICON.AddUser />
            </View>
          </View>
        </View>
        <ScrollView style={HeaderStyles.main}>
          {Object.entries(users).map(([letter, users]) => (
            <View key={letter} style={styles.LettersView}>
              <Text style={styles.LetterText}>{letter}</Text>
              {users.map((user, index) => (
                <User
                  key={index}
                  photoURL={user.photoURL}
                  username={user.username}
                  status={user.status}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </>
  );
}
