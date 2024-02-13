import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthContext} from '../context/AuthContext';
import StackNavigation from './StackNavigation';
import Navigation from './TabNavigation';

const Stack = createStackNavigator();
export default function AuthNavigation() {
  const {isAuth} = useAuthContext();
  console.log('isAuth', isAuth);

  return <>{isAuth ? <Navigation /> : <StackNavigation />}</>;
}
