import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './TabNavigation';
import SettingNavigation from './SettingNavigation';
import HomeStackNavigation, {RootStackParamsList} from './HomeStackNavigation';
import ContactStackNavigation from './ContactStackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import Search from '../screen/frontEnd/search/Search';
import MessageScreen from '../screen/frontEnd/messageScreen/MessageScreen';
import {
  CONTACT_STACK_SCREENS_NAVIGATION,
  HOME_STACK_SCREENS_NAVIGATION,
  SETTING_STACK_SCREENS_NAVIGATION,
} from '../constants/navigationScreens/NavigationScreens';
const Stack = createStackNavigator();

export default function NewStack() {
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
              name={item.name as keyof RootStackParamsList}
              component={item.component}
            />
          );
        })}
        {CONTACT_STACK_SCREENS_NAVIGATION.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name as keyof RootStackParamsList}
              component={item.component}
            />
          );
        })}
        {SETTING_STACK_SCREENS_NAVIGATION.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name as keyof RootStackParamsList}
              component={item.component}
              options={{headerShown: false}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
