import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthContext} from '../context/AuthContext';
import StackNavigation from './AuthStackNavigation';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';
import {selectAuthState} from '../redux/AuthSlice';

const Stack = createStackNavigator();
export default function AuthNavigation() {
  const isAuth = useSelector(selectAuthState);

  // const {isAuth} = useAuthContext();

  return <>{isAuth ? <MainStack /> : <StackNavigation />}</>;
}
