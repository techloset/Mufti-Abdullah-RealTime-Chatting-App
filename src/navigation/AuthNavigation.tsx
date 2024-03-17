import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StackNavigation from './AuthStackNavigation';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';
import {login, selectAuthState} from '../store/slices/AuthSlice';
import {FirebaseUser, UserProfileData} from '../constants/types/Types';
import {useAppDispatch} from '../store/store';
import {FIREBASE_COLLECTIONS} from '../constants/firebaseCollections/FirebaseCollectoin';

const Stack = createStackNavigator();
export default function AuthNavigation() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const isAuth = useSelector(selectAuthState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    auth().onAuthStateChanged((user: FirebaseUser | null) => {
      if (user) {
        readUserProfile(user);
      } else {
        setIsAppLoading(false);
      }
    });
    return;
  }, [auth]);

  const readUserProfile = (user: FirebaseUser) => {
    firestore()
      .collection(FIREBASE_COLLECTIONS.USER)
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        const userData: UserProfileData =
          documentSnapshot.data() as UserProfileData;
        dispatch(login(userData as FirebaseAuthTypes.User));
      });
    setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);
  };
  return <>{isAuth.isAuth ? <MainStack /> : <StackNavigation />}</>;
}
