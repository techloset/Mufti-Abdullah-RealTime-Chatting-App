import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserData} from '../../constants/types/Types';
import {ShowToast} from '../../components/toast/ShowToast';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/FirebaseCollectoin';

export default function useChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usersData, setUsersData] = useState<UserData | null>(null);
  const currentUser = auth().currentUser;
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

  const handlePasswordUpdate = () => {
    if (!currentUser) {
      ShowToast('danger', 'User Not Found');
      return;
    }
    if (newPassword !== confirmPassword) {
      ShowToast('danger', 'New password and confirm password do not match');
      return;
    }

    const userEmail = currentUser.email;

    if (!userEmail) {
      Alert.alert('Error', 'User email not available');
      ShowToast('danger', 'Profile updated successfully');

      return;
    }
    setLoading(true);
    const credential = auth.EmailAuthProvider.credential(
      userEmail,
      currentPassword,
    );
    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        currentUser
          .updatePassword(newPassword)
          .then(() => {
            const userDocRef = firestore()
              .collection(FIREBASE_COLLECTIONS.USER)
              .doc(usersData?.uid);
            userDocRef
              .update({
                password: newPassword,
                confirmPassword: confirmPassword,
              })
              .then(() => {
                ShowToast('success', 'Password updated successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setLoading(false);
              })
              .catch(error => {
                console.log('Firestore Error', error.message);
                ShowToast('danger', 'Firebase Error');
              });
          })
          .catch(error => {
            console.log('Error', error.message);
          });
      })
      .catch(error => {
        console.log('Error', error.message);
      });
  };
  return {
    setConfirmPassword,
    confirmPassword,
    newPassword,
    currentPassword,
    setNewPassword,
    setCurrentPassword,
    handlePasswordUpdate,
    loading,
  };
}
