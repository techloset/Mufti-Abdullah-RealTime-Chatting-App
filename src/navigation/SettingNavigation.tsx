import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Setting from '../screen/frontEnd/setting/Setting';
import Profile from '../screen/frontEnd/profile/Profile';
import ChangePassword from '../screen/frontEnd/chnagePassword/ChangePassword';
import {SETTING_STACK_SCREENS_NAVIGATION} from '../constants/navigationScreens/NavigationScreens';

export type RootStackParamsList = {
  PROFILE: undefined;
  CHANGE_PASSWORD: undefined;
  SETTING: undefined;
};
const Stack = createStackNavigator<RootStackParamsList>();
export default function SettingNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
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
  );
}
