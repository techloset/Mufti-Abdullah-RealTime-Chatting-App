import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthState {
  isAuth: boolean;
  user: FirebaseAuthTypes.User | null;
  isAppLoading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isAppLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
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

export const {login, logout, setIsAppLoading} = authSlice.actions;
export const selectAuthState = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
