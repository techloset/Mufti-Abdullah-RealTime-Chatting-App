import {
  AUTH_STACK_SCREEN,
  BOTTOM_TAB_SCREEN,
  CONTACT_STACK_SCREENS,
  HOME_STACK_SCREENS,
  SETTING_STACK_SCREENS,
} from '../navigations/navigations';
import {IMAGES} from '../assets/allImages';
import Home from '../../screen/home/home';
import Contact from '../../screen/contact/contact';
import Setting from '../../screen/setting/setting';
import AuthScreen from '../../screen/authScreen/authScreen';
import Login from '../../screen/login/login';
import SignUp from '../../screen/signup/signup';
import Forgot from '../../screen/forget/forget';
import Search from '../../screen/search/search';
import MessageScreen from '../../screen/messageScreen/messageScreen';
import Profile from '../../screen/profile/profile';
import ChangePassword from '../../screen/chnagePassword/changePassword';

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
