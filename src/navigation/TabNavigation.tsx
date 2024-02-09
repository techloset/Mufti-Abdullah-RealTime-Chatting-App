import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthScreen from '../screen/authScreens/mainScreen/AuthScreen';
import Login from '../screen/authScreens/login/Login';
import SignUp from '../screen/authScreens/signUp/Signup';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Header from '../components/tabHeader/Header';
import Home from '../screen/frontEnd/home/Home';
import Contact from '../screen/frontEnd/contact/Contact';
import Search from '../screen/frontEnd/search/Search';
import Setting from '../screen/frontEnd/setting/Setting';
import {IMAGES} from '../constants/assets/AllImages';
import Profile from '../screen/frontEnd/profile/Profile';
import ChangePassword from '../screen/frontEnd/chnagePassword/ChangePassword';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: true,
  headerShown: false,
  tabBarstyle: {
    position: 'absolute',
    bottom: 0,
    top: 20,
    left: 20,
    right: 20,
    elevation: 0,
    heigt: 60,
    background: 'black',
  },
};
interface TabStyling {
  fontSize?: number;
  fontWeight?:
    | 'bold'
    | 'normal'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;

  color?: string;
}

const TabStyling: TabStyling = {
  fontSize: 16,
  fontWeight: 500,
  color: '#3D4A7A',
};
const UnFocusTabStyling: TabStyling = {
  fontSize: 16,
  color: '#797C7B63',
  fontWeight: 400,
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          options={{
            tabBarLabel: 'Message',
            tabBarLabelStyle: ({focused}: any) =>
              focused ? TabStyling : UnFocusTabStyling,
            tabBarIcon: ({focused}) =>
              focused ? <IMAGES.Msg /> : <IMAGES.UnfocusMsg />,
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Contact',
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#3D4A7A',
            },
            tabBarIcon: ({focused}) =>
              focused ? <IMAGES.FocusUser /> : <IMAGES.User />,
          }}
          name="Contact"
          component={Contact}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Setting',
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#3D4A7A',
            },
            tabBarIcon: ({focused}) =>
              focused ? <IMAGES.FocusSetting /> : <IMAGES.Setting />,
          }}
          name="Setting"
          component={ChangePassword}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
