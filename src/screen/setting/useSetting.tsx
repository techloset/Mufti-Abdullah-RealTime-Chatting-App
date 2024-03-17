import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {UserData} from '../../constants/types/Types';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch} from '../../store/store';
import {logout} from '../../store/slices/AuthSlice';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/FirebaseCollectoin';
export default function useSetting() {
  const dispatch = useAppDispatch();
  const user = auth().currentUser;

  const [usersData, setUsersData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user) {
          const usersSnapshot = await firestore()
            .collection(FIREBASE_COLLECTIONS.USER)
            .doc(user.uid)
            .get();
          const userData = usersSnapshot.data();

          if (userData) {
            setUsersData(userData as UserData);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [usersData]);
  const handleLogout = async () => {
    setLoading(true);
    if (user) {
      const userRef = firestore()
        .collection(FIREBASE_COLLECTIONS.USER)
        .doc(user.uid);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        await userRef.update({
          lastSeen: new Date().toLocaleTimeString(),
        });
      } else {
        await userRef.set({
          lastSeen: new Date().toLocaleTimeString(),
        });
      }
      dispatch(logout());
      setLoading(false);
    }
  };
  return {user, loading, usersData, handleLogout};
}
