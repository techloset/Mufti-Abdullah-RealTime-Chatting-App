import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/frontEnd/home/Home';
import Search from '../screen/frontEnd/search/Search';
import MessageScreen from '../screen/frontEnd/messageScreen/MessageScreen';
export type RootStackParamsList = {
  home: undefined;
  search: undefined;
  messages: undefined;
};
const Stack = createStackNavigator<RootStackParamsList>();
export default function HomeStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="messages"
        component={MessageScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
