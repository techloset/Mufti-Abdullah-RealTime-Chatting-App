import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BOTTOM_TAB_SCREEN} from '../constants/navigations/navigations';
import {COLORS} from '../constants/colors/color';
import {BOTTOM_TAB_SCREENS_NAVIGATION} from '../constants/navigationScreens/navigationScreens';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: true,
  headerShown: false,
  tabBarActiveTintColor: COLORS.LABLE,
  tabBarInactiveTintColor: COLORS.INACTIVE,
  tabBarStyle: {
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
  },
};

export default function Navigation() {
  const {HOME, CONTACT, SETTING} = BOTTOM_TAB_SCREEN;
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {BOTTOM_TAB_SCREENS_NAVIGATION.map(
        ({name, component, options}, index) => (
          <Tab.Screen
            key={index}
            name={name}
            component={component}
            options={{
              ...options,
              tabBarLabelStyle: {
                ...(options.tabBarLabelStyle as {}),
              },
            }}
          />
        ),
      )}
    </Tab.Navigator>
  );
}
