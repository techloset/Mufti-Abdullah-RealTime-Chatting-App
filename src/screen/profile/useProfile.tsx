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
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
  getCurrentUser,
  updateProfilePicture,
  updateUserProfile,
} from '../../store/slices/userSlice';

export default function useProfile(): ProfileHook {
  const dispatch = useAppDispatch();
  const userData: UserData[] = useAppSelector(state => state.users.currentUser);
  const currentUser = auth().currentUser;
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [resource, setResource] = useState<Resource>({});
  const [usersData, setUsersData] = useState<UserData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (userData.length > 0) {
      setUsersData(userData[0]);
      setName(userData[0]?.username ?? '');
      setStatus(userData[0]?.status ?? '');
    }
  }, [userData]);

  useEffect(() => {
    if (usersData?.photoURL) {
      setProfileImage(usersData.photoURL);
    }
  }, [usersData?.photoURL]);

  if (!currentUser) {
    Alert.alert('Error', 'User not logged in');
  }

  const updateProfile = async () => {
    setLoading(true);

    try {
      await dispatch(updateUserProfile({name, status}));
    } catch (error: any) {
      ShowToast('danger', 'Profile updating Error');
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
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
      setImageUploading(true);
      const resp = res.assets as ImagePicker.Asset[];
      const uri: string | undefined = resp[0].uri;
      setResource({
        uri: res.uri,
        data: res.data,
      });
      if (uri !== undefined && uri !== null) {
        await dispatch(updateProfilePicture(uri));
        setImageUploading(false);
      }
      if (res.didCancel) {
        console.log('User cancelled image picker');
        setImageUploading(false);
      }
    } catch (err) {
      console.error('ImagePicker error:', err);
      setImageUploading(false);
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
    updateProfile,
    imageUploading,
    userData,
  };
}
