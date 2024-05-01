import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {HomeUser} from '../../constants/types/types';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/firebaseCollectoin';

export default function useContact() {
  const user = auth().currentUser;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<{[key: string]: HomeUser[]}>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore()
          .collection(FIREBASE_COLLECTIONS.USER)
          .get();
        const userData = usersSnapshot.docs
          .map(doc => doc.data() as HomeUser)
          .filter(userData => userData.uid !== user?.uid);

        const groupedUsers: {[key: string]: HomeUser[]} = {};
        userData.forEach(user => {
          const firstLetter = user.username.charAt(0).toUpperCase();
          if (!groupedUsers[firstLetter]) {
            groupedUsers[firstLetter] = [];
          }
          groupedUsers[firstLetter].push(user);
        });
        const sortedKeys = Object.keys(groupedUsers).sort();
        const sortedUsers: {[key: string]: HomeUser[]} = {};
        sortedKeys.forEach(key => {
          sortedUsers[key] = groupedUsers[key];
        });
        setUsers(sortedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {users, loading};
}
