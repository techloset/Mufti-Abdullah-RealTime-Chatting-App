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
import {
  HEADERICON,
  USERPROFILEIMAGE,
} from '../../../constants/assets/AllImages';
import {styles} from '../../authScreens/signup/SignupStyles';
import {TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HeaderStyles} from '../../../styles/HeaderStyling';
import {useNavigation} from '@react-navigation/native';
import useProfile from './useProfile';
import {profileStyles} from './ProfileStyles';
export default function Profile() {
  const {
    currentUser,
    handlePicture,
    setName,
    name,
    status,
    setStatus,
    updateUserProfile,
    loading,
    imageUploading,
  } = useProfile();

  const navigation = useNavigation();

  return (
    <>
      <LinearGradient
        style={HeaderStyles.mainContainer}
        colors={['#000', '#43116A']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
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
                onChangeText={setStatus}
              />
            </View>
          </View>
          <TouchableOpacity onPress={updateUserProfile}>
            <ImageBackground
              source={require('../../../assets/images/background.png')}
              style={styles.loginBtn}>
              {imageUploading || loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.btnTxt}>Update Profile</Text>
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}
