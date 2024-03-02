import Forgot from '../../screen/authScreens/forget/Forget';
import Login from '../../screen/authScreens/login/Login';
import AuthScreen from '../../screen/authScreens/authScreen/AuthScreen';
import SignUp from '../../screen/authScreens/signup/Signup';
import ChangePassword from '../../screen/frontEnd/chnagePassword/ChangePassword';
import Contact from '../../screen/frontEnd/contact/Contact';
import Home from '../../screen/frontEnd/home/Home';
import MessageScreen from '../../screen/frontEnd/messageScreen/MessageScreen';
import Profile from '../../screen/frontEnd/profile/Profile';
import Search from '../../screen/frontEnd/search/Search';
import Setting from '../../screen/frontEnd/setting/Setting';
import {
  AUTH_STACK_SCREEN,
  BOTTOM_TAB_SCREEN,
  CONTACT_STACK_SCREENS,
  HOME_STACK_SCREENS,
  SETTING_STACK_SCREENS,
} from '../navigations/Navigations';

export const BOTTOM_TAB_SCREENS_NAVIGATION = [
  {name: BOTTOM_TAB_SCREEN.HOME, component: Home},
  {name: BOTTOM_TAB_SCREEN.CONTACT, component: Contact},
  {name: BOTTOM_TAB_SCREEN.SETTING, component: Setting},
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
