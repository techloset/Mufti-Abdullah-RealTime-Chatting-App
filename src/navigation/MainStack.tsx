import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './tabNavigation';
import {NavigationContainer} from '@react-navigation/native';

import {
  CONTACT_STACK_SCREENS_NAVIGATION,
  HOME_STACK_SCREENS_NAVIGATION,
  SETTING_STACK_SCREENS_NAVIGATION,
} from '../constants/navigationScreens/navigationScreens';
import {
  ContactStackParamsList,
  HomeStackParamsList,
  SettingStackParamsList,
} from '../constants/types/types';
const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabNavigation" component={Navigation} />
        {HOME_STACK_SCREENS_NAVIGATION.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name as keyof HomeStackParamsList}
              component={item.component}
            />
          );
        })}
        {CONTACT_STACK_SCREENS_NAVIGATION.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name as keyof ContactStackParamsList}
              component={item.component}
            />
          );
        })}
        {SETTING_STACK_SCREENS_NAVIGATION.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name as keyof SettingStackParamsList}
              component={item.component}
              options={{headerShown: false}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
