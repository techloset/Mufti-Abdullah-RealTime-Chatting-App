import {
  FlatList,
  Image,
  PushNotificationIOS,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import User from '../../../components/contactUserInfo/User';
import {styles} from './SearchStyles';
import {SEARCHPAGEICON} from '../../../constants/assets/AllImages';
import {UserProfileData} from '../../../constants/Types';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
export default function Search() {
  const user = auth().currentUser || undefined;
  const [query, setQuery] = useState('');
  const [usersData, setUsersData] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();
        const usersData = usersSnapshot.docs.map(doc => doc.data());
        setUsersData(usersData.filter(userData => userData.uid !== user?.uid));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user]);
  const handleSearch = (text: string) => {
    setQuery(text);
    const filteredUsers = usersData.filter(
      userData =>
        userData.username &&
        userData.username.toLowerCase().includes(text.toLowerCase()),
    );
    console.log('filteredUsers', filteredUsers);
    setUsersData(filteredUsers);
  };

  return (
    <>
      <View style={styles.searchView}>
        <SEARCHPAGEICON.SearchBlack style={styles.searchImage} />
        <TextInput
          placeholder="Search"
          style={styles.Input}
          placeholderTextColor="black"
          onChangeText={handleSearch}
          value={query}
        />
        <TouchableOpacity onPress={() => setQuery('')}>
          <SEARCHPAGEICON.Remove style={styles.removeImage} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.HeadingView}>
          <Text style={styles.PeopleText}>People</Text>
          <FlatList
            data={usersData}
            keyExtractor={item => item.uid}
            renderItem={({item}) => (
              <User
                photoURL={item.photoURL}
                username={item.username}
                status={item.status}
              />
            )}
          />
        </View>
        <View style={styles.HeadingView}>
          <Text style={styles.GroupText}>Group Chat</Text>
          <User photoURL={undefined} username={undefined} status={''} />
          <User photoURL={undefined} username={undefined} status={''} />
          <User photoURL={undefined} username={undefined} status={''} />
          <User photoURL={undefined} username={undefined} status={''} />
          <User photoURL={undefined} username={undefined} status={''} />
        </View>
      </ScrollView>
    </>
  );
}
