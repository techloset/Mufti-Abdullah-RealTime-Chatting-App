import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../../../context/AuthContext';
import {UserData} from '../../../constants/Types';

export default function useChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usersData, setUsersData] = useState<UserData | null>({});
  const currentUser = auth().currentUser;
  // const {user} = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();
        const userData = usersSnapshot.docs
          .map(doc => doc.data() as UserData)
          .filter(userData => userData.uid === (currentUser?.uid as UserData));
        console.log('userData', userData);
        setUsersData(userData[0] as UserData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  // console.log('currentUser', currentUser);
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
            const userDocRef = firestore()
              .collection('users')
              .doc(usersData?.uid);
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
  return {
    setConfirmPassword,
    confirmPassword,
    newPassword,
    currentPassword,
    setNewPassword,
    setCurrentPassword,
    handlePasswordUpdate,
  };
}
