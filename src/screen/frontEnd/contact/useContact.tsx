import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
export default function useContact() {
  const user = auth().currentUser;
  const [users, setUsers] = useState<{[key: string]: UserData[]}>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();
        const userData = usersSnapshot.docs
          .map(doc => doc.data() as UserData)
          .filter(userData => userData.uid !== user?.uid);

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
  return {users};
}
