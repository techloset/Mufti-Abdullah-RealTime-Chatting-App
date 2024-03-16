import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/FirebaseCollectoin';
import {UserData} from '../../constants/types/Types';

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
      });
  },
});

export default userSlice.reducer;
