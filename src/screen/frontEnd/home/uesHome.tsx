import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../redux/AuthSlice';
import {getUsers} from '../../../redux/UserSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/Store';

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

export default function useHome() {
  const user = auth().currentUser || undefined;
  const [usersData, setUsersData] = useState<UserData[] | null>(null);
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.Users);

  const Logout = useSelector(logout);
  const LogoutUser = () => {
    dispatch(Logout);
  };

  const fetchUsersData = async () => {
    if (!user) return;
    try {
      const usersChatQuerySnapshot = await firestore()
        .collection('usersChats')
        .where('sendby', '==', user.uid)
        .get();

      const receiverIdsSet: Set<string> = new Set();
      usersChatQuerySnapshot.forEach(doc => {
        const {receiverId} = doc.data();
        receiverIdsSet.add(receiverId);
      });

      const receiverIds: string[] = Array.from(receiverIdsSet);

      const usersDataPromises = receiverIds.map(async receiverId => {
        const userDoc = await firestore()
          .collection('users')
          .doc(receiverId)
          .get();
        return userDoc.data() as UserData;
      });

      const resolvedUsersData = await Promise.all(usersDataPromises);
      setUsersData(resolvedUsersData);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };
  useEffect(() => {
    fetchUsersData();
  }, [user?.uid, usersData]);
  console.log('usersData', usersData);
  const deleteUser = async (userId: string) => {
    try {
      // Delete chat messages where sender ID matches the user's ID
      await firestore()
        .collection('chatMessages')
        .where('reciver', '==', userId)
        .where('sentBy', '==', user?.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });

      console.log('Chat messages deleted where user was sender or receiver');

      // Remove user ID from usersChats collection
      await firestore()
        .collection('usersChats')
        .where('receiverId', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });

      console.log('User ID removed from usersChats collection');

      // Fetch updated users data
      fetchUsersData();
      console.log('User data updated after deletion');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return {LogoutUser, usersData, user, deleteUser};
}
