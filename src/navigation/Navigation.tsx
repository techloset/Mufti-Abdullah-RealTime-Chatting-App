import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthScreen from '../screen/authScreens/mainScreen/AuthScreen';
import Login from '../screen/authScreens/login/Login';
import SignUp from '../screen/authScreens/signUp/Signup';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarstyle: {
    position: 'absolute',
    bottom: 0,
    top: 20,
    left: 20,
    right: 20,
    elevation: 0,
    heigt: 60,
    background: '#fff',
  },
};
export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={screenOptions}>
        <Tab.Screen
          options={{
            tabBarIcon: () => {
              return (
                <Image source={require('../assets/icons/Message.png')}></Image>
              );
            },
          }}
          name="authScreen"
          component={AuthScreen}
        />
        <Tab.Screen name="signin" component={Login} />
        <Tab.Screen name="signOut" component={SignUp} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
