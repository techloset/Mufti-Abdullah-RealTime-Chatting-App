import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {HomeUser} from '../../../constants/Types';
import {FIREBASE_COLLECTIONS} from '../../../constants/firebaseCollections/FirebaseCollectoin';

export default function useHome() {
  const user = auth().currentUser;
  const [usersData, setUsersData] = useState<HomeUser[] | undefined>(undefined);
  const [isAppLoading, setIsAppLoading] = useState(false);

  const fetchUsersData = async () => {
    if (!user) return;
    try {
      const usersChatQuerySnapshot = await firestore()
        .collection(FIREBASE_COLLECTIONS.USERSCHATS)
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
          .collection(FIREBASE_COLLECTIONS.USER)
          .doc(receiverId)
          .get();
        return userDoc.data() as HomeUser;
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
  const deleteUser = async (userId: string) => {
    try {
      setIsAppLoading(true);
      await firestore()
        .collection(FIREBASE_COLLECTIONS.CHATMESSAGES)
        .where('reciver', '==', userId)
        .where('sentBy', '==', user?.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
      await firestore()
        .collection(FIREBASE_COLLECTIONS.USERSCHATS)
        .where('receiverId', '==', userId)
        .where('sendby', '==', user?.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });

      console.log('User ID removed from usersChats collection');
      fetchUsersData();
      setIsAppLoading(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };

  return {
    usersData,
    user,
    isAppLoading,
    setIsAppLoading,
    handleDeleteUser,
    deleteUser,
  };
}
