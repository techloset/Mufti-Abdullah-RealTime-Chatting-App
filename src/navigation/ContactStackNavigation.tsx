import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Contact from '../screen/frontEnd/contact/Contact';
import Search from '../screen/frontEnd/search/Search';
export type RootStackParamsList = {
  contact: undefined;
  search: undefined;
};
const Stack = createStackNavigator<RootStackParamsList>();
export default function ContactStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
