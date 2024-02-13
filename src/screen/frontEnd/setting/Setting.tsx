import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import User from '../../../components/contactUserInfo/User';
import SettingInfo from '../../../components/settingPageComponents/SettingInfo';
import {SETTINGICON} from '../../../constants/assets/AllImages';
import {styles} from '../../../components/settingPageComponents/Style';
import SettingHeader from '../../../components/tabHeader/SettingHeader';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../../navigation/SettingNavigation';
const NotificationIconComponent = SETTINGICON.NotificationIcon;
const HelpIconComponent = SETTINGICON.Help;
const PasswordIconComponent = SETTINGICON.Password;
const InviteIconComponent = SETTINGICON.Password;
interface navigationProps {
  navigation: StackNavigationProp<RootStackParamsList, 'setting', 'profile'>;
}
export default function Setting({navigation}: navigationProps) {
  return (
    <>
      <SettingHeader name="Setting" />
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderColor: 'white',
          borderWidth: 1,
          flex: 1,
          top: 90,
          zIndex: 1,
          position: 'relative',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('profile');
          }}>
          <View style={{marginLeft: 24, marginBottom: 16}}>
            <User />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 0.1,
            width: 375,
            backgroundColor: 'gray',
            marginVertical: 10,
            borderWidth: 1,
            marginHorizontal: 0,
          }}
        />

        <View style={{marginLeft: 24, marginTop: 2, marginBottom: 20}}>
          <SettingInfo
            name="Notifications"
            description="Messages, group and others"
            icon={<NotificationIconComponent style={styles.Profile} />}
          />
          <SettingInfo
            name="Help"
            description="Help center, contact us, privacy policy"
            icon={<HelpIconComponent style={styles.Profile} />}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('changePassword');
            }}>
            <SettingInfo
              name="Change Password"
              description="Change Account Password"
              icon={<PasswordIconComponent style={styles.Profile} />}
            />
          </TouchableOpacity>
          <SettingInfo
            name="Invite a friend"
            icon={<InviteIconComponent style={styles.Profile} />}
          />
        </View>
      </View>
    </>
  );
}
