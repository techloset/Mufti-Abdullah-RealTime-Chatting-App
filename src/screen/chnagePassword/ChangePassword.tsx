import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from '../../authScreens/signup/SignupStyles';
import LinearGradient from 'react-native-linear-gradient';
import {HEADERICON} from '../../../constants/assets/AllImages';
import {HeaderStyles} from '../../../styles/HeaderStyling';
import {useNavigation} from '@react-navigation/native';
import useChangePassword from './useChangePassword';
import {chnagepasswordStyles} from './ChangePasswordStyles';

export default function ChangePassword() {
  const {
    setConfirmPassword,
    confirmPassword,
    newPassword,
    currentPassword,
    setNewPassword,
    setCurrentPassword,
    handlePasswordUpdate,
    loading,
  } = useChangePassword();
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground
        style={HeaderStyles.mainContainer}
        source={require('../../../assets/images/a0b7afd36c9b9128fdc5ae0e32bdfd6c.png')}>
        <View style={HeaderStyles.container}>
          <View style={HeaderStyles.topbar}>
            <TouchableOpacity
              style={HeaderStyles.iconContainerForSettingStack}
              onPress={() => {
                navigation.goBack();
              }}>
              <HEADERICON.leftArrow />
            </TouchableOpacity>
            <Text style={HeaderStyles.screenName}>Change Password</Text>
            <View />
          </View>
        </View>
        <View style={HeaderStyles.mainContainerForPassword}>
          <View style={chnagepasswordStyles.nouch}></View>
          <View style={chnagepasswordStyles.mainView}>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Current Password</Text>
              <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                placeholder="Current Password"
                placeholderTextColor="#003f5c"
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.lable}>New Password</Text>
              <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                placeholder="New Password"
                placeholderTextColor="#003f5c"
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Confirm Password</Text>
              <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handlePasswordUpdate}>
            <ImageBackground
              source={require('../../../assets/images/background.png')}
              style={styles.loginBtn}>
              {loading ? (
                <ActivityIndicator size="large" color="#352869" />
              ) : (
                <Text>Update Password</Text>
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}
