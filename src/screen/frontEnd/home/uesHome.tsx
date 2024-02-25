import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../../../context/AuthContext';
interface UserData {
  photoURL: string;
  id: string;
  uid: string;
  imageUrl: string;
  username: string;
  status: string;
  timeAgo: string;
  description: string;
}
export default function uesHome() {
  const user = auth().currentUser || undefined;
  const [usersData, setUsersData] = useState<UserData[]>();
  const {Logout} = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();
        const usersData = usersSnapshot.docs
          .map(doc => doc.data() as UserData)
          .filter(userData => userData.uid !== user?.uid);
        setUsersData(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user]);
  return {Logout, usersData, user};
}
