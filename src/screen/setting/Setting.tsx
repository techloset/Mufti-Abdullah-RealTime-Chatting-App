import {
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SettingInfo from '../../components/settingPageComponents/SettingPageComponents';
import {HEADERICON, SETTINGICON} from '../../constants/assets/allImages';
import {styles} from '../../components/settingPageComponents/Style';
import {StackNavigationProp} from '@react-navigation/stack';

import {HeaderStyles} from '../../styles/headerStyling';
import {SettingStackParamsList, UserData} from '../../constants/types/types';

import {SettingStyles} from './settingStyles';
import useSetting from './useSetting';
import Loader from '../../components/loader/Loader';
import SettingUser from '../../components/settingUser/SettingUser';
interface navigationProps {
  navigation: StackNavigationProp<SettingStackParamsList, 'SETTING'>;
}
export default function Setting({navigation}: navigationProps) {
  const {user, usersData, handleLogout, loading} = useSetting();
  return (
    <>
      <ImageBackground
        style={HeaderStyles.mainContainer}
        source={require('../../assets/images/a0b7afd36c9b9128fdc5ae0e32bdfd6c.png')}>
        <View style={HeaderStyles.container}>
          <View style={HeaderStyles.topbar}>
            <TouchableOpacity style={HeaderStyles.iconContainerForSettingStack}>
              <HEADERICON.leftArrow style={HeaderStyles.imageSearch} />
            </TouchableOpacity>
            <Text style={HeaderStyles.screenName}>Setting</Text>
            <View></View>
          </View>
        </View>
        <View style={HeaderStyles.main}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <View style={SettingStyles.nouch}></View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PROFILE');
                }}>
                <View style={SettingStyles.user}>
                  <SettingUser
                    photoURL={user?.photoURL}
                    username={usersData?.username}
                    status={usersData?.status}
                  />
                </View>
              </TouchableOpacity>

              <View style={SettingStyles.line} />

              <View style={SettingStyles.main}>
                <SettingInfo
                  name="Notifications"
                  description="Messages, group and others"
                  icon={<SETTINGICON.NotificationIcon style={styles.Profile} />}
                />
                <SettingInfo
                  name="Help"
                  description="Help center, contact us, privacy policy"
                  icon={<SETTINGICON.Help style={styles.Profile} />}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CHANGE_PASSWORD');
                  }}>
                  <SettingInfo
                    name="Change Password"
                    description="Change Account Password"
                    icon={<SETTINGICON.Password style={styles.Profile} />}
                  />
                </TouchableOpacity>
                <SettingInfo
                  name="Invite a friend"
                  description="Talk with friends"
                  icon={<SETTINGICON.Password style={styles.Profile} />}
                />
                <Pressable onPress={() => handleLogout()}>
                  <SettingInfo
                    name="Logout"
                    description="Stay Safe Bye Bye"
                    icon={<SETTINGICON.Password style={styles.Profile} />}
                  />
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </>
  );
}
