import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../../authScreens/signUp/SignUPStyles';
import SettingHeader from '../../../components/tabHeader/SettingHeader';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {HEADERICON} from '../../../constants/assets/AllImages';
import {HeaderStyles} from '../../../styles/headerStyling/HeaderStyling';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamsList} from '../../../navigation/SettingNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const {user} = useAuthContext();
  console.log('user.password', user.password);
  console.log('user.confirmPassword', user.confirmPassword);

  const currentUser = auth().currentUser;
  console.log('currentUser', currentUser);
  const handlePasswordUpdate = () => {
    if (!currentUser) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    const userEmail = currentUser.email;

    if (!userEmail) {
      Alert.alert('Error', 'User email not available');
      return;
    }

    const credential = auth.EmailAuthProvider.credential(
      userEmail,
      currentPassword,
    );

    // Reauthenticate the user
    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        // User successfully reauthenticated, now update password
        currentUser
          .updatePassword(newPassword)
          .then(() => {
            const userDocRef = firestore().collection('users').doc(user.uid);
            userDocRef
              .update({
                password: newPassword,
                confirmPassword: confirmPassword,
              })
              .then(() => {
                Alert.alert('Success', 'Password updated successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              })
              .catch(error => {
                Alert.alert('Firestore Error', error.message);
              });
          })
          .catch(error => {
            Alert.alert('Error', error.message);
          });
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  // const updateFiretoreUSer = () => {
  //   const userDocRef = firestore().collection('users').doc(user.id);
  //   userDocRef
  //     .update({
  //       password: newPassword,
  //       confirmPassword: confirmPassword,
  //     })
  //     .then(() => {
  //       Alert.alert('Success', 'Password updated successfully');
  //       setCurrentPassword('');
  //       setNewPassword('');
  //       setConfirmPassword('');
  //     })
  //     .catch(error => {
  //       Alert.alert('Firestore Error', error.message);
  //     });
  // };
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
            <Text style={HeaderStyles.screenName}>Change Password</Text>
            <View />
          </View>
        </View>
        <View style={HeaderStyles.mainContainerForPassword}>
          <View style={{marginHorizontal: 20, marginVertical: 80}}>
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
              <Text>Update Password</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}
