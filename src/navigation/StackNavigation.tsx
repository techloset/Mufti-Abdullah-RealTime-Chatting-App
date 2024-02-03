import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../screen/authScreens/mainScreen/AuthScreen';
import Login from '../screen/authScreens/login/Login';
import SignUp from '../screen/authScreens/signUp/Signup';
import Forgot from '../screen/authScreens/forget/Forget';
import {NavigationContainer} from '@react-navigation/native';


export type RootStackParamsList={
    signup:undefined,
    login:undefined,
    forgot:undefined,
    auth:undefined

}
const Stack = createStackNavigator<RootStackParamsList>();
export class StackNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="login" component={Login} options={{
            headerTitle:""
          }}/>
          <Stack.Screen name="signup" component={SignUp}  options={{
            headerTitle:""
          }}/>
          <Stack.Screen name="forgot" component={Forgot}  options={{
            headerTitle:""
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default StackNavigation;
