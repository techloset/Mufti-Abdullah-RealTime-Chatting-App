import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, FlatList} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {HomeStyles} from './HomeStyling';
import UserInfo from '../../../components/userInfo/UserInfo';
import {
  HEADERICON,
  HOMEICON,
  USERPROFILEIMAGE,
} from '../../../constants/assets/AllImages';
import {HeaderStyles} from '../../../styles/HeaderStyling';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList, HomeUser} from '../../../constants/Types';
import uesHome from './uesHome';
import Loader from '../../../components/loader/Loader';

interface navigationProps {
  navigation: StackNavigationProp<HomeStackParamsList, 'HOMEPAGE'> & {
    navigate(screen: string, params: {userDetails: HomeUser}): void;
  };
}
export default function Home({navigation}: navigationProps) {
  const {usersData, user, handleDeleteUser, isAppLoading} = uesHome();

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
    </LinearGradient>
  );
}
