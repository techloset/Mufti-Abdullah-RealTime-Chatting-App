import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, FlatList} from 'react-native';

import {iconSearch} from '.../../../src/assets/icons/Search.png'; // Import the search icon
import {SwipeListView} from 'react-native-swipe-list-view'; // Import SwipeListView
import firestore from '@react-native-firebase/firestore';
interface UserData {
  photoURL: string;
  id: string;
  imageUrl: string;
  username: string;
  status: string;
  timeAgo: string;
  description: string;
}
export default function BAGHOME() {
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
      style={MesssageStyles.mainContainer}
      colors={['#000', '#43116A']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={MesssageStyles.container}>
        <View style={MesssageStyles.topbar}>
          <TouchableOpacity
            style={MesssageStyles.iconSearchContainer}
            onPress={() => {
              // Handle search icon press
            }}>
            <Image source={iconSearch} style={MesssageStyles.imageSearch} />
          </TouchableOpacity>
          <Text style={MesssageStyles.screenName}>Home</Text>
          {user?.photoURL ? (
            <Image
              source={{uri: user?.photoURL || undefined}}
              style={MesssageStyles.profilePhoto}
            />
          ) : (
            <View style={MesssageStyles.alternatePhoto}></View>
          )}
        </View>
      </View>

      <View style={MesssageStyles.main}>
        <SafeAreaView style={MesssageStyles.textContainer1}>
          <SwipeListView
            data={usersData}
            renderItem={({item}) => (
              <UserInfo
                profileImage={item.photoURL}
                displayName={item.username}
                status={item.status}
                lastActive={item.timeAgo}
              />
            )}
            renderHiddenItem={() => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  justifyContent: 'flex-end',
                  marginHorizontal: 10,
                  padding: 7,
                }}>
                <Text style={{color: 'black'}}>Delete</Text>
                <Text style={{color: 'black'}}>Notify</Text>
              </View>
            )}
            rightOpenValue={-105}
          />
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
}

import {StyleSheet} from 'react-native';
import UserInfo from './src/components/userInfo/UserInfo';

export const MesssageStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 27,
  },
  iconSearchContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    backgroundColor: 'white',
  },
  imageSearch: {
    height: 22,
    width: 22,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  profilePhoto: {
    width: 44,
    height: 44,
    borderRadius: 30,
  },
  alternatePhoto: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'black',
    opacity: 0.4,
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 27,
  },
  screenName: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  image: {
    width: 52,
    height: 52,
    backgroundColor: '#666',
    borderRadius: 26,
  },
  textContainer: {
    flex: 1,
    paddingStart: 12,
  },
  textContainer1: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeAgo: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
  },
});
