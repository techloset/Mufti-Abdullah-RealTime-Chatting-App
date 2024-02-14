import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, useState} from 'react';
import {USERPROFILEIMAGE} from '../../../constants/assets/AllImages';
import {styles} from '../../authScreens/signUp/SignUPStyles';
import {TextInput} from 'react-native';
import SettingHeader from '../../../components/tabHeader/SettingHeader';
import {useAuthContext} from '../../../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default function Profile() {
  const {user} = useAuthContext();
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [status, setStatus] = useState(user.status);
  const currentUser = auth().currentUser;
  console.log('currentUser', currentUser);
  if (!currentUser) {
    Alert.alert('Error', 'User not logged in');
    return;
  }

  const updateUserProfile = () => {
    // currentUser.updateEmail(email);
    currentUser.updateProfile({
      displayName: name,
    });
    // Update user profile information in Firestore
    const userDocRef = firestore().collection('users').doc(user.uid);
    userDocRef
      .update({
        username: name,
        email: email,
        status: status,
      })
      .then(() => {
        Alert.alert('Success', 'Profile updated successfully');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <>
      <SettingHeader name="Profile" />
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
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          {user.photoURL == null ? (
            <USERPROFILEIMAGE.ProfileImage height={120} width={120} />
          ) : (
            <Image source={user.photoURL} height={120} width={120} />
          )}
          <View
            style={{
              position: 'absolute',
              top: 95,
              right: 12,
            }}>
            <USERPROFILEIMAGE.UpdateProfile height={20} width={20} />
          </View>
        </View>
        <View style={{marginHorizontal: 20, marginVertical: 20}}>
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
              value={email}
              onChangeText={setEmail}
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
            <Text>Update Profile</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </>
  );
}
