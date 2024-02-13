import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Setting from '../screen/frontEnd/setting/Setting';
import Profile from '../screen/frontEnd/profile/Profile';
import ChangePassword from '../screen/frontEnd/chnagePassword/ChangePassword';

export type RootStackParamsList = {
  profile: undefined;
  changePassword: undefined;
  setting: undefined;
  //   auth: undefined;
};
const Stack = createStackNavigator<RootStackParamsList>();
export class SettingNavigation extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="setting" component={Setting} />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{
            headerTitle: '',
          }}
        />
        {/* <Stack.Screen
            name="forgot"
            component={Forgot}
            options={{
              headerTitle: '',
            }}
          /> */}
      </Stack.Navigator>
    );
  }
}

export default SettingNavigation;
