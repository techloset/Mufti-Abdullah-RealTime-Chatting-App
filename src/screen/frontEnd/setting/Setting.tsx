import {Text, View} from 'react-native';
import React, {Component} from 'react';
import Header from '../../../components/tabHeader/Header';
import User from '../../../components/contactUserInfo/User';
import SettingInfo from '../../../components/settingPageComponents/SettingInfo';
import {SETTINGICON} from '../../../constants/assets/AllImages';
import {styles} from '../../../components/settingPageComponents/Style';

const NotificationIconComponent = SETTINGICON.NotificationIcon;
const HelpIconComponent = SETTINGICON.Help;
const PasswordIconComponent = SETTINGICON.Password;
const InviteIconComponent = SETTINGICON.Password;
export class Setting extends Component {
  render() {
    return (
      <>
        <Header name="Setting" />
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
          <View style={{marginLeft: 24, marginBottom: 16}}>
            <User />
          </View>
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
            <SettingInfo
              name="Change Password"
              description="Change Account Password"
              icon={<PasswordIconComponent style={styles.Profile} />}
            />
            <SettingInfo
              name="Invite a friend"
              icon={<InviteIconComponent style={styles.Profile} />}
            />
          </View>
        </View>
      </>
    );
  }
}

export default Setting;
