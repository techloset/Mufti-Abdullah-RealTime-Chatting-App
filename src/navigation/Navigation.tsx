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
    background: 'black',
  },
};






export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={screenOptions}
      >
        <Tab.Screen
          options={{
            headerTitle: () => <Header name="Home" />,
            headerStyle: {
              backgroundColor: '#4c00b0',
              height: 60,
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20
            }
,            tabBarIcon: () => {
              return (
                <Image source={require('../assets/icons/Message.png')}></Image>
                // <Image source={require('../assets/icons/user.png')}></Image>
                // <Image source={require('../assets/icons/settings.png')}></Image>
              );
            }
          }}
        
          name="Home"
          component={Contact}
        />
        <Tab.Screen 
         options={{
          tabBarIcon: () => {
            return (
              // <Image source={require('../assets/icons/Message.png')}></Image>
              // <Image source={require('../assets/icons/user.png')}></Image>
              <Image source={require('../assets/icons/settings.png')}></Image>
            );
          },
        }}
        name="signin" component={Login} />
        <Tab.Screen  options={{
            tabBarIcon: () => {
              return (
                <Image source={require('../assets/icons/user.png')}></Image>
                // <Image source={require('../assets/icons/settings.png')}></Image>
              );
            },
          }} name="signOut" component={SignUp} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
