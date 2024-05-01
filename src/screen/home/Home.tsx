import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React from 'react';

import {SafeAreaView, FlatList} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {HomeStyles} from './homeStyling';
import UserInfo from '../../components/userInfo/UserInfo';
import {
  HEADERICON,
  HOMEICON,
  USERPROFILEIMAGE,
} from '../../constants/assets/allImages';
import {HeaderStyles} from '../../styles/headerStyling';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList, HomeUser} from '../../constants/types/types';
import uesHome from './uesHome';

interface navigationProps {
  navigation: StackNavigationProp<HomeStackParamsList, 'HOMEPAGE'> & {
    navigate(screen: string, params: {userDetails: HomeUser}): void;
  };
}
export default function Home({navigation}: navigationProps) {
  const {usersData, user, handleDeleteUser, isAppLoading} = uesHome();

  return (
    <ImageBackground
      style={HeaderStyles.mainContainer}
      source={require('../../assets/images/a0b7afd36c9b9128fdc5ae0e32bdfd6c.png')}>
      <View style={HeaderStyles.container}>
        <View style={HeaderStyles.topbar}>
          <TouchableOpacity
            style={HeaderStyles.iconContainer}
            onPress={() => {
              navigation.navigate('SEARCH');
            }}>
            <HEADERICON.search />
          </TouchableOpacity>
          <Text style={HeaderStyles.screenName}>Home</Text>
          {user && user.photoURL ? (
            <Image
              source={{uri: user.photoURL}}
              style={HeaderStyles.profilePhoto}
            />
          ) : (
            <View style={HeaderStyles.alternatePhoto}>
              <USERPROFILEIMAGE.ProfileImage />
            </View>
          )}
        </View>
      </View>
      <View style={HeaderStyles.main}>
        <View style={HomeStyles.nouch}></View>

        <SafeAreaView style={HomeStyles.textContainer1}>
          <SwipeListView
            data={usersData}
            renderItem={({item}) => {
              if (!item) {
                return null;
              }
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate('CHATSCREEN', {userDetails: item})
                  }>
                  <UserInfo
                    profileImage={item.photoURL}
                    displayName={item.username}
                    status={item.status}
                    lastActive={item.lastSeen}
                  />
                </Pressable>
              );
            }}
            renderHiddenItem={({item}) => (
              <View style={HomeStyles.hiddenItem}>
                <HOMEICON.Noftification />
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteUser(item.uid);
                  }}>
                  {isAppLoading ? (
                    <ActivityIndicator color={'red'} size={'large'} />
                  ) : (
                    <HOMEICON.DeleteIcon />
                  )}
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-105}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
