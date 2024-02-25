import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IMAGES} from '../constants/assets/AllImages';
import {BOTTOM_TAB_SCREEN} from '../constants/navigations/Navigations';
import Contact from '../screen/frontEnd/contact/Contact';
import Home from '../screen/frontEnd/home/Home';
import Setting from '../screen/frontEnd/setting/Setting';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: true,
  headerShown: false,
  tabBarActiveTintColor: '#3D4A7A',
  tabBarInactiveTintColor: '#797C7B63',
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

export default function Navigation() {
  const {HOME, CONTACT, SETTING} = BOTTOM_TAB_SCREEN;
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Message',
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused}) =>
            focused ? <IMAGES.Msg /> : <IMAGES.UnfocusMsg />,
        }}
        name={HOME}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Contact',
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused}) =>
            focused ? <IMAGES.FocusUser /> : <IMAGES.User />,
        }}
        name={CONTACT}
        component={Contact}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Setting',
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused}) =>
            focused ? <IMAGES.FocusSetting /> : <IMAGES.Setting />,
        }}
        name={SETTING}
        component={Setting}
      />
    </Tab.Navigator>
  );
}
