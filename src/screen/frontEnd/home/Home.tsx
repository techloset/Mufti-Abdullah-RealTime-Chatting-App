import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, FlatList} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import firestore from '@react-native-firebase/firestore';
import {HomeStyles} from './HomeStyling';
import UserInfo from '../../../components/userInfo/UserInfo';
import {HEADERICON, HOMEICON} from '../../../constants/assets/AllImages';
import {HeaderStyles} from '../../../styles/headerStyling/HeaderStyling';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../../navigation/HomeStackNavigation';
interface UserData {
  photoURL: string;
  id: string;
  imageUrl: string;
  username: string;
  status: string;
  timeAgo: string;
  description: string;
}
interface navigationProps {
  navigation: StackNavigationProp<RootStackParamsList, 'home'> & {
    navigate(screen: string, params: {userDetails: UserData}): void;
  };
}

export default function Home({navigation}: navigationProps) {
  const user = auth().currentUser || undefined;
  const [usersData, setUsersData] = useState<UserData[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();
        const usersData = usersSnapshot.docs.map(doc => doc.data() as UserData);
        setUsersData(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
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
              navigation.navigate('search');
            }}>
            <HEADERICON.search />
          </TouchableOpacity>
          <Text style={HeaderStyles.screenName}>Home</Text>
          {user?.photoURL ? (
            <Image
              source={{uri: user.photoURL || undefined}}
              style={HeaderStyles.profilePhoto}
            />
          ) : (
            <View style={HeaderStyles.alternatePhoto}></View>
          )}
        </View>
      </View>

      <View style={HeaderStyles.main}>
        <SafeAreaView style={HomeStyles.textContainer1}>
          <SwipeListView
            data={usersData}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('messages', {userDetails: item});
                }}>
                <UserInfo
                  profileImage={item.photoURL}
                  displayName={item.username}
                  status={item.status}
                  lastActive={item.timeAgo}
                />
              </Pressable>
            )}
            renderHiddenItem={() => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  justifyContent: 'flex-end',
                  marginHorizontal: 10,
                  paddingTop: 13,
                  paddingHorizontal: 5,
                  gap: 6,
                }}>
                <HOMEICON.Noftification />
                <HOMEICON.DeleteIcon />
              </View>
            )}
            rightOpenValue={-105}
          />
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
}
