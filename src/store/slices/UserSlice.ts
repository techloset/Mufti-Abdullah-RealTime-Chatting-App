import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/firebaseCollectoin';
import {SigninUserData, UserData} from '../../constants/types/types';
import {ShowToast} from '../../components/showToast/ShowToast';
import {useAppDispatch} from '../store';
import {login} from './authSlice';

export interface CounterState {
  Users: UserData[];
  loading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  Users: [],
  loading: false,
  error: '',
};
export const signInUser = createAsyncThunk(
  'signIn/signIn',
  async (userData: SigninUserData, {rejectWithValue, dispatch}) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        userData.email,
        userData.password,
      );
      ShowToast('success', 'User Login Successfully!');
      dispatch(login(userCredential.user));
      // Return the user data after successful sign-in
      return userCredential.user;
    } catch (error: any) {
      let errorMessage = 'An error occurred while signing in';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already registered';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      ShowToast('danger', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getUsers = createAsyncThunk('users', async () => {
  try {
    const usersSnapshot = await firestore()
      .collection(FIREBASE_COLLECTIONS.USER)
      .get();
    const users = usersSnapshot.docs.map(doc => doc.data());
    const filteredUsers = users.filter(
      user => user.uid !== auth().currentUser?.uid,
    );
    return filteredUsers as UserData[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
        state.Users = [];
      })
      .addCase(signInUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null;
        state.Users = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
        state.Users = [];
      });
  },
});

export default userSlice.reducer;
