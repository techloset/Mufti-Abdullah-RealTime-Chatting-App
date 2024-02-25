import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {FirebaseUser, UserProfileData} from '../constants/Types';
import {RootState} from './Store';

interface AuthState {
  isAuth: boolean;
  user: UserProfileData | null;
  isAppLoading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  user: {},
  isAppLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserProfileData>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuth = false;
      state.user = null;
    },
    setIsAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
  },
});

export const readUserProfile =
  (user: FirebaseUser) =>
  async (
    dispatch: (arg0: {
      payload: boolean | UserProfileData;
      type: 'auth/login' | 'auth/setIsAppLoading';
    }) => void,
  ) => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        const userData: UserProfileData | undefined =
          documentSnapshot.data() as UserProfileData;
        if (userData) {
          dispatch(login(userData));
        }
        dispatch(setIsAppLoading(false));
      });
  };

// Selector to get authentication state
export const {login, logout, setIsAppLoading} = authSlice.actions;
export const selectAuthState = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
