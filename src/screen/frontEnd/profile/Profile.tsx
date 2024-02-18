import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HEADERICON,
  USERPROFILEIMAGE,
} from '../../../constants/assets/AllImages';
import {styles} from '../../authScreens/signUp/SignUPStyles';
import {TextInput} from 'react-native';
import SettingHeader from '../../../components/tabHeader/SettingHeader';
import {useAuthContext} from '../../../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker, {
  launchImageLibrary,
  ImageLibraryOptions,
  MediaType,
  ImagePickerResponse,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import LinearGradient from 'react-native-linear-gradient';
import {HeaderStyles} from '../../../styles/headerStyling/HeaderStyling';
import {useNavigation} from '@react-navigation/native';
interface Resource {
  uri?: string;
  data?: string;
}

export default function Profile() {
  const [resource, setResource] = useState<Resource>({});
  const {user} = useAuthContext();
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState(user.username);
  const [status, setStatus] = useState(user.status);
  const currentUser = auth().currentUser;
  console.log('currentUser', currentUser);
  useEffect(() => {
    if (user.photoURL) {
      setProfileImage(user.photoURL);
    }
  }, [user.photoURL]);
  if (!currentUser) {
    Alert.alert('Error', 'User not logged in');
    return;
  }

  const updateUserProfile = () => {
    currentUser.updateProfile({
      displayName: name,
    });
    // Update user profile information in Firestore
    const userDocRef = firestore().collection('users').doc(user.uid);
    userDocRef
      .update({
        username: name,
        status: status,
      })
      .then(() => {
        Alert.alert('Success', 'Profile updated successfully');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  const handlePicture = async () => {
    const options: ImagePicker.ImageLibraryOptions & {
      title: string;
      customButtons: {};
      storageOptions: {};
    } = {
      title: 'Select Image',
      mediaType: 'photo' as ImagePicker.MediaType,
      customButtons: [
        {name: 'customOptionKey', title: 'Choose File from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    try {
      const res: ImagePickerResponse = await launchImageLibrary(options);

      console.log('response', res.assets);
      const resp = res.assets as ImagePicker.Asset[];
      const uri: string | undefined = resp[0].uri;
      setResource({
        uri: res.uri,
        data: res.data,
      });
      if (uri !== undefined && uri !== null) {
        console.log('uri before', uri);
        uploadImageToFirebaseStorage(uri);
      }
      if (res.didCancel) {
        console.log('res.uri', res.uri);
        console.log('res.data', res.data);
      } else {
        console.log('User cancelled image picker');
      }
    } catch (err) {
      console.error('ImagePicker error:', err);
    }
  };
  const uploadImageToFirebaseStorage = async (uri: string) => {
    try {
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      console.log('imageName', imageName);
      const response = await fetch(uri);
      console.log('response', response);
      const blob = await response.blob();
      console.log('blob', blob);
      const ref = storage().ref().child(`images/${imageName}`);
      console.log('ref', ref);
      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();
      console.log('Image uploaded to Firebase Storage:', downloadURL);
      const userDocRef = firestore().collection('users').doc(user.uid);
      userDocRef
        .update({
          photoURL: downloadURL,
        })
        .then(() => {
          Alert.alert('Success', 'Profile updated successfully');
          setProfileImage(downloadURL);
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });

      currentUser.updateProfile({
        photoURL: downloadURL,
      });
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
    }
  };

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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            {currentUser.photoURL == null ? (
              <USERPROFILEIMAGE.ProfileImage height={120} width={120} />
            ) : (
              <Image
                source={{uri: currentUser.photoURL}}
                height={120}
                width={120}
                style={{
                  borderRadius: 60,
                }}
              />
            )}
            <TouchableOpacity onPress={handlePicture}>
              <View
                style={{
                  position: 'absolute',
                  left: 35,
                  top: -30,
                  width: 60,
                  height: 60,
                }}>
                <USERPROFILEIMAGE.UpdateProfile height={20} width={20} />
              </View>
            </TouchableOpacity>
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
                value={user.email}
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
      </LinearGradient>
    </>
  );
}
