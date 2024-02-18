import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {IMAGES} from '../constants/assets/AllImages';
import SettingNavigation from './SettingNavigation';
import ContactStackNavigation from './ContactStackNavigation';
import HomeStackNavigation from './HomeStackNavigation';

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

const TabStyling = StyleSheet.create({
  main: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3D4A7A',
  },
});

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({focused}) =>
              focused ? <IMAGES.Msg /> : <IMAGES.UnfocusMsg />,
          }}
          name="Home"
          component={HomeStackNavigation}
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
          component={ContactStackNavigation}
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
          component={SettingNavigation}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
