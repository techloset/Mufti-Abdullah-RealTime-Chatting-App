import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {AUTH_STACK_SCREENS_NAVIGATION} from '../constants/navigationScreens/NavigationScreens';

export type RootStackParamsList = {
  SIGNUP: undefined;
  LOGIN: undefined;
  FORGOT_PASSWORD: undefined;
  AUTH: undefined;
};
let isFirstScreen = true;

const Stack = createStackNavigator<RootStackParamsList>();
export class StackNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {AUTH_STACK_SCREENS_NAVIGATION.map((item, index) => {
            const navigationOptions = {
              title: '',
              headerShown: index > 0,
            };
            return (
              <Stack.Screen
                key={index}
                name={item.name as keyof RootStackParamsList}
                component={item.component}
                options={navigationOptions}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default StackNavigation;
