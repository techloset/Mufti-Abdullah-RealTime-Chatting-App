import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/firebaseCollectoin';
import {SigninUserData, UserData} from '../../constants/types/types';
import {ShowToast} from '../../components/showToast/ShowToast';
import {login} from './authSlice';
import storage from '@react-native-firebase/storage';
interface CounterState {
  Users: UserData[];
  currentUser: UserData[];
  signInUser: UserData[];
  updateProfile: UserData[];
  updatedUser: UserData[];
  loading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  Users: [],
  updateProfile: [],
  updatedUser: [],
  currentUser: [],
  signInUser: [],
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

export const getUsers = createAsyncThunk('users/getUsers', async () => {
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

export const getCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async () => {
    try {
      const usersSnapshot = await firestore()
        .collection(FIREBASE_COLLECTIONS.USER)
        .get();
      const users = usersSnapshot.docs.map(doc => doc.data());
      const filteredUsers = users.filter(
        user => user.uid == auth().currentUser?.uid,
      );
      return filteredUsers as UserData[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async ({name, status}: {name: string; status: string}, {rejectWithValue}) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      await currentUser.updateProfile({
        displayName: name,
      });

      const userDocRef = firestore()
        .collection(FIREBASE_COLLECTIONS.USER)
        .doc(currentUser.uid);

      await userDocRef.update({
        username: name,
        status: status,
      });

      ShowToast('success', 'Profile updated successfully');
    } catch (error: any) {
      ShowToast('danger', 'Profile updating Error');
      throw rejectWithValue(error.message);
    }
  },
);
export const updateProfilePicture = createAsyncThunk(
  'users/updateProfilePicture',
  async (uri: string, {rejectWithValue}) => {
    try {
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage().ref().child(`images/${imageName}`);
      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();

      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({
          photoURL: downloadURL,
        });

        const userDocRef = firestore()
          .collection(FIREBASE_COLLECTIONS.USER)
          .doc(currentUser.uid);

        await userDocRef.update({
          photoURL: downloadURL,
        });

        ShowToast('success', 'Profile picture updated successfully');
      }
    } catch (error: any) {
      ShowToast('danger', 'Error while updating profile picture');
      throw rejectWithValue(error.message);
    }
  },
);

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
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
        state.Users = [];
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null;
        state.signInUser = action.payload;
      })
      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
        state.Users = [];
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null;
        state.updatedUser = action.payload;
      })
      .addCase(updateProfilePicture.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
        state.Users = [];
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null;
        state.updateProfile = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentUser = action.payload;
      });
  },
});

export const selectLoading = (state: {users: {loading: any}}) =>
  state.users.loading;
export const selectError = (state: {users: {error: any}}) => state.users.error;

export default userSlice.reducer;
