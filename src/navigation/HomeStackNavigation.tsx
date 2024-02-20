import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/frontEnd/home/Home';
import Search from '../screen/frontEnd/search/Search';
import MessageScreen from '../screen/frontEnd/messageScreen/MessageScreen';
import {HOME_STACK_SCREENS_NAVIGATION} from '../constants/navigationScreens/NavigationScreens';
export type RootStackParamsList = {
  HOMEPAGE: undefined;
  SEARCH: undefined;
  CHATSCREEN: undefined;
};
const Stack = createStackNavigator<RootStackParamsList>();
export default function HomeStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {HOME_STACK_SCREENS_NAVIGATION.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name as keyof RootStackParamsList}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
}
