import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {FirebaseUser, UserProfileData} from '../constants/Types';
import {RootState} from './Store';
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
// export const readUserProfile = createAsyncThunk(
//   'auth/readUserProfile',
//   async (user: FirebaseUser) => {
//     try {
//       const userDoc = await firestore().collection('users').doc(user.uid).get();
//       if (userDoc.exists) {
//         const userData = userDoc.data() as UserProfileData;
//         return userData;
//       } else {
//         throw new Error('User document does not exist');
//       }
//     } catch (error) {
//       console.error('Error reading user profile:', error);
//       throw error;
//     }
//   },
// );

// Selector to get authentication state
export const {login, logout, setIsAppLoading} = authSlice.actions;
export const selectAuthState = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
