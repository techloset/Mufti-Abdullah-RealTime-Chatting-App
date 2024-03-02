import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
export default function useSearch() {
  const user = auth().currentUser || undefined;
  const [query, setQuery] = useState('');
  const [usersData, setUsersData] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const [userData, setUserData] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersSnapshot = await firestore().collection('users').get();
        const userData = usersSnapshot.docs.map(doc => doc.data());
        setUserData(userData.filter(userData => userData.uid !== user?.uid));
        setUsersData(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user]);
  const handleSearch = (text: string) => {
    setQuery(text);
    const filteredUsers = userData.filter(
      userData =>
        userData.username &&
        userData.username.toLowerCase().includes(text.toLowerCase()),
    );
    console.log('filteredUsers', filteredUsers);
    setUsersData(filteredUsers);
  };
  return {handleSearch, loading, query, setQuery, usersData};
}
