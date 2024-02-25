export interface AuthContextProps {
  isAuth: boolean;
  user: Record<string, any>;
  dispatch: React.Dispatch<AuthAction>;
  isAppLoading: boolean;
  Logout: () => void;
}

export interface FirebaseUser {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  // Add any additional properties you need
}
export interface UserProfileData {
  confirmPassword?: string;
  email?: string;
  password?: string | undefined;
  status?: string;
  uid?: string;
  username?: string;
}

export interface AuthState {
  isAuth: boolean;
  user: UserProfileData;
}

export type AuthAction =
  | {type: 'Login'; payload: {userData?: UserProfileData}}
  | {type: 'Logout'};

export type HomeStackParamsList = {
  HOMEPAGE: undefined;
  SEARCH: undefined;
  CHATSCREEN: undefined;
};

export type ContactStackParamsList = {
  CONTACTPAGE: undefined;
  SEARCH: undefined;
};

export type SettingStackParamsList = {
  PROFILE: undefined;
  CHANGE_PASSWORD: undefined;
  SETTING: undefined;
};
