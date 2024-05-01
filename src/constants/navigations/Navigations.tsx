import {IMAGES} from '../assets/allImages';

export const BOTTOM_TAB_SCREEN = {
  HOME: 'HOME',
  CONTACT: 'CONTACT',
  SETTING: 'SETTING',
};
export const AUTH_STACK_SCREEN = {
  AUTH: 'AUTH',
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};

export const HOME_STACK_SCREENS = {
  HOMEPAGE: 'HOMEPAGE',
  SEARCH: 'SEARCH',
  CHATSCREEN: 'CHATSCREEN',
};
export const CONTACT_STACK_SCREENS = {
  CONTACTPAGE: 'CONTACTPAGE',
  SEARCHCNTACT: 'SEARCHCNTACT',
};
export const SETTING_STACK_SCREENS = {
  SETTING_PAGE: 'SETTINGPAGE',
  PROFILE: 'PROFILE',
  CHANGE_PASSWOED: 'CHANGE_PASSWORD',
};

export const TAB_OPTIONS = {
  tabBarLabelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export const TAB_ICONS = {
  Home: {
    focused: <IMAGES.Msg />,
    unfocused: <IMAGES.UnfocusMsg />,
  },
  Contact: {
    focused: <IMAGES.FocusUser />,
    unfocused: <IMAGES.User />,
  },
  Setting: {
    focused: <IMAGES.FocusSetting />,
    unfocused: <IMAGES.Setting />,
  },
};
