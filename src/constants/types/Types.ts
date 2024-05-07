import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type AuthContextProps = {
  isAuth: boolean;
  user: Record<string, any>;
  dispatch: React.Dispatch<AuthAction>;
  isAppLoading: boolean;
  Logout: () => void;
};

export type FirebaseUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
};
export type UserProfileData = {
  confirmPassword?: string;
  email?: string;
  password?: string | undefined;
  status?: string;
  uid?: string;
  username?: string;
};
export type HomeUser = {
  photoURL: string;
  id: string;
  uid: string;
  imageUrl: string;
  username: string;
  status: string;
  timeAgo: string;
  description: string;
  lastSeen?: string;
};
export type UserData = {
  photoURL?: string;
  id?: string;
  uid?: string;
  password: string;
  confirmPassword: string;
  imageUrl?: string;
  username?: string;
  status?: string;
  timeAgo?: string;
  description?: string;
  email: string;
  displayName?: string;
  lastSeen: string;
};
export type SigninUserData = {
  email: string;
  password: string;
  uid?: string;
};
export type AuthState = {
  isAuth: boolean;
  user: UserProfileData;
};

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
export type usersData = {
  photoURL: string;
  uid: string;
  imageUrl: string;
  username: string;
};

export type ProfileHook = {
  currentUser: FirebaseAuthTypes.User | null;
  handlePicture: () => Promise<void>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  name: string | null | undefined;
  status: string | null | undefined;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  updateProfile: () => Promise<void>;
  usersData: UserData | null;
  loading: boolean;
  imageUploading: boolean;
  userData: UserData[];
};
export type Resource = {
  uri?: string;
  data?: string;
};
export type SignupUser = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  uid?: string;
  photoURL?: string | null;
  creationTime?: string;
  status?: string;
  lastSeen?: string;
};
