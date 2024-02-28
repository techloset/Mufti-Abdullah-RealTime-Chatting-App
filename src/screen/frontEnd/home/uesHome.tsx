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
export default function uesHome() {
  const user = auth().currentUser || undefined;
  const [usersData, setUsersData] = useState<UserData[]>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.Users);
  console.log('🚀 ~ uesHome ~ users:', users);

  const Logout = useSelector(logout);
  const LogoutUser = () => {
    dispatch(Logout);
  };
  useEffect(() => {
    // const fetchUsers = async () => {
    //   try {
    //     const usersSnapshot = await firestore().collection('users').get();

    //     const usersSnapshotFromUsersChats = await firestore()
    //       .collection('usersChats')
    //       .get();
    //     const userChatId = usersSnapshotFromUsersChats.docs[0];
    //     console.log('🚀 ~ fetchUsers ~ userChatId:', userChatId);

    //     const usersData = usersSnapshot.docs
    //       .map(doc => doc.data() as UserData)
    //       .filter(userData => userData.uid !== user?.uid);
    //     setUsersData(usersData);
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   }
    // };
    dispatch(getUsers() as any);
    setUsersData(users as any);
    console.log('usersData', usersData);
    // fetchUsers();
  }, [usersData, dispatch]);
  return {LogoutUser, usersData, user};
}
