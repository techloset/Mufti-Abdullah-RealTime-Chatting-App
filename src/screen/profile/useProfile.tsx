import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker, {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {ProfileHook, Resource, UserData} from '../../constants/types/types';
import {ShowToast} from '../../components/showToast/ShowToast';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/firebaseCollectoin';

export default function useProfile(): ProfileHook {
  const currentUser = auth().currentUser;
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [resource, setResource] = useState<Resource>({});
  const [usersData, setUsersData] = useState<UserData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState(usersData?.username ?? '');
  const [status, setStatus] = useState(usersData?.status ?? '');
  useEffect(() => {
    if (usersData && usersData.status && usersData.username) {
      setStatus(usersData.status);
      setName(usersData.username);
    }
  }, [usersData]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore()
          .collection(FIREBASE_COLLECTIONS.USER)
          .get();
        const userData = usersSnapshot.docs
          .map(doc => doc.data() as UserData)
          .filter(userData => userData.uid === currentUser?.uid);
        setUsersData(userData[0] as UserData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  useEffect(() => {
    if (usersData?.photoURL) {
      setProfileImage(usersData.photoURL);
    }
  }, [usersData?.photoURL]);
  if (!currentUser) {
    Alert.alert('Error', 'User not logged in');
  }

  const updateUserProfile = () => {
    setLoading(true);
    currentUser &&
      currentUser.updateProfile({
        displayName: name,
      });
    const userDocRef = firestore()
      .collection(FIREBASE_COLLECTIONS.USER)
      .doc(usersData?.uid);
    userDocRef
      .update({
        username: name,
        status: status,
      })
      .then(() => {
        ShowToast('success', 'Profile updated successfully');
        setLoading(false);
      })
      .catch(error => {
        ShowToast('danger', 'Profile updating Error');
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
      setImageUploading(true);
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
      const userDocRef = firestore()
        .collection(FIREBASE_COLLECTIONS.USER)
        .doc(usersData?.uid);
      userDocRef
        .update({
          photoURL: downloadURL,
        })
        .then(() => {
          ShowToast('success', 'Image updated successfully');
          setProfileImage(downloadURL);
          setImageUploading(false);
        })
        .catch(error => {
          ShowToast('danger', 'Error While Uploading Image');

          console.log('Error', error.message);
        });

      currentUser &&
        currentUser.updateProfile({
          photoURL: downloadURL,
        });
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
    }
  };
  return {
    currentUser,
    handlePicture,
    setName,
    usersData,
    name,
    status,
    setStatus,
    loading,
    updateUserProfile,
    imageUploading,
  };
}
