import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthContext} from '../context/AuthContext';
import StackNavigation from './StackNavigation';
import Navigation from './TabNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthState} from '../redux/AuthSlice';
import NewStack from './NewStack';

const Stack = createStackNavigator();
export default function AuthNavigation() {
  // const isAuth = useSelector(selectAuthState);

  const {isAuth} = useAuthContext();

  return <>{isAuth ? <NewStack /> : <StackNavigation />}</>;
}
