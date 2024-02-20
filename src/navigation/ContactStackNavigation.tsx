import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Contact from '../screen/frontEnd/contact/Contact';
import Search from '../screen/frontEnd/search/Search';
import {CONTACT_STACK_SCREENS_NAVIGATION} from '../constants/navigationScreens/NavigationScreens';
export type RootStackParamsList = {
  CONTACTPAGE: undefined;
  SEARCH: undefined;
};
const Stack = createStackNavigator<RootStackParamsList>();
export default function ContactStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {CONTACT_STACK_SCREENS_NAVIGATION.map((item, index) => {
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
