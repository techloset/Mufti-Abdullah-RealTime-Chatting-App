import {
  AUTH_STACK_SCREEN,
  BOTTOM_TAB_SCREEN,
  TAB_ICONS,
  TAB_OPTIONS,
  CONTACT_STACK_SCREENS,
  HOME_STACK_SCREENS,
  SETTING_STACK_SCREENS,
} from '../navigations/Navigations';
import {IMAGES} from '../assets/AllImages';
import Home from '../../screen/home/Home';
import Contact from '../../screen/contact/Contact';
import Setting from '../../screen/setting/Setting';
import AuthScreen from '../../screen/authScreen/AuthScreen';
import Login from '../../screen/login/Login';
import SignUp from '../../screen/signup/Signup';
import Forgot from '../../screen/forget/Forget';
import Search from '../../screen/search/Search';
import MessageScreen from '../../screen/messageScreen/MessageScreen';
import Profile from '../../screen/profile/Profile';
import ChangePassword from '../../screen/chnagePassword/ChangePassword';

export const BOTTOM_TAB_SCREENS_NAVIGATION = [
  {
    name: BOTTOM_TAB_SCREEN.HOME,

    component: Home,
    options: {
      tabBarLabel: 'Message',
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      tabBarIcon: ({focused}: {focused: boolean}) =>
        focused ? <IMAGES.Msg /> : <IMAGES.UnfocusMsg />,
    },
  },
  {
    name: BOTTOM_TAB_SCREEN.CONTACT,
    component: Contact,
    options: {
      tabBarLabel: 'Contact',
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      tabBarIcon: ({focused}: {focused: boolean}) =>
        focused ? <IMAGES.FocusUser /> : <IMAGES.User />,
    },
  },
  {
    name: BOTTOM_TAB_SCREEN.SETTING,
    component: Setting,
    options: {
      tabBarLabel: 'Setting',
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      tabBarIcon: ({focused}: {focused: boolean}) =>
        focused ? <IMAGES.FocusSetting /> : <IMAGES.Setting />,
    },
  },
];
export const AUTH_STACK_SCREENS_NAVIGATION = [
  {name: AUTH_STACK_SCREEN.AUTH, component: AuthScreen},
  {name: AUTH_STACK_SCREEN.LOGIN, component: Login},
  {name: AUTH_STACK_SCREEN.SIGNUP, component: SignUp},
  {name: AUTH_STACK_SCREEN.FORGOT_PASSWORD, component: Forgot},
];
export const HOME_STACK_SCREENS_NAVIGATION = [
  {name: HOME_STACK_SCREENS.HOMEPAGE, component: Home},
  {name: HOME_STACK_SCREENS.SEARCH, component: Search},
  {name: HOME_STACK_SCREENS.CHATSCREEN, component: MessageScreen},
];
export const CONTACT_STACK_SCREENS_NAVIGATION = [
  {name: CONTACT_STACK_SCREENS.CONTACTPAGE, component: Contact},
];
export const SETTING_STACK_SCREENS_NAVIGATION = [
  {name: SETTING_STACK_SCREENS.SETTING_PAGE, component: Setting},
  {name: SETTING_STACK_SCREENS.PROFILE, component: Profile},
  {name: SETTING_STACK_SCREENS.CHANGE_PASSWOED, component: ChangePassword},
];
