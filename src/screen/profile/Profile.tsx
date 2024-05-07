import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HEADERICON, USERPROFILEIMAGE} from '../../constants/assets/allImages';
import {styles} from '../signup/signupStyles';
import {TextInput} from 'react-native';
import {HeaderStyles} from '../../styles/headerStyling';
import {useNavigation} from '@react-navigation/native';
import useProfile from './useProfile';
import {profileStyles} from './profileStyles';
export default function Profile() {
  const {
    currentUser,
    handlePicture,
    setName,
    name,
    status,
    setStatus,
    updateProfile,
    loading,
    imageUploading,
    userData,
  } = useProfile();

  const navigation = useNavigation();

  return (
    <>
      <ImageBackground
        style={HeaderStyles.mainContainer}
        source={require('../../assets/images/a0b7afd36c9b9128fdc5ae0e32bdfd6c.png')}>
        <View style={HeaderStyles.container}>
          <View style={HeaderStyles.topbar}>
            <TouchableOpacity
              style={HeaderStyles.iconContainerForSettingStack}
              onPress={() => {
                navigation.goBack();
              }}>
              <HEADERICON.leftArrow />
            </TouchableOpacity>
            <Text style={HeaderStyles.screenName}>Profile</Text>
            <View />
          </View>
        </View>
        <View style={HeaderStyles.mainContainerForPassword}>
          <View style={profileStyles.nouch}></View>

          <View style={profileStyles.inSideMainView}>
            {currentUser?.photoURL == null ? (
              <USERPROFILEIMAGE.ProfileImage height={120} width={120} />
            ) : (
              <Image
                source={{uri: currentUser?.photoURL}}
                height={120}
                width={120}
                style={profileStyles.image}
              />
            )}
            <TouchableOpacity onPress={handlePicture}>
              <View style={profileStyles.userProfile}>
                <USERPROFILEIMAGE.UpdateProfile height={20} width={20} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={profileStyles.mainView}>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Your Name</Text>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="#003f5c"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Your Email</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Your Email."
                placeholderTextColor="#003f5c"
                value={currentUser?.email}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Your Status</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Your Status."
                placeholderTextColor="#003f5c"
                value={status}
                onChangeText={newStatus => {
                  console.log('New status:', newStatus);
                  setStatus(newStatus);
                }}
              />
            </View>
          </View>
          <TouchableOpacity onPress={updateProfile}>
            <ImageBackground
              source={require('../../assets/images/background.png')}
              style={styles.loginBtn}>
              {imageUploading || loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.btnTxt}>Update Profile</Text>
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}
