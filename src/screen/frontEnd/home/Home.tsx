import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, FlatList} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {HomeStyles} from './HomeStyling';
import UserInfo from '../../../components/userInfo/UserInfo';
import {HEADERICON, HOMEICON} from '../../../constants/assets/AllImages';
import {HeaderStyles} from '../../../styles/headerStyling/HeaderStyling';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../../constants/Types';
import uesHome from './uesHome';
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
interface navigationProps {
  navigation: StackNavigationProp<HomeStackParamsList, 'HOMEPAGE'> & {
    navigate(screen: string, params: {userDetails: UserData}): void;
  };
}

export default function Home({navigation}: navigationProps) {
  const {LogoutUser, usersData, user, deleteUser} = uesHome();
  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };
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
              navigation.navigate('SEARCH');
            }}>
            <HEADERICON.search />
          </TouchableOpacity>
          <Text style={HeaderStyles.screenName} onPress={LogoutUser}>
            Home
          </Text>
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
          {usersData && usersData.length > 0 ? (
            <SwipeListView
              data={usersData}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('CHATSCREEN', {userDetails: item});
                  }}>
                  <UserInfo
                    profileImage={item.photoURL}
                    displayName={item.username}
                    status={item.status}
                    lastActive={item.timeAgo}
                  />
                </Pressable>
              )}
              renderHiddenItem={({item}) => (
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
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteUser(item.uid);
                    }}>
                    <HOMEICON.DeleteIcon />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-105}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
}
